/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { Ref } from 'react';
import { Project } from '@kubed/icons';
import { Field } from '@kubed/components';
import { useParams } from 'react-router-dom';

import ConfigForm from './ConfigForm';
import type { AppPlacementConfigFormRef, AppPlacementFieldsData } from './ConfigForm';

import { Title } from '../../styles';
import { StaticPlacement, PlacementContent } from './styles';

export type { AppPlacementConfigFormRef, AppPlacementFieldsData } from './ConfigForm';

type Props = {
  formRef: Ref<AppPlacementConfigFormRef>;
  isEdge?: boolean;
  confirmedPlacementData?: Partial<AppPlacementFieldsData>;
};

export function PlacementForm({ formRef, isEdge, confirmedPlacementData }: Props): JSX.Element {
  const {
    cluster,
    workspace,
    namespace = confirmedPlacementData?.namespace,
  } = useParams<'cluster' | 'workspace' | 'namespace'>();

  return (
    <>
      <Title>{t('LOCATION')}</Title>
      {namespace ? (
        <StaticPlacement>
          <PlacementContent>
            <Field
              label={t('WORKSPACE')}
              value={confirmedPlacementData?.workspace || workspace || '-'}
            />
            <Field label={t('CLUSTER')} value={confirmedPlacementData?.cluster || cluster || '-'} />
            {!isEdge && (
              <Field
                label={t('PROJECT')}
                value={confirmedPlacementData?.namespace || namespace}
                avatar={<Project />}
              />
            )}
          </PlacementContent>
        </StaticPlacement>
      ) : (
        <ConfigForm
          ref={formRef}
          isEdge={isEdge}
          workspace={workspace}
          confirmedPlacementData={confirmedPlacementData}
        />
      )}
    </>
  );
}
