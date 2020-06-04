/*
 * This file is part of KubeSphere Console.
 * Copyright (C) 2019 The KubeSphere Console Authors.
 *
 * KubeSphere Console is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * KubeSphere Console is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with KubeSphere Console.  If not, see <https://www.gnu.org/licenses/>.
 */

export default {
  TOTAL_APPS: 'Total {num} applications',

  APPLICATIONS_DESC:
    'An application provides users with comprehensive business functions in one package. App templates in KubeSphere are built on the Helm packaging specification. They are delivered through a unified public or private Helm repository. An application is composed of one or more Kubernetes objects including workloads, services and ingress.',
  APP_DEPLOYMENT_DESC:
    'Lightweight, portable and self-contained software packaging technology enables applications to run in almost any place in the same way.',

  LB_ALG_DESC:
    'Support standard load balancing algorithms</br>ROUND_ROBIN：Polling, the default load balancing algorithm.</br>LEAST_CONN：Randomly select two healthy hosts, and then select one host with fewer links from the selected two hosts.</br>RANDOM：Pick one randomly from all healthy hosts.',
  LB_ROUND_ROBIN: 'ROUND_ROBIN',
  LB_LEAST_CONN: 'LEAST_CONN',
  LB_RANDOM: 'RANDOM',

  CLUSTER_NAME_DESC:
    'It can only contain lowercase letters, numbers and hyphens("-"), and must begin with a lowercase letter, ending with a number or lowercase letter. The maximum length of characters is set to 14.',

  CLUSTER_ALIAS_DESC:
    'Alias can be composed of any character to help you better distinguish resources and support Chinese names.',

  COMPONENT_VERSION_DESC:
    'For the application of governance to distinguish between components. It can only contain lowercase letters and numbers. The maximum length of characters is set to 16.',

  APP_WORKLOAD_TYPE_DESC:
    'Support stateless services (Deployment) and stateful services (StatefulSet)',

  BLUE_GREEN_DEPLOYMENT_DESC:
    'The blue-green release provides a zero downtime deployment which can deploy the new version while preserving the old version, and bring both versions running at the same time. If there is a problem with running, you can quickly roll back to the old version.',
  CANARY_RELEASES_DESC:
    'Introduce a part of the actual traffic into a new version for testing the performance and reliability of the new version, aiming to protect the overall system stability, early detection and adjustment of the problem.',
  TRAFFIC_MIRROR_DESC:
    'Traffic mirror is used to test the new version more realistically, to detect problems in advance without affecting the production environment, thus improving the security reliability of the release.',

  SERVICE_DEPLOYMENT: 'Stateless service(Deployment)',
  SERVICE_STATEFULSET: 'Stateful service(StatefulSet)',

  CONNECTION_POOL_TIP:
    'Create a fixed number of connection objects for the application, save them in the pool for reuse. The existing pool is available for each access, and is returned to the pool after use.',

  APP_GOVERNANCE_DESC:
    'If application governance enabled, the Istio-proxy container is injected as a SideCar in each component. <a href="https://istio.io/docs/setup/kubernetes/additional-setup/sidecar-injection/" target="_blank">READ MORE</a>',

  POD_ISOLATION_RATIO_DESC:
    'Maximum % of Pod for the upstream service that can be ejected. It uses up rounding, when set to 13% it will isolate up to 2 instances if 10 instances exist.',
  BASE_EJECTION_TIME_DESC:
    'Minimum ejection duration. A host will remain ejected for a period equal to the product of minimum ejection duration and the number of times the host has been ejected.',
  CIRCUIT_DESC:
    'The circuit breaking is a microservice connection protection mechanism that addresses the avalanche effect. When a microservice of the fan-out connection is unavailable or the response time is too long, the service will be downgraded, and the call of the microservice of the node will be broken, and the error response is quickly returned. After detectin the microservice response is normal, the connection will be resumed. ',

  'Last {num} records': 'Last {num} records',
  'Last {hour} hour': 'Last {hour} hour',
  'Last {hour} hours': 'Last {hour} hours',
  'Last {day} days': 'Last {day} days',

  WORKLOAD_NAME_EXIST: 'Workload {name} exists',

  APPLICATION_TYPE_DESC:
    'KubeSphere supports application deployments (based on Helm) from the app store, as well as Application CRD.',

  HOW_TO_USE_APPLICATION_GOVE_Q: 'How to use application governance',
  HOW_TO_USE_APPLICATION_GOVE_A:
    'Using App Governance requires creating a composing app and turning on service governance for each service.',

  FROM_APP_STORE_DESC:
    'From the official app store of KubeSphere, providing high-quality applications and easy deployment',
  FROM_APP_TEMPLATES_DESC:
    'From the application templates of workspace and the third-party helm application templates of app repo',
  COMPOSING_APP_DESC:
    'Publish services to build applications through resource orchestration(support application governance function)',
  APP_TEMPLATES_MODAL_DESC:
    'The application template comes from the workspace and the third-party helm application templates. It supports one click deployment and can be visualized in KubeSphere to show and provide deployment and management functions',

  TIP_APP_TYPE:
    'KubeSphere supports application deployment (based on Helm) from app stores and app repositories, as well as home-made applications (Application CRD).',
  TIP_APP_GOVERNANCE:
    'Using App Governance requires creating a homebrew app and turning on service governance for each service',
  APP_REPOS_DESC:
    'The app repository comes from a third-party Helm Chart Repo, which visually displays and provides deployment and management capabilities in KubeSphere. Users can quickly deploy applications with one click based on templates in the app repository.',
  SEARCH_TIPS: 'You can filter based on relevant conditions',

  APPLICATION_BASEINFO_DESC:
    'Basic application information (such as name description)',

  TRAFFIC_MANAGEMENT_NO_MICROSERVICE_TIP:
    'Traffic governance depends on the microservice module, the current cluster does not enable the microservice module',
  TRACING_NO_MICROSERVICE_TIP:
    'Tracing depends on the microservice module, the current cluster does not enable the microservice module',
}
