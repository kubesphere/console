/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Banner
  LOG_RECEIVER_PL: 'Log Receivers',
  LOG_COLLECTION_DESC:
    'The system collects standard output (stdout) and standard error (stderr) logs from each container and sends them to one or more target services.',
  // Banner > Add Log Receiver
  ADD_LOG_RECEIVER: 'Add Log Receiver',
  LOG_COLLECTION_TIPS: 'You can add one log receiver for each type.',
  ES_DESC: 'Elasticsearch is a distributed, RESTful search and analytics engine.',
  KAFKA_DESC: 'Kafka is a popular open-source, stream-processing platform.',
  FLUENTD_DESC: 'Fluentd is an open-source data collector for unified logging layer.',
  // Banner > Add Log Receiver > Elasticsearch
  LOG_COLLECTION_ES_URL_TIPS:
    'The built-in Elasticsearch service is used by default. You can also enter the IP address of Elasticsearch independently deployed inside or outside the cluster.',
  LOG_COLLECTION_ES_INDEX_TIPS:
    'Use the index prefix to speed up queries. The index prefix is automatically generated in <Index prefix>-<Year-month-date> format.',
  ADDRESS_VALUE: 'Address: {value}',
  // Banner > Add Log Receiver > Kafka
  TOPIC: 'Topic',
  ADD_SERVICE_ADDRESS: 'Add',
  SERVICE_ADDRESS: 'Service Address',
  ENTER_SERVICE_ADDRESS: 'Please enter a service address.',
  INVALID_SERVICE_ADDRESS: 'Please enter a correct service address.',
  SERVICE_ADDRESS_EXIST:
    'The service address already exists. Please enter another service address.',
  EXAMPLE_VALUE: 'Example: {value}',
  // Banner > Add Log Receiver > Fluentd
  LOG_COLLECTION_FLUENTD_URL_TIPS: 'Enter the address of the Fluentd service that receives logs.',
  // Container Logs
  EMPTY_LOG_COLLECTIONS:
    'No log receiver is found. You can add log receivers and send logs to external log receivers.',
  // Resource Events
  RESOURCE_EVENTS: 'Resource Events',
  // Audit Logs
  AUDIT_LOGS: 'Audit Logs',
};
