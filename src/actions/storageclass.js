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

import { get, set, isUndefined, isBoolean } from 'lodash'
import { Notify } from '@kube-design/components'
import { Modal } from 'components/Base'

import CreateModal from 'components/Modals/Create'
import SetDefaultStorageClassModal from 'components/Modals/SetDefaultStorageClass'
import VolumeFunctionManage from 'components/Modals/VolumeFunctionManage'
import { MODULE_KIND_MAP } from 'utils/constants'
import FORM_TEMPLATES from 'utils/form.templates'
import formPersist from 'utils/form.persist'
import FORM_STEPS from 'configs/steps/storageclasses'

export default {
  'storageclass.create': {
    on({ store, cluster, module, success, ...props }) {
      const kind = MODULE_KIND_MAP[module]
      const formTemplate = {
        [kind]: FORM_TEMPLATES[module]({}),
      }

      const modal = Modal.open({
        onOk: newObject => {
          const data = get(newObject, kind)

          if (!data) {
            return
          }

          store.createAlongWithSnapshotClasses(data, { cluster }).then(() => {
            Modal.close(modal)
            Notify.success({ content: `${t('CREATE_SUCCESSFUL')}` })
            success && success()
            formPersist.delete(`${module}_create_form`)
          })
        },
        module,
        cluster,
        name: kind,
        steps: FORM_STEPS,
        formTemplate,
        modal: CreateModal,
        store,
        ...props,
      })
    },
  },
  'storageclass.set.default': {
    on({ store, cluster, detail, defaultStorageClass, success, ...props }) {
      const modal = Modal.open({
        onOk: async () => {
          if (defaultStorageClass) {
            await store.patch(
              { name: defaultStorageClass },
              {
                metadata: {
                  annotations: {
                    'storageclass.kubernetes.io/is-default-class': 'false',
                    'storageclass.beta.kubernetes.io/is-default-class': 'false',
                  },
                },
              }
            )
          }

          await store.patch(detail, {
            metadata: {
              annotations: {
                'storageclass.kubernetes.io/is-default-class': 'true',
                'storageclass.beta.kubernetes.io/is-default-class': 'true',
              },
            },
          })

          Modal.close(modal)
          success && success()
        },
        cluster,
        modal: SetDefaultStorageClassModal,
        store,
        ...props,
      })
    },
  },
  'storageclass.volume.function.update': {
    on({ cluster, store, detail, StorageClassStore, success, ...props }) {
      const modal = Modal.open({
        onOk: async state => {
          const params = {}
          const { allowClone, allowSnapshot, allowVolumeExpansion } = state
          if (!isUndefined(allowClone)) {
            set(
              params,
              `metadata.annotations["storageclass.kubesphere.io/allow-clone"]`,
              String(allowClone)
            )
          }
          if (!isUndefined(allowSnapshot)) {
            set(
              params,
              `metadata.annotations["storageclass.kubesphere.io/allow-snapshot"]`,
              String(allowSnapshot)
            )
          }
          if (!isUndefined(allowVolumeExpansion)) {
            set(
              params,
              `allowVolumeExpansion`,
              isBoolean(allowVolumeExpansion)
                ? allowVolumeExpansion
                : JSON.parse(allowVolumeExpansion)
            )
          }
          await store.patch(detail, params)
          await store.fetchDetail({
            name: detail.name,
            cluster: detail.cluster,
          })
          Notify.success({ content: `${t('UPDATED_SUCCESS_DESC')}` })
          Modal.close(modal)
          success && success()
        },
        cluster,
        store,
        modal: VolumeFunctionManage,
        StorageClassStore,
        ...props,
      })
    },
  },
}
