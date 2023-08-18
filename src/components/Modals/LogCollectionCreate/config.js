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

import { get } from 'lodash'
import { ReactComponent as ESICON } from 'assets/es.svg'
import { ReactComponent as KaFkaICON } from 'assets/kafka.svg'
import { ReactComponent as FluentdICON } from 'assets/fluentd.svg'
import { ReactComponent as OSICON } from 'assets/opensearch.svg'

import ESForm from 'components/Forms/Elasticsearch/Settings'
import OSForm from 'components/Forms/Opensearch/Settings'
import KafkaForm from 'components/Forms/KafkaForm/Settings'
import FluentdForm from 'components/Forms/Fluentd/Settings'

const kafkaPathGetter = collection => get(collection, 'Brokers')
const pathGetter = collection =>
  `${get(collection, 'Host')}:${get(collection, 'Port')}`

export default {
  es: {
    ICON: ESICON,
    title: 'Elasticsearch',
    pathGetter,
    Form: ESForm,
    get description() {
      return t('ES_DESC')
    },
  },
  os: {
    ICON: OSICON,
    title: 'OpenSearch',
    pathGetter,
    Form: OSForm,
    get description() {
      return t('OPENSEARCH_DESC')
    },
  },
  kafka: {
    ICON: KaFkaICON,
    title: 'Kafka',
    pathGetter: kafkaPathGetter,
    Form: KafkaForm,
    get description() {
      return t('KAFKA_DESC')
    },
  },
  forward: {
    ICON: FluentdICON,
    title: 'Fluentd',
    pathGetter,
    Form: FluentdForm,
    get description() {
      return t('FLUENTD_DESC')
    },
  },
}
