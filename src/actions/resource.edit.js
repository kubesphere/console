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

import { Notify } from '@kube-design/components'
import { Modal } from 'components/Base'
import EditBasicInfoModal from 'components/Modals/EditBasicInfo'
import EditYamlModal from 'components/Modals/EditYaml'
import { get, set } from 'lodash'
import { updateFederatedAnnotations } from 'utils'

export default {
  'resource.baseinfo.edit': {
    on({ store, detail, success, ...props }) {
      const module = get(store, 'module', '')
      const modal = Modal.open({
        onOk: data => {
          let _data = module === 'workspace' ? null : data
          if (
            data.kind === 'FederatedNamespace' &&
            get(store, 'module') === 'namespaces'
          ) {
            updateFederatedAnnotations(data)
            // set(
            //   data,
            //   'spec.template.metadata.annotations["kubesphere.io/alias-name"]',
            //   get(data, 'metadata.annotations["kubesphere.io/alias-name"]')
            // )
          }
          if (get(store, 'module', '') === 'workspaces') {
            const annotations = get(data, 'metadata.annotations')
            const spec = get(data, 'spec')
            _data = [
              {
                op: 'add',
                path: '/metadata/annotations',
                value: annotations,
              },
              {
                op: 'add',
                path: '/spec',
                value: spec,
              },
            ]
          }

          store.patch(detail, _data).then(() => {
            Modal.close(modal)
            Notify.success({ content: t('UPDATE_SUCCESSFUL') })
            success && success()
          })
        },
        detail,
        modal: EditBasicInfoModal,
        store,
        ...props,
      })
    },
  },
  'resource.yaml.edit': {
    on({ store, detail, success, ...props }) {
      const modal = Modal.open({
        onOk: async data => {
          const isScheduleProject = store.isScheduleProject
          if (isScheduleProject) {
            set(data[0], 'metadata.resourceVersion', detail.resourceVersion)
            await store.update(detail, data[0])
            await store.updateScheduleYaml(detail, data[1])
          } else {
            set(data, 'metadata.resourceVersion', detail.resourceVersion)
            await store.update(detail, data)
          }
          Notify.success({ content: t('UPDATE_SUCCESSFUL') })
          Modal.close(modal)
          success && success()
        },
        detail,
        store,
        modal: EditYamlModal,
        ...props,
      })
    },
  },
}
