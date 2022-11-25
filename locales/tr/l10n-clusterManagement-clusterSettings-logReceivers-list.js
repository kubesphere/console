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
  // Banner
  LOG_RECEIVER_PL: 'Kayıt Alıcıları',
  LOG_COLLECTION_DESC: 'Sistem, her bir kapsayıcıdan standart çıktı (stdout) ve standart hata (stderr) günlüklerini toplar ve bunları bir veya daha fazla hedef hizmete gönderir.',
  // Banner > Add Log Receiver
  ADD_LOG_RECEIVER: 'Kayıt Alıcısı Ekle',
  LOG_COLLECTION_TIPS: 'Her tür için bir kayıt alıcısı ekleyebilirsiniz.',
  ES_DESC: 'Elasticsearch, dağıtılmış, RESTful bir arama ve analiz motorudur.',
  KAFKA_DESC: 'Kafka, popüler bir açık kaynaklı, akış işleme platformudur.',
  FLUENTD_DESC: 'Fluentd, birleşik günlük katmanı için açık kaynaklı bir veri toplayıcıdır.',
  // Banner > Add Log Receiver > Elasticsearch
  LOG_COLLECTION_ES_URL_TIPS: 'Yerleşik Elasticsearch hizmeti varsayılan olarak kullanılır. Küme içinde veya dışında bağımsız olarak dağıtılan Elasticsearch\'ün IP adresini de girebilirsiniz.',
  LOG_COLLECTION_ES_INDEX_TIPS: 'Sorguları hızlandırmak için dizin önekini kullanın. Dizin öneki, <Index öneki>-<Yıl-ay-tarihi> biçiminde otomatik olarak oluşturulur.',
  ADDRESS_VALUE: 'Address: {value}',
  // Banner > Add Log Receiver > Kafka
  TOPIC: 'Konu',
  ADD_SERVICE_ADDRESS: 'Ekle',
  SERVICE_ADDRESS: 'Kaynak Adresi',
  ENTER_SERVICE_ADDRESS: 'Lütfen bir hizmet adresi girin.',
  INVALID_SERVICE_ADDRESS: 'Lütfen bir hizmet adresi girin.',
  SERVICE_ADDRESS_EXIST: 'The service address already exists. Please enter another service address.',
  EXAMPLE_VALUE: 'Example: {value}',
  // Banner > Add Log Receiver > Fluentd
  LOG_COLLECTION_FLUENTD_URL_TIPS: 'Kayıtları alan Fluentd hizmetinin adresini girin.',
  // Container Logs
  EMPTY_LOG_COLLECTIONS: 'Günlük alıcısı bulunamadı. Günlük alıcıları ekleyebilir ve günlükleri harici günlük alıcılarına gönderebilirsiniz.',
  // Resource Events
  RESOURCE_EVENTS: 'Özkaynak sınırları',
  // Audit Logs
  AUDIT_LOGS: 'Denetim Günlüğü'
};