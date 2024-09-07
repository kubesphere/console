/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Banner
  LOG_RECEIVER_PL: 'Log Receivers',
  LOG_COLLECTION_DESC:
    'El sistema recopilará los registros stdout y stderr de cada contenedor y los enviará a uno o más servicios de destino.',
  // Banner > Add Log Receiver
  ADD_LOG_RECEIVER: 'Add Log Receiver',
  LOG_COLLECTION_TIPS: 'You can add one log receiver for each type.',
  ES_DESC: 'Elasticsearch es un motor de búsqueda y análisis distribuido y RESTful.',
  KAFKA_DESC: 'Kafka es una popular plataforma de procesamiento de flujo de código abierto.',
  FLUENTD_DESC:
    'Fluentd es un recopilador de datos de código abierto para la capa de registro unificada.',
  // Banner > Add Log Receiver > Elasticsearch
  LOG_COLLECTION_ES_URL_TIPS:
    'The built-in Elasticsearch service is used by default. You can also enter the IP address of Elasticsearch independently deployed inside or outside the cluster.',
  LOG_COLLECTION_ES_INDEX_TIPS:
    'Use the index prefix to speed up queries. The index prefix is automatically generated in <Index prefix>-<Year-month-date> format.',
  ADDRESS_VALUE: 'Address: {value}',
  // Banner > Add Log Receiver > Kafka
  TOPIC: 'tema',
  ADD_SERVICE_ADDRESS: 'Add',
  SERVICE_ADDRESS: 'Dirección de Servicio',
  ENTER_SERVICE_ADDRESS: 'Por favor introduce la dirección del servicio',
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
