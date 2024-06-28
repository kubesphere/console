import { create } from 'zustand';
import { FormattedCluster } from '@ks-console/shared';

type UseClusterStore = {
  clusters: FormattedCluster[];
  setClusters: (clusters: FormattedCluster[]) => void;
};
export const useClusterStore = create<UseClusterStore>(set => ({
  clusters: [],
  setClusters: (clusters: FormattedCluster[]) => set({ clusters }),
}));
