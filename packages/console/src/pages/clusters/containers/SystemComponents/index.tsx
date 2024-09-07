/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { parse } from 'qs';
import { get, isEmpty } from 'lodash';
import { Badge, Banner, Field, Loading, Navs } from '@kubed/components';
import { Components } from '@kubed/icons';
import {
  getComponentStatus,
  StatusIndicator,
  ComponentType,
  componentsStore,
} from '@ks-console/shared';
import {
  FullRow,
  CardIcon,
  CardsWrapper,
  StyledField,
  WithLabelWrapper,
  CardWrapper,
  StyledEntity,
  FullCol,
} from './styles';

dayjs.extend(relativeTime);

const { fetchList } = componentsStore;

function ServiceComponents() {
  const { cluster } = useParams();
  const { type } = parse(location.search.slice(1)) || {};
  const [selfType, setSelfType] = useState<ComponentType>((type as ComponentType) || 'kubesphere');
  const allComponentTypes = [
    {
      type: 'kubesphere',
      title: 'KubeSphere',
      icon: '/assets/kubesphere.svg',
    },
    {
      type: 'kubernetes',
      title: 'Kubernetes',
      icon: '/assets/kubernetes.svg',
    },
  ];

  const { data, isLoading } = useQuery(['serviceComponents'], () => fetchList({ cluster }));

  const getCount = (t: ComponentType) => {
    const exceptionCount = get(data, 'exceptionCount');
    const healthyCount = get(data, 'healthyCount');

    return exceptionCount?.[t] || healthyCount?.[t] || 0;
  };

  const navData = useMemo(
    () =>
      allComponentTypes.map(({ type: componentType, title }) => ({
        label: (
          <>
            <Badge
              color={get(data, `exceptionCount.${componentType}`) ? 'warning' : 'success'}
              shadow
            >
              {getCount(componentType as ComponentType)}
            </Badge>
            <span>{title}</span>
          </>
        ),
        value: componentType,
      })),
    [data],
  );

  const content = useMemo(() => {
    if (isLoading) {
      return <Loading className="page-loading" />;
    }

    const config = allComponentTypes.find(item => item.type === selfType);
    const components = data?.data[selfType];

    if (isEmpty(components)) {
      return null;
    }

    return (
      <CardsWrapper>
        <CardIcon src={config?.icon} alt={config?.title} />
        <div>
          {components?.map(comp => {
            const { name, namespace } = comp;
            const status = getComponentStatus(comp);
            const descKey = `${String(name).replace(/[- ]/g, '_').toUpperCase()}_DESC`;
            const descText = t(descKey);
            return (
              <CardWrapper hoverable key={name}>
                <StyledEntity bordered={false}>
                  <FullRow>
                    <FullCol span={6}>
                      <StyledField
                        avatar={<Components size={40} />}
                        label={descText !== descKey ? <span>{descText}</span> : null}
                        value={
                          <Link to={`/clusters/${cluster}/components/${namespace}/${name}`}>
                            {name}
                          </Link>
                        }
                      />
                    </FullCol>
                    <FullCol span={2}>
                      <Field
                        label={t('STATUS')}
                        value={
                          <StatusIndicator type={status}>{t(status.toUpperCase())}</StatusIndicator>
                        }
                      />
                    </FullCol>
                    <FullCol span={2}>
                      <Field
                        label={t('REPLICA_COUNT')}
                        value={`${comp.healthyBackends}/${comp.totalBackends}`}
                      />
                    </FullCol>
                    <FullCol span={2}>
                      <Field
                        label={t('RUNNING_TIME')}
                        value={comp.startedAt ? dayjs(comp.startedAt).toNow(true) : '-'}
                      />
                    </FullCol>
                  </FullRow>
                </StyledEntity>
              </CardWrapper>
            );
          })}
        </div>
      </CardsWrapper>
    );
  }, [data, selfType, isLoading]);

  return (
    <>
      <Banner
        icon={<Components />}
        title={t('SYSTEM_COMPONENT_PL')}
        description={t('SERVICE_COMPONENTS_DESC')}
        className="mb12"
      >
        <WithLabelWrapper>
          <Navs
            data={navData}
            onChange={(val: ComponentType) => setSelfType(val)}
            value={selfType}
          />
        </WithLabelWrapper>
      </Banner>
      {content}
    </>
  );
}

export default ServiceComponents;
