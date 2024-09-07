/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { create } from 'zustand';
import type { FormattedCluster } from '../types/cluster';

type UseClusterStore = {
  clusters: FormattedCluster[];
  setClusters: (clusters: FormattedCluster[]) => void;
};
export const useClusterStore = create<UseClusterStore>(set => ({
  clusters: [],
  setClusters: (clusters: FormattedCluster[]) => set({ clusters }),
}));
