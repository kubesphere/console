/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useMemo, useState } from 'react';
import cx from 'classnames';
import { Field, Tooltip } from '@kubed/components';

import Icon from '../../Icon';
import { VersionStatus } from '../VersionStatus';
import { formatTime, isRadonDB } from '../../../utils';
import type { AppVersion } from '../../../types';

import { StyledEntity, VersionStatusAvatar } from './styles';
import ListItemDetail from './ItemDetail';

type Props = {
  appName: string;
  versionDetail?: AppVersion;
  refreshVersions?: () => void;
  refreshAppDetails?: () => void;
  isAdmin?: boolean;
  hasPermission?: boolean;
  handleDeploy: () => void;
  actionKey: Record<string, string>;
};

function VersionItem({
  appName,
  versionDetail,
  refreshVersions,
  refreshAppDetails,
  isAdmin,
  hasPermission,
  handleDeploy,
  actionKey,
}: Props): JSX.Element {
  const [isExpand, setIsExpand] = useState<boolean>(false);
  const canExpand = useMemo(() => !isRadonDB(appName), [appName]);

  function handleExpandClick(): void {
    if (canExpand) {
      setIsExpand(!isExpand);
    }
  }

  return (
    <StyledEntity
      expandable={canExpand}
      onClick={handleExpandClick}
      className={cx({ isExpanded: isExpand, marginBottom: isExpand })}
      expandContent={
        <ListItemDetail
          actionKey={actionKey}
          appName={appName}
          isAdmin={isAdmin}
          hasPermission={hasPermission}
          detail={versionDetail}
          refreshVersions={refreshVersions}
          refreshAppDetails={refreshAppDetails}
          handleDeploy={handleDeploy}
        />
      }
      expandProps={{ hideOnClick: false, visible: isExpand }}
    >
      <Field
        avatar={
          <VersionStatusAvatar>
            <Icon className="cloud" name="cloud" size={40} />
            <VersionStatus className="status" type={versionDetail?.status.state} hideName />
          </VersionStatusAvatar>
        }
        label={t('STATUS')}
        value={
          <Tooltip
            disabled={
              !(versionDetail?.status.message && versionDetail?.status.state === 'rejected')
            }
            content={versionDetail?.status.message}
          >
            <span>
              <VersionStatus type={versionDetail?.status.state || '-'} hideIcon />
            </span>
          </Tooltip>
        }
      />
      <Field label={t('VERSION')} value={versionDetail?.spec.versionName || '-'} />
      <Field
        label={t('DEVELOPER')}
        value={
          versionDetail?.metadata?.annotations?.['application.kubesphere.io/app-maintainers'] || '-'
        }
      />
      <Field
        label={t('UPDATE_TIME_SCAP')}
        value={formatTime(
          versionDetail?.status.updated || versionDetail?.spec.created || '',
          'YYYY-MM-DD HH:mm:ss',
        )}
      />
      {canExpand && <Icon name="chevron-down" size={20} className={cx({ isExpand: isExpand })} />}
    </StyledEntity>
  );
}

export default VersionItem;
