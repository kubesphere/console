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

import { get, set, unset, cloneDeep } from 'lodash'
import { Notify } from '@kube-design/components'
import { Modal } from 'components/Base'
import CreateModal from 'components/Modals/FullCreate'
import { NEW_CLUSTER } from 'configs/steps/clusters'
import { NEW_CLUSTER_SPEC } from 'components/Forms/Cluster/constants'
import KubeKeyClusterStore from 'stores/cluster/kubekey'
import { safeParseJSON } from 'utils'

export default {
  'cluster.add': {
    on({ store, module, success, ...props }) {
      store.kubekey = new KubeKeyClusterStore()
      const formTemplate = cloneDeep(NEW_CLUSTER_SPEC)
      const modal = Modal.open({
        onOk: async newObject => {
          if (!newObject) {
            return
          }

          const type = get(
            newObject,
            'metadata.annotations["kubesphere.io/way-to-add"]'
          )
          const name = get(newObject, 'metadata.name')

          if (type === 'new') {
            await handleCreate(store.kubekey, newObject)
          } else {
            await handleImport(store, newObject)
          }

          Modal.close(modal)
          Notify.success({ content: `${t('Created Successfully')}` })
          success && success(`/clusters/${name}`)
        },
        module,
        formTemplate,
        title: t('Add Cluster'),
        steps: NEW_CLUSTER,
        modal: CreateModal,
        store,
        ...props,
      })
    },
  },
}

const handleImport = async (store, data) => {
  const postData = cloneDeep(data)

  if (get(postData, 'spec.connection.type') === 'proxy') {
    unset(postData, 'spec.connection.kubeconfig')
  } else {
    const config = get(postData, 'spec.connection.kubeconfig', '')
    set(postData, 'spec.connection.kubeconfig', btoa(config))
    await store.validate(postData)
  }

  await store.create(postData)
}

const handleCreate = (store, data) => {
  let registry = get(data, 'spec.registry.privateRegistry', '')
  if (registry) {
    registry = `${registry}/`.replace(/\/\/$/, '/')
  }
  const replaceKey = /\$\{spec\.registry\.privateRegistry\}/g
  const formatData = safeParseJSON(
    JSON.stringify(data).replace(replaceKey, registry),
    {}
  )
  return store.create(formatData)
}
