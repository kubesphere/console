/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { create } from 'zustand';

type UseWorkspaceSelectedClusterStore = {
  selectedCluster: string;
  setSelectedCluster: (cluster: string) => void;
};
export const useWorkspaceSelectedClusterStore = create<UseWorkspaceSelectedClusterStore>(set => ({
  selectedCluster: '',
  setSelectedCluster: (cluster: string) => {
    set({ selectedCluster: cluster });
  },
}));
