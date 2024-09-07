/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import accessorStore from './accessor';
import clusterStore from './cluster';
import { kubekeyClusterStore } from './cluster/kubekey';
import { default as configMapStore } from './configmap';
import * as containerStore from './container';
import crdStore from './crd';
import crdResourceStore from './crd.resource';
import { default as devopsStore } from './devops';
import * as eventStore from './event';
import { default as federatedProjectStore } from './federatedProject';
import gatewayStore from './gateway';
import { useGlobalStore } from './global';
import * as groupStore from './group';
import { default as ingresStore } from './ingress';
import * as kubekeyStore from './kubekey';
import * as monitorStore from './monitoring';
import * as clusterMonitorStore from './monitoring/cluster';
import * as componentMonitoringStore from './monitoring/components';
import * as gatewayMonitorStore from './monitoring/gateway';
import * as nodeMonitiorStore from './monitoring/node';
import * as podMonitiorStore from './monitoring/pod';
import * as workspaceMonitorStore from './monitoring/workspace';
import * as networkIPPoolStore from './networkIPPool';
import networkPolicyStore from './networkPolicy';
import { default as nodeStore } from './node';
import * as openpitrixStore from './openpitrix';
import * as podStore from './pod';
import { default as projectStore } from './project';
import nvStore from './pv';
import pvcStore from './pvc';
import { default as rankStore } from './rank';
import * as nodeRankStore from './rank/nodes';
import * as projectRankStore from './rank/project';
import roleStore from './role';
import { default as secretStore } from './secret';
import { default as serviceStore } from './service';
import { default as serviceAccountStore } from './serviceAccounts';
import storageClassStore from './storageClass';
import permissionStore from './permission';
import { default as userStore } from './user';
import validateWebhookCFStore from './validateWebhookCF';
import * as volumeStore from './volume';
import volumeSnapshotClassStore from './volumeSnapshotClass';
import workloadStore from './workload';

import limitRangesStore from './limitranges';
import projectNewStore from './project.new';
import quotaStore from './quotas';
import BaseStore from './store';
import deploymentStore from './workload/deployment';
import { default as useEnvStore } from './workload/env';
import hpaStore from './workload/hpa';
import { default as RecordStore } from './workload/record';
import { default as useRevisionStore } from './workload/revision';
import workspaceStore from './workspace';
import * as workspaceQuotaStore from './workspace.quota';
import componentsStore from './components';

import volumeSnapshotStore from './volumeSnapshot';
import volumeSnapshotContentStore from './volumeSnapshotContent';
import OpenELBStore from './openelb';
import licenseStore from './license';
import * as authKeyStore from './authKey';
import aliasNameStore from './aliasName';
import PodsStore from './workload/pod';

import { useClusterStore } from './useClustersStore';
import { useWorkspaceSelectedClusterStore } from './useWorkspaceSelectedClusterStore';

export {
  useGlobalStore,
  roleStore,
  rankStore,
  componentsStore,
  nodeRankStore,
  projectRankStore,
  monitorStore,
  clusterStore,
  userStore,
  workspaceStore,
  workspaceQuotaStore,
  groupStore,
  projectStore,
  containerStore,
  podStore,
  openpitrixStore,
  secretStore,
  networkPolicyStore,
  configMapStore,
  serviceAccountStore,
  serviceStore,
  nvStore,
  pvcStore,
  volumeStore,
  workloadStore,
  useEnvStore,
  useRevisionStore,
  nodeStore,
  kubekeyStore,
  networkIPPoolStore,
  ingresStore,
  eventStore,
  validateWebhookCFStore,
  crdStore,
  crdResourceStore,
  accessorStore,
  RecordStore,
  nodeMonitiorStore,
  podMonitiorStore,
  gatewayStore,
  gatewayMonitorStore,
  workspaceMonitorStore,
  componentMonitoringStore,
  clusterMonitorStore,
  hpaStore,
  kubekeyClusterStore,
  devopsStore,
  federatedProjectStore,
  deploymentStore,
  projectNewStore,
  volumeSnapshotClassStore,
  storageClassStore,
  BaseStore,
  limitRangesStore,
  quotaStore,
  volumeSnapshotStore,
  volumeSnapshotContentStore,
  OpenELBStore,
  permissionStore,
  licenseStore,
  authKeyStore,
  aliasNameStore,
  PodsStore,
  useClusterStore,
  useWorkspaceSelectedClusterStore,
};
