/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { Loading, Empty, FilterInput, Checkbox, CheckboxGroup, Alert } from '@kubed/components';

import type { FormattedCluster } from '@ks-console/shared';

import { useClustersQuery } from '../../../../../stores/cluster';
import {
  AlertWrapper,
  StepContentTitle,
  StepContentInnerWrapper,
  LoadingWrapper,
  ClustersWrapper,
  StyledEntity,
  StyledClusterTitle,
} from './ClusterSelections.styles';

interface ClusterSelectionsProps {
  selectedFormattedClusters: FormattedCluster[];
  setSelectedFormattedClusters: Dispatch<SetStateAction<FormattedCluster[]>>;
  removedClusterNames?: string[];
}

function ClusterSelections({
  selectedFormattedClusters,
  setSelectedFormattedClusters,
  removedClusterNames = [],
}: ClusterSelectionsProps) {
  const { isLoading: isAllClustersQueryLoading, formattedClusters: allFormattedClusters } =
    useClustersQuery();

  const [searchName, setSearchName] = useState('');
  const { isLoading: isClustersQueryLoading, formattedClusters } = useClustersQuery({
    params: { name: searchName },
  });

  const isLoading = isAllClustersQueryLoading || isClustersQueryLoading;

  const handleCheckboxGroupChange = (values: string[]) => {
    const result = allFormattedClusters.filter(formattedCluster =>
      values?.includes(formattedCluster.name),
    );
    setSelectedFormattedClusters(result);
  };

  const renderClusters = () => {
    if (isLoading) {
      return (
        <LoadingWrapper>
          <Loading />
        </LoadingWrapper>
      );
    }

    if (formattedClusters.length === 0) {
      return (
        <LoadingWrapper>
          <Empty />
        </LoadingWrapper>
      );
    }

    return (
      <ClustersWrapper>
        <CheckboxGroup
          unstyled
          value={selectedFormattedClusters.map(({ name }) => name)}
          onChange={handleCheckboxGroupChange}
        >
          {formattedClusters.map(formattedCluster => {
            const { name: clusterName, isReady } = formattedCluster;

            return (
              <StyledEntity key={clusterName}>
                <Checkbox value={clusterName} disabled={!isReady} />
                <StyledClusterTitle
                  cluster={formattedCluster}
                  statusReasonProps={{ hasTip: false }}
                />
              </StyledEntity>
            );
          })}
        </CheckboxGroup>
      </ClustersWrapper>
    );
  };

  const renderAlerts = () => {
    if (removedClusterNames.length === 0) {
      return null;
    }

    return (
      <AlertWrapper>
        {removedClusterNames.map((name, index) => (
          <Alert key={`${index}-${name}`} type="warning" showIcon={false}>
            {t('UNSELECTED_INSTALLED_CLUSTERS_TIP', { clusterName: name })}
          </Alert>
        ))}
      </AlertWrapper>
    );
  };

  return (
    <>
      {renderAlerts()}
      <StepContentTitle>{t('CLUSTER_SELECTION')}</StepContentTitle>
      <StepContentInnerWrapper>
        <FilterInput placeholder={t('SEARCH_CLUSTERS')} simpleMode onChange={setSearchName} />
        {renderClusters()}
      </StepContentInnerWrapper>
    </>
  );
}

export { ClusterSelections };
