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
