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
import { ReactComponent as ESICON } from 'src/assets/es.svg'
import { ReactComponent as KaFkaICON } from 'src/assets/kafka.svg'
import { ReactComponent as FluentdICON } from 'src/assets/fluentd.svg'

import ESForm from 'src/components/Forms/Elasticsearch/Settings'
import KafkaForm from 'src/components/Forms/KafkaForm/Settings'
import FluentdForm from 'src/components/Forms/Fluentd/Settings'

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
    validator(callback) {
      const formData = this._formData || {}
      const { HTTP_User, HTTP_Password } = formData
      if (HTTP_User && !HTTP_Password) {
        this.setState({
          errors: [
            {
              message: t('Please input password'),
              field: 'HTTP_Password',
            },
          ],
        })
      } else {
        callback()
      }
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
