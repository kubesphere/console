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

import { get, cloneDeep, unset } from 'lodash'

const getNamespaceTemplate = data => {
  const name = get(data, 'metadata.name')
  const annotations = get(data, 'metadata.annotations')
  const placement = get(data, 'spec.placement')

  const workspace = get(data, 'metadata.labels["kubesphere.io/workspace"]')

  const template = cloneDeep(data)
  unset(template, 'apiVersion')
  unset(template, 'kind')
  unset(template, 'metadata.name')
  unset(template, 'metadata.annotations')
  unset(template, 'spec')

  return {
    apiVersion: 'types.kubefed.io/v1beta1',
    kind: 'FederatedNamespace',
    metadata: {
      name,
      namespace: name,
      labels: {
        'kubesphere.io/workspace': workspace,
      },
      annotations,
    },
    spec: { placement, template },
  }
}

export default {
  namespaces: getNamespaceTemplate,
}
