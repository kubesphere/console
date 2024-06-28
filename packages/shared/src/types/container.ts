export interface VolumeMount {
  name: string;
  mountPath: string;
  readOnly?: boolean;
}

export interface ContainerStatus {
  containerID: string;
  image: string;
  imageID: string;
  lastState: Record<string, any>;
  name: string;
  ready: boolean;
  restartCount: number;
  started: boolean;
  state: Record<
    string,
    {
      startedAt: string;
    }
  >;
}

export interface Container {
  name: string;
  image: string;
  resources: Record<string, any>;
  command?: string[];
  ready?: boolean;
  restartCount?: number;
  volumeMounts: VolumeMount[];
  terminationMessagePath: string;
  terminationMessagePolicy: string;
  imagePullPolicy: string;
}
