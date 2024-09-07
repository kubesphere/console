/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { concat, debounce, first, get, isEmpty, set } from 'lodash';
import * as React from 'react';
import { Select } from '@kubed/components';
import { clusterStore, FormattedCluster } from '@ks-console/shared';

interface ProjectSelectInitValue {
  cluster?: string;
  workspace?: string;
  showDefault?: boolean;
  showAll?: boolean;
}

const CLUSTER_KEY = 'useWorkspaceProjectSelect-clusterValue';
const PROJECT_KEY = 'useWorkspaceProjectSelect-projectValue';

const useWorkspaceClusterSelect = (initParams: ProjectSelectInitValue = {}) => {
  const { workspace, cluster: defaultCluster = '', showDefault, showAll = true } = initParams;
  const [cluster, setCluster] = React.useState<string | undefined>(defaultCluster);
  const { data, isLoading: clusterLoading } = clusterStore.useQueryWorkspaceClusters(workspace, {
    enabled: !!workspace,
  });

  const clusterList = React.useMemo(() => {
    if (!data || isEmpty(data)) {
      return [];
    }

    return data.map(i => ({
      ...i,
      disabled:
        !i.isReady ||
        !get(
          globals,
          `ksConfig.enabledExtensionModulesStatus.devops.clusterSchedulingStatuses['${i.name}']`,
          false,
        ),
    }));
  }, [data]);

  const paramsRef = React.useRef<{
    cluster?: string;
  }>({
    cluster,
  });

  React.useEffect(() => {
    paramsRef.current = {
      cluster,
    };
  }, [cluster]);

  // select first
  React.useEffect(() => {
    if (!cluster && clusterList?.filter(i => !i.disabled)?.length) {
      setCluster(first(clusterList)?.name);
    }
  }, [clusterList]);

  const clusterOptions = React.useMemo(() => {
    const allOption = {
      label: t('WORKBENCH_ALL_CLUSTER_PL'),
      value: '',
    };

    const clusterListDefault = (clusterList ?? []).map(_cluster => ({
      label: _cluster.name,
      value: _cluster.name,
      disabled: _cluster.disabled,
    }));

    return showAll ? concat(allOption, clusterListDefault) : clusterListDefault;
  }, [clusterList]);

  const handleChangeCluster = (value: string) => {
    setCluster(value);
    localStorage.setItem(CLUSTER_KEY, value);
    localStorage.removeItem(PROJECT_KEY);
  };

  const render = () => {
    return (
      <Select
        style={{ width: 200 }}
        loading={clusterLoading}
        options={clusterOptions}
        value={cluster}
        onChange={handleChangeCluster}
      />
    );
  };
  const params = React.useMemo<{ cluster?: string; namespace?: string }>(
    () => ({
      cluster,
    }),
    [cluster],
  );
  return {
    params,
    render,
    paramsRef,
  };
};

export default useWorkspaceClusterSelect;
