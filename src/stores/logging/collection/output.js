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
    logstashFormat: true,
    timeKey: '@timestamp',
    logstashPrefix: 'ks-logstash-log',
  },
}

const KS_LOG_NAMESPACE = 'kubesphere-logging-system'

const MATCHS = {
  logging: 'kube.*',
  events: 'kube_events',
  auditing: 'kube_auditing',
}

export default class outputStore extends Base {
  module = 'outputs'

  get apiVersion() {
    return 'apis/logging.kubesphere.io/v1alpha2'
  }

  getDetailUrl = ({ name, cluster }) =>
    `${this.getListUrl({ namespace: KS_LOG_NAMESPACE, cluster })}/${name}`

  fetch(params) {
    this.fetchListByK8s({
      namespace: KS_LOG_NAMESPACE,
      ...params,
    })
  }

  create({ Name, enabled = true, cluster, component, ...params }) {
    const createParams = {
      apiVersion: 'logging.kubesphere.io/v1alpha2',
      kind: 'Output',
      metadata: {
        name: `${Name}-${component}`,
        namespace: KS_LOG_NAMESPACE,
        labels: {
          'logging.kubesphere.io/enabled': `${enabled}`,
          'logging.kubesphere.io/component': component,
        },
      },
      spec: {
        match: MATCHS[component],
        [Name]: { ...collectionDefaultSetting[Name], ...params },
      },
    }
    return super.create(createParams, { cluster, namespace: KS_LOG_NAMESPACE })
  }
}
