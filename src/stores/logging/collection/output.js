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

import Base from 'stores/base'

const collectionDefaultSetting = {
  es: {
    Logstash_Format: 'On',
    Replace_Dots: 'on',
    Retry_Limit: 'False',
    Type: 'flb_type',
    Time_Key: '@timestamp',
    Logstash_Prefix: 'logstash',
  },
}

const KS_LOG_NAMESPACE = 'kubesphere-logging-system'

export default class outputStore extends Base {
  module = 'outputs'

  get apiVersion() {
    return 'apis/logging.kubesphere.io/v1alpha2'
  }

  getDetailUrl = ({ name }) =>
    `${this.getListUrl({ namespace: KS_LOG_NAMESPACE })}/${name}`

  fetch(params) {
    this.fetchListByK8s({
      namespace: KS_LOG_NAMESPACE,
      ...params,
    })
  }

  create({ Name, enabled = true, ...params }) {
    const MATCH = 'kube.*'
    const createParams = {
      apiVersion: 'logging.kubesphere.io/v1alpha2',
      kind: 'Output',
      metadata: {
        name: Name,
        namespace: KS_LOG_NAMESPACE,
        labels: {
          'logging.kubesphere.io/enabled': `${enabled}`,
        },
      },
      spec: {
        match: MATCH,
        [Name]: { ...collectionDefaultSetting[Name], ...params },
      },
    }
    return super.create(createParams)
  }
}
