/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import type { CSSProperties } from 'react';
import { get, omit } from 'lodash';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Field, Tag } from '@kubed/components';

import * as Constants from '../../../constants/common';
import Icon from '../../Icon';
import ClusterIcon from '../ClusterIcon';
import type { StatusReasonProps } from '../../StatusReason';
import StatusReason from '../../StatusReason';

const { CLUSTER_GROUP_TAG_TYPE } = Constants;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ExpiredDesc = styled(Field)`
  .field-label {
    color: ${({ theme }) => theme.palette.colors.red[3]};
  }

  .field-avatar {
    margin-right: 4px;

    svg {
      color: #ffffff;
      fill: ${({ theme }) => theme.palette.colors.red[3]};
    }
  }
`;

const sizeMapper = {
  large: {
    icon: 48,
    title: 20,
  },
  normal: {
    icon: 40,
    title: 12,
  },
  small: {
    icon: 20,
    title: 12,
  },
};

export interface ClusterTitleProps {
  cluster: any;
  noStatus?: boolean;
  size?: 'small' | 'normal' | 'large';
  theme?: 'dark' | 'light';
  to?: string;
  width?: number | string;
  className?: string;
  titleStyle?: CSSProperties;
  statusReasonProps?: Partial<StatusReasonProps>;
}

const ClusterTitle = ({
  cluster,
  noStatus,
  size = 'normal',
  theme = 'dark',
  to,
  width = '33.4%',
  className,
  titleStyle = {},
  statusReasonProps = {},
}: ClusterTitleProps) => {
  if (!cluster) return null;
  const isExpired = cluster.expiredDay && cluster.expiredDay < 0;
  const isReady = get(cluster.conditions, 'Ready.status') === 'True';
  const { icon: iconSize, title: titleSize } = sizeMapper[size];

  const icon = <ClusterIcon cluster={cluster} noStatus={noStatus} size={iconSize} theme={theme} />;
  const $titleStyle: CSSProperties = {
    // flex: 1,
    // overflow: 'hidden',
    // textOverflow: 'ellipsis',
    // whiteSpace: 'nowrap',
    wordBreak: 'break-all',
    fontSize: `${titleSize}px`,
    color: theme === 'light' ? '#fff' : '',
    ...titleStyle,
  };
  const descriptionStyle: CSSProperties = {
    color: theme === 'light' ? '#fff' : '',
    ...titleStyle,
  };

  const title = (
    <TitleWrapper>
      {to ? (
        <Link to={to} title={cluster.name} style={$titleStyle}>
          {cluster.name}
        </Link>
      ) : (
        <span title={cluster.name} style={$titleStyle}>
          {cluster.aliasName ? `${cluster.aliasName}（${cluster.name}）` : cluster.name}
        </span>
      )}
      {cluster.group && (
        <Tag color={CLUSTER_GROUP_TAG_TYPE[cluster.group]} className="ml12">
          {t(`ENV_${cluster.group.toUpperCase()}`, {
            defaultValue: cluster.group,
          })}
        </Tag>
      )}
      {cluster.isHost && (
        <Tag color="warning" className="ml12">
          {t('HOST_CLUSTER')}
        </Tag>
      )}
      {size === 'small' && !noStatus && !isReady && (
        <StatusReason type="cluster" data={cluster} {...statusReasonProps} />
      )}
    </TitleWrapper>
  );

  const description = isExpired ? (
    <ExpiredDesc
      label={t('KUBE_CONFIG_IS_EXPIRED')}
      avatar={<Icon name="information" size={15} />}
    />
  ) : isReady || noStatus ? (
    <span style={descriptionStyle}>{cluster.description || '-'}</span>
  ) : (
    <StatusReason
      type="cluster"
      data={{
        ...cluster,
        conditions: omit(cluster.conditions, 'KubeConfigCertExpiresInSevenDays'),
      }}
      hasTip
      {...statusReasonProps}
    />
  );

  return (
    <Field avatar={icon} label={description} value={title} width={width} className={className} />
  );
};

export default ClusterTitle;
