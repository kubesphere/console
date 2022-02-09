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

module.exports = {
  'According to the HTTP header': 'According to the HTTP header',
  'Add Component': 'Add Component',
  'Add Component Successfully': 'Add Component Successfully',
  'Add an Internet access rule for the application':
    'Add an Internet access rule for the app.',
  'Add New Component': 'Add New Component',
  'App store deployment': 'App store deployment',
  'App Template': 'App Template',
  'App Types': 'App Types',
  APP_ICON_TIP:
    'Click to upload the app icon with a maximum size of 120px * 120px.',
  application: 'application',
  'Application Component': 'Application Component',
  APP_COMPONENT_PL: 'Application Components',
  'Application components combine workloads and services as components in applications':
    'Application components combine workloads and services as components in applications',
  'Application governance is not enabled':
    'Application governance is not enabled',
  'Application Icon': 'App Icon',
  'Application Route': 'App Route',
  APP_VERSION: 'App Version',
  'Base ejection time (s)': 'Base ejection time (s)',
  'Based on HTTP cookie': 'Based on HTTP cookie',
  'Based on HTTP header': 'Based on HTTP header',
  'Build an app by app template': 'Build an app by app template',
  'Build an app by services': 'Build an app by services',
  'Called Depth': 'Called Depth',
  'Called Services': 'Called Services',
  'Choose existing services or create new service components to build an app':
    'Choose existing services or create new service components to build an app',
  'Circuit Breaker': 'Circuit Breaker',
  'Cluster Select': 'Cluster Select',
  'Cluster Selection': 'Cluster Selection',
  'Component Version': 'Component Version',
  'Composing App': 'Composing App',
  'Connection pool management': 'Connection pool management',
  'Connection timeout': 'Connection timeout',
  'Continuous error response (5xx) number':
    'Continuous error response (5xx) number',
  'Create Application by Service': 'Create App by Service',
  'Current Version': 'Current Version',
  DEPLOY: 'Deploy',
  'Deploy App': 'Deploy App',
  'Deploy applications with one-click application templates provided by Kubesphere':
    'Deploy applications with one-click application templates provided by Kubesphere',
  'Deploy sample app Bookinfo': 'Deploy sample app Bookinfo',
  'From third party Helm': 'From third party Helm',

  'Hash based on a specific HTTP header.':
    'Hash based on a specific HTTP header.',
  'Hash based on HTTP cookie.': 'Hash based on HTTP cookie.',
  'Hash based on the source IP address.':
    'Hash based on the source IP address.',
  'How to use Application Governance': 'How do I use Application Governance?',
  'If the maximum number of requests in the backend connection is set to 1, the keep alive feature is disabled.':
    'If the maximum number of requests in the backend connection is set to 1, the keep alive feature is disabled.',
  'If you need to access applications by application route, add routing rules':
    'If you need to access applications by application route, add routing rules',
  'Inspection period (unit: s)': 'Inspection period (unit: s)',
  'Load balance algorithm': 'Load balance algorithm',
  Log: 'Log',
  'Max number of connections': 'Max number of connections',
  'Max number of requests per connection':
    'Max number of requests per connection',
  'Max request retries': 'Max request retries',
  'Maximum pending requests': 'Maximum pending requests',
  'Maximum requests': 'Maximum requests',
  METHOD: 'Method',
  'No Components': 'No Components',
  'No result found': 'No result found',
  Off: 'Off',
  On: 'On',
  'Please finish the sub form first': 'Please finish the sub form first',
  'Please input an application name': 'Please input an application name',
  'Please input component version': 'Please input component version',
  'Pod isolation ratio (unit: %)': 'Pod isolation ratio (unit: %)',
  Process: 'Process',
  Receive: 'Receive',
  Rollback: 'Rollback',
  'Sample apps can help you get started with app creation and app governance':
    'Sample apps can help you get started with app creation and app governance',
  Send: 'Send',
  'Service components should not be empty':
    'Service components should not be empty',
  SERVICE_PORTS: 'Service Ports',
  SERVICE_PORT_NAME_DESC:
    'The port name must follow the format: <protocol>[-<suffix>]. http, http2, grpc, mongo or redis can be used as <protocol> so that you can use Istio’s routing features. For example, name: http2-foo and name: http are valid while name: http2foo is invalid.',
  'Services & Operations': 'Services & Operations',
  'Session retention': 'Session retention',
  'Success rate': 'Success rate',
  Tags: 'Tags',
  'TCP connection timeout.': 'TCP connection timeout.',
  'The maximum number of HTTP1 or TCP connections to the target host.':
    'The maximum number of HTTP1 or TCP connections to the target host.',
  'The maximum number of retries to the target host within the specified time.':
    'The maximum number of retries to the target host within the specified time.',
  'The number of consecutive 5xx errors in one inspection cycle':
    'The number of consecutive 5xx errors in one inspection cycle',
  'The response code will be filtered in the inspection cycle.':
    'The response code will be filtered in the inspection cycle.',
  TOTAL_COLLECTIONS: 'Total {num} receivers',
  Traffic: 'Traffic',
  'Traffic (requests per second)': 'Traffic (requests per second)',
  'Traffic Monitoring': 'Traffic Monitoring',
  Upgrade: 'Upgrade',
  'Workload Type': 'Workload Type',

  TOTAL_APPS: 'Total {num} applications',

  LB_ALG_DESC:
    'Support standard load balancing algorithms</br>ROUND_ROBIN：Polling, the default load balancing algorithm.</br>LEAST_CONN：Randomly select two healthy hosts, and then select one host with fewer links from the selected two hosts.</br>RANDOM：Pick one randomly from all healthy hosts.',
  LB_ROUND_ROBIN: 'ROUND_ROBIN',
  LB_LEAST_CONN: 'LEAST_CONN',
  LB_RANDOM: 'RANDOM',

  APP_WORKLOAD_TYPE_DESC:
    'Support stateless services (deployment) and stateful services (statefulset)',

  TYPE_SERVICE_DEPLOYMENT: 'Type: stateless service (deployment)',
  TYPE_SERVICE_STATEFULSET: 'Type: stateful service (statefulset)',

  CONNECTION_POOL_TIP:
    'A fixed number of connection objects will be created for the application and stored in the connection pool for reuse. The existing pool is available for each access, and each connection object will be returned to the pool after use.',

  POD_ISOLATION_RATIO_DESC:
    'Maximum % of pod for the upstream service that can be ejected. It uses up rounding, when set to 13% it will isolate up to 2 instances if 10 instances exist.',
  BASE_EJECTION_TIME_DESC:
    'Minimum ejection duration. A host will remain ejected for a period equal to the product of minimum ejection duration and the number of times the host has been ejected.',
  CIRCUIT_DESC:
    'The circuit breaking is a microservice connection protection mechanism that addresses the avalanche effect. When a microservice of the fan-out connection is unavailable or the response time is too long, the service will be downgraded, and the call of the microservice of the node will be broken, and the error response is quickly returned. After detectin the microservice response is normal, the connection will be resumed. ',

  'Last {hour} hour': 'Last {hour} hour',
  'Last {hour} hours': 'Last {hour} hours',
  'Last {day} days': 'Last {day} days',

  WORKLOAD_NAME_EXIST: 'Workload {name} exists',

  TIP_APP_TYPE:
    'You can deploy apps from the App Store or Helm-based app repositories. Composing apps (app CRDs) are also supported.',
  TIP_APP_GOVERNANCE:
    'Using App Governance requires creating a homebrew app and turning on service governance for each service',
  APP_REPOS_DESC:
    'The app repository comes from a third-party Helm Chart Repo, which visually displays and provides deployment and management capabilities in KubeSphere. Users can quickly deploy applications with one click based on templates in the app repository.',

  TRAFFIC_MANAGEMENT_NO_MICROSERVICE_TIP:
    'Traffic governance depends on the microservices module. The current cluster has not enabled the microservices module.',
  TRACING_NO_MICROSERVICE_TIP:
    'Please enable the Application Governance component in the current cluster.',
}
