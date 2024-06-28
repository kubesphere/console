export type ComponentType = 'kubesphere' | 'kubernetes';

export type SystemComponent = {
  name: string;
  namespace: string;
  selfLink: string;
  label: {
    app: string;
    tier: string;
  };
  startedAt: string;
  totalBackends: number;
  healthyBackends: number;
};
