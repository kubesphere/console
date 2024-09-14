/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';

import JobDetail from '../containers/Jobs/Detail';
import PodDetail from '../containers/Pods/Detail';
import RoleDetail from '../containers/Roles/Detail';
import RouteDetail from '../containers/Routes/Detail';
import VolumeDetail from '../containers/Volumes/Detail';
import SecretDetail from '../containers/Secrets/Detail';
import CronJobDetail from '../containers/CronJobs/Detail';
import ServiceDetail from '../containers/Services/Detail';
import ConfigMapDetail from '../containers/ConfigMaps/Detail';
import DaemonSetDetail from '../containers/DaemonSets/Detail';
import DeploymentDetail from '../containers/Deployments/Detail';
import StatefulSetDetail from '../containers/StatefulSets/Detail';
import ImageBuilderDetail from '../containers/ImageBuilder/Detail';
import PodContainerDetail from '../containers/Pods/ContainerDetail';
import VolumeSnapshotDetail from '../containers/VolumeSnapshots/Detail';
import ServiceAccountDetail from '../containers/ServiceAccounts/Detail';
import AlertPoliciesDetail from '../containers/Alerting/Policies/Detail';
import ConfigurationDetail from '../containers/SpringCloud/configurations/Detail';
import MicroserviceDetail from '../containers/SpringCloud/microservices/Detail';
import MicroserviceGatewayDetail from '../containers/SpringCloud/microservicegateways/Detail';
import ServiceRoutingDetail from '../containers/SpringCloud/servicerouting/Detail';
import MicroserviceInstancesDetail from '../containers/SpringCloud/microserviceInstances/Detail';
import ComposingDetail from '../containers/ApplicationComposing/Detail';
import GatewaysDetail from '../containers/Gateway/Detail/index';

import jobDetailRoutes from '../containers/Jobs/Detail/routes';
import podDetailRoutes from '../containers/Pods/Detail/routes';
import roleDetailRoutes from '../containers/Roles/Detail/routes';
import secretDetailRoutes from '../containers/Secrets/Detail/routes';
import ingressDetailRoutes from '../containers/Routes/Detail/routes';
import volumeDetailRoutes from '../containers/Volumes/Detail/routes';
import cronJobDetailRoutes from '../containers/CronJobs/Detail/routes';
import serviceDetailRoutes from '../containers/Services/Detail/routes';
import configMapDetailRoutes from '../containers/ConfigMaps/Detail/routes';
import daemonSetDetailRoutes from '../containers/DaemonSets/Detail/routes';
import deploymentDetailRoutes from '../containers/Deployments/Detail/routes';
import statefulSetDetailRoutes from '../containers/StatefulSets/Detail/routes';
import imageBuilderDetailRoutes from '../containers/ImageBuilder/Detail/routes';
import podContainerDetailRoutes from '../containers/Pods/ContainerDetail/routes';
import volumeSnapshotDetailRoute from '../containers/VolumeSnapshots/Detail/routes';
import applicationsDetailRoutes from '../containers/Applications/DetailInfo/routes';
import serviceAccountDetailRoutes from '../containers/ServiceAccounts/Detail/routes';
import alertPoliciesDetailRoutes from '../containers/Alerting/Policies/Detail/routes';
import configurationDetailRoutes from '../containers/SpringCloud/configurations/Detail/routes';
import microservicesRoutes from '../containers/SpringCloud/microservices/Detail/routes';
import microservicegatewaysRoutes from '../containers/SpringCloud/microservicegateways/Detail/routes';
import serviceroutingRoutes from '../containers/SpringCloud/servicerouting/Detail/routes';
import MicroserviceInstancesRoutes from '../containers/SpringCloud/microserviceInstances/Detail/routes';
import composingDetailRoutes from '../containers/ApplicationComposing/Detail/routes';
import GatewaysDetailRoutes from '../containers/Gateway/Detail/routes';

export default (PATH: string) => [
  ...applicationsDetailRoutes(PATH),
  {
    path: `${PATH}/deployments/:name`,
    element: <DeploymentDetail />,
    children: [...deploymentDetailRoutes],
  },
  {
    path: `${PATH}/statefulsets/:name`,
    element: <StatefulSetDetail />,
    children: [...statefulSetDetailRoutes],
  },
  {
    path: `${PATH}/daemonsets/:name`,
    element: <DaemonSetDetail />,
    children: [...daemonSetDetailRoutes],
  },
  {
    path: `${PATH}/jobs/:name`,
    element: <JobDetail />,
    children: [...jobDetailRoutes],
  },
  {
    path: `${PATH}/cronjobs/:name`,
    element: <CronJobDetail />,
    children: [...cronJobDetailRoutes],
  },
  {
    path: `${PATH}/pods/:podName/containers/:containerName`,
    element: <PodContainerDetail />,
    children: [...podContainerDetailRoutes],
  },
  {
    path: `${PATH}/pods/:podName`,
    element: <PodDetail />,
    children: [...podDetailRoutes],
  },
  {
    path: `${PATH}/services/:name`,
    element: <ServiceDetail />,
    children: [...serviceDetailRoutes],
  },
  {
    path: `${PATH}/ingresses/:name`,
    element: <RouteDetail />,
    children: [...ingressDetailRoutes],
  },
  {
    path: `${PATH}/volumes/:name`,
    element: <VolumeDetail />,
    children: [...volumeDetailRoutes],
  },
  {
    path: `${PATH}/volume-snapshots/:name`,
    element: <VolumeSnapshotDetail />,
    children: [...volumeSnapshotDetailRoute],
  },
  {
    path: `${PATH}/secrets/:name`,
    element: <SecretDetail />,
    children: [...secretDetailRoutes],
  },
  {
    path: `${PATH}/configmaps/:name`,
    element: <ConfigMapDetail />,
    children: [...configMapDetailRoutes],
  },
  {
    path: `${PATH}/serviceAccounts/:name`,
    element: <ServiceAccountDetail />,
    children: [...serviceAccountDetailRoutes],
  },
  {
    path: `${PATH}/roles/:name`,
    element: <RoleDetail />,
    children: [...roleDetailRoutes],
  },
  {
    path: `${PATH}/s2ibuilders/:name`,
    element: <ImageBuilderDetail />,
    children: [...imageBuilderDetailRoutes],
  },
  {
    path: `${PATH}/alert-rules/builtin/:name`,
    element: <AlertPoliciesDetail />,
    children: [...alertPoliciesDetailRoutes],
  },
  {
    path: `${PATH}/alert-rules/:name`,
    element: <AlertPoliciesDetail />,
    children: [...alertPoliciesDetailRoutes],
  },
  {
    path: `${PATH}/configurations/:name`,
    element: <ConfigurationDetail />,
    children: [...configurationDetailRoutes],
  },
  {
    path: `${PATH}/microservices/:name`,
    element: <MicroserviceDetail />,
    children: [...microservicesRoutes],
  },
  {
    path: `${PATH}/microservicegateways/:name`,
    element: <MicroserviceGatewayDetail />,
    children: [...microservicegatewaysRoutes],
  },
  {
    path: `${PATH}/servicerouting/:name`,
    element: <ServiceRoutingDetail />,
    children: [...serviceroutingRoutes],
  },
  {
    path: `${PATH}/microservice-instances/:podName/:instanceId`,
    element: <MicroserviceInstancesDetail />,
    children: [...MicroserviceInstancesRoutes],
  },
  {
    path: `${PATH}/composing/:name`,
    element: <ComposingDetail />,
    children: [...composingDetailRoutes],
  },
  {
    path: `${PATH}/gateways/:gatewayName`,
    element: <GatewaysDetail />,
    children: [...GatewaysDetailRoutes],
  },
];
