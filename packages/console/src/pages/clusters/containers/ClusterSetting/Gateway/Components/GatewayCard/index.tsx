/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { ReactNode, useMemo } from 'react';
import { isArray, isEmpty } from 'lodash';
import { ClusterDetail, FormattedGateway, formatTime, hasPermission } from '@ks-console/shared';
import { Button, Card, MenuItem, Tooltip } from '@kubed/components';
import {
  Earth,
  EipGroup,
  Eye,
  Ip,
  Kubernetes,
  Loadbalancer,
  Pen,
  Pod,
  Trash,
  Update,
} from '@kubed/icons';
import { useCacheStore as useStore } from '@ks-console/shared';
import { useNavigate, useParams } from 'react-router-dom';
import { GatewayConfig } from '../..';
import { CLUSTER_PROVIDERS } from '../../constants';
import GatewayEmpty from '../GatewayEmpty';
import { Annotations, Container, CustomIcon, DarkDropDown, DarkMenu, Header, Item } from './styles';

interface Props {
  type: string;
  gateway?: FormattedGateway;
  action?: string[];
  isFederated?: boolean;
  prefix?: string;
  cluster?: ClusterDetail;
  title?: ReactNode;
  gatewayList?: any[];
  renderOperations?: (props: { url: string; disabled: boolean }) => ReactNode;
}

function GatewayCard({
  type = 'cluster',
  gateway,
  isFederated,
  action = [],
  gatewayList = [],
  cluster,
  prefix,
  title,
  renderOperations,
}: Props) {
  const match = useParams();
  const navigate = useNavigate();
  const isEmptyData = useMemo(() => isEmpty(gateway), [gateway]);
  const [gatewayConfigs, setGatewayConfigs] = useStore<GatewayConfig>('gatewayConfigs');
  const canEdit = action && !action.includes('manage');
  const currentCluster = isFederated ? cluster?.name : match.cluster;
  const linkUrl = prefix
    ? `${prefix}/${gateway?.name}`
    : `/clusters/${currentCluster}/gateways/cluster/${gateway?.name}`;

  const itemActions = useMemo(() => {
    const updateDisable = canEdit || gateway?.createTime !== null;
    const baseOpt = [
      {
        key: 'view',
        icon: <Eye variant="light" />,
        text: t('VIEW_DETAILS'),
        disabled: canEdit || gateway?.createTime === null,
        onClick: () => {
          navigate(linkUrl);
        },
      },
      {
        key: 'edit',
        icon: <Pen variant="light" />,
        text: t('EDIT'),
        disabled: canEdit || gateway?.createTime === null,
        onClick: () => {
          if (gateway) {
            setGatewayConfigs({
              ...gatewayConfigs,
              setVisible: true,
              gateway: gateway,
              payloads: {
                cluster: currentCluster,
                namespace: type === 'cluster' ? 'kubesphere-controls-system' : match.namespace,
              },
            });
          }
        },
      },
      {
        key: 'delete',
        icon: <Trash variant="light" />,
        text: t('DISABLE'),
        disabled: canEdit,
        onClick: () => {
          if (gateway) {
            setGatewayConfigs({
              ...gatewayConfigs,
              deleteVisible: true,
              gateway: null,
              payloads: {
                type: type === 'cluster' ? 'CLUSTER_GATEWAY' : 'PROJECT_GATEWAY',
                namespace: match.namespace,
              },
            });
          }
        },
      },
    ];

    const updateOpt = {
      key: 'update',
      icon: <Update variant="light" />,
      text: t('UPDATE'),
      disabled: updateDisable,
      onClick: () => {
        if (gateway) {
          setGatewayConfigs({
            ...gatewayConfigs,
            updateVisible: true,
            gateway: gateway,
            payloads: {
              namespace: match.namespace,
            },
          });
        }
      },
    };
    if (!updateDisable) {
      baseOpt.splice(2, 0, updateOpt);
    }

    return baseOpt;
  }, [gateway]);

  const moreMenu = useMemo(
    () => (
      <DarkMenu>
        {itemActions.map(act => (
          <MenuItem key={act.key} disabled={act.disabled} icon={act.icon} onClick={act.onClick}>
            {act.text}
          </MenuItem>
        ))}
      </DarkMenu>
    ),
    [itemActions],
  );

  const titleNode = useMemo(() => {
    return (
      <>
        <span>{type === 'project' ? t('PROJECT_GATEWAY') : t('CLUSTER_GATEWAY')}</span>
        {!gateway?.createTime ? (
          <Tooltip content={t('UPDATE_GATEWAY_DESC')} placement="top">
            <Update size={16} color="#f5a623" fill="#ffe1be" />
          </Tooltip>
        ) : null}
      </>
    );
  }, [gateway]);

  const gatewayConfig: {
    key: string;
    title?: ReactNode;
    desc?: string;
    icon?: ReactNode;
    component?: ReactNode;
  }[][] = useMemo(() => {
    if (!gateway) {
      return [];
    }

    const {
      creator,
      createTime,
      replicas,
      type: gatewayType,
      ports,
      loadBalancerIngress,
      serviceMeshEnable,
      lb,
    } = gateway;

    const gatewayPort = isEmpty(ports)
      ? '-'
      : ports
          .map(
            item =>
              `${item.name?.toUpperCase()}: ${
                gatewayType === 'NodePort' ? item.nodePort : item.port
              }`,
          )
          .join('/');

    const gatewayIp = isEmpty(loadBalancerIngress) ? '-' : loadBalancerIngress.join(';');

    const lbs = [
      ...CLUSTER_PROVIDERS,
      {
        label: 'OpenELB',
        value: 'OpenELB',
        icon: <Kubernetes />,
      },
    ];

    const lbIcon = lb && lbs.find(item => item.value === lb)?.icon;

    const isClusterPermission =
      hasPermission({ module: 'clusters', action: 'view' }) && type === 'cluster';

    return [
      [
        {
          key: 'clusterType',
          icon: <Loadbalancer size={40} />,
          title: titleNode,
          desc: t('TYPE'),
        },
        { key: 'author', title: creator || '-', desc: t('CREATOR') },
        {
          key: 'createTime',
          title: createTime ? formatTime(createTime) : '-',
          desc: t('CREATION_TIME'),
        },
        {
          key: 'edit',
          component: renderOperations ? (
            renderOperations({
              url: linkUrl,
              disabled: !isClusterPermission || isEmpty(createTime),
            })
          ) : (
            <DarkDropDown content={moreMenu} placement="bottom">
              <Button>{t('MANAGE')}</Button>
            </DarkDropDown>
          ),
        },
      ],
      [
        {
          key: 'method',
          icon: <EipGroup size={40} />,
          title: gatewayType,
          desc: t('ACCESS_MODE_SCAP'),
        },
        lb
          ? {
              key: 'lb',
              icon: lbIcon,
              title: lb,
              desc: t('LOAD_BALANCER_PROVIDER_SCAP'),
            }
          : {
              key: 'ip',
              icon: <Ip size={40} />,
              title: gatewayIp,
              desc: t('GATEWAY_ADDRESS_SCAP'),
            },
        {
          key: 'earth',
          icon: <Earth size={40} />,
          title: gatewayPort,
          desc: t('NODE_PORTS_SCAP'),
        },
        {
          key: 'pod',
          icon: <Pod size={40} />,
          title: replicas,
          desc: replicas === 1 ? t('REPLICA') : t('REPLICA_PL'),
        },
        {
          key: 'appGover',
          icon: (
            <CustomIcon>
              <img src="/assets/app-gover.svg" />
            </CustomIcon>
          ),
          title: serviceMeshEnable ? t('ON') : t('OFF'),
          desc: t('TRACING'),
        },
      ],
    ];
  }, [gateway]);

  const InternetAccess = useMemo(
    () => (
      <>
        {title}
        <Card>
          {gatewayConfig.map((config, index) => (
            <Container key={index}>
              {config.map(detail => {
                return detail.icon ? (
                  <Header key={detail.key}>
                    {detail.icon}
                    <Item key={detail.key}>
                      <div>{detail.title}</div>
                      <p>{t(detail.desc || '')}</p>
                    </Item>
                  </Header>
                ) : detail.component ? (
                  <Item key={detail.key} style={{ textAlign: 'right' }}>
                    {detail.component}
                  </Item>
                ) : (
                  <Item key={detail.key}>
                    <div>{detail.title}</div>
                    <p>{t(detail.desc || '')}</p>
                  </Item>
                );
              })}
            </Container>
          ))}

          {gateway?.type !== 'NodePort' && (
            <Annotations style={isFederated ? { background: '#fff' } : undefined}>
              <p>{t('ANNOTATION_PL')}</p>
              <ul>
                {isEmpty(gateway?.annotations) ? (
                  <li>{t('NO_DATA')}</li>
                ) : (
                  Object.entries(gateway?.annotations as Record<string, any>).map(
                    ([key, value]) => (
                      <li key={key}>
                        <span>{key}</span>
                        <span>{value}</span>
                      </li>
                    ),
                  )
                )}
              </ul>
            </Annotations>
          )}
        </Card>
      </>
    ),
    [gateway],
  );

  const hasClusterGateway = isArray(gatewayList) && gatewayList[0] && !gatewayList[1];

  const handleCreateGateway = () => {
    setGatewayConfigs({
      ...gatewayConfigs,
      setVisible: true,
      payloads: {
        name: type === 'cluster' ? 'kubesphere-router-kubesphere-system' : '',
        namespace: type === 'cluster' ? 'kubesphere-controls-system' : match.namespace,
        cluster: currentCluster,
      },
    });
  };

  return (
    <div>
      {isEmptyData ? (
        (match.namespace && type === 'cluster') ||
        (hasClusterGateway && match.namespace && type === 'project') ? null : (
          <>
            {title}
            <GatewayEmpty
              component={match.component}
              type={type}
              handleCreateGateway={handleCreateGateway}
              cluster={currentCluster}
              canEdit={canEdit}
            />
          </>
        )
      ) : (
        InternetAccess
      )}
    </div>
  );
}

export default GatewayCard;
