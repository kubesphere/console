/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { isString, isNull } from 'lodash';
import { Field, BadgeAnchor, Tooltip } from '@kubed/components';
import { Cluster } from '@kubed/icons';
import styled from 'styled-components';

import { getDisplayName } from '../../utils/getter';
import { ICON_TYPES } from '../../constants/common';
import Icon from '../../components/Icon';

const StyledField = styled(Field)`
  .badge {
    background-color: #fff;
    border-radius: 50%;
    outline: none;

    g {
      path:nth-child(1) {
        fill: #324558;
      }
      path:nth-child(2) {
        fill: #7eb8dc;
      }
      path:nth-child(3) {
        fill: #f5a623;
      }
    }
  }
`;

const ClusterTip = styled.div`
  .tooltip-title {
    font-weight: 600;
  }

  p {
    margin: 5px 0 3px;
  }
`;

export interface AvatarProps {
  icon?: string | React.ReactNode;
  iconSize?: number;
  to?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  className?: string;
  isMultiCluster?: boolean;
  record?: any;
  module?: string;
}

const Avatar = ({
  to,
  title,
  record = {},
  description,
  icon,
  iconSize = 40,
  isMultiCluster,
  className,
  module,
}: AvatarProps) => {
  const $title = title || getDisplayName(record);
  const titleEl = to ? <Link to={to}>{$title}</Link> : $title;

  const renderIcon = () => {
    let iconEl = null;
    if (isString(icon)) {
      iconEl = <Icon name={icon} size={iconSize} />;
    } else if (!isNull(icon) && React.isValidElement(icon)) {
      iconEl = icon;
    } else if (module && ICON_TYPES[module]) {
      iconEl = <Icon name={ICON_TYPES[module]} size={iconSize} />;
    }

    if (!iconEl) return null;

    if (isMultiCluster) {
      return (
        <BadgeAnchor offset={[8, 8]}>
          <Tooltip
            content={
              <ClusterTip>
                <div className="tooltip-title">{t('MULTI_CLUSTER_PROJECT')}</div>
                <p>{t('MULTI_CLUSTER_PROJECT_TIP')}</p>
              </ClusterTip>
            }
          >
            <Cluster className="badge" size={20} />
          </Tooltip>
          {iconEl}
        </BadgeAnchor>
      );
    }

    return iconEl;
  };

  return (
    <StyledField
      className={className}
      value={titleEl}
      label={description || '-'}
      avatar={renderIcon()}
    />
  );
};

export default Avatar;
