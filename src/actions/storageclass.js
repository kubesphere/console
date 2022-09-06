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
import DeleteModal from 'components/Modals/Delete'
import SetDefaultStorageClassModal from 'components/Modals/SetDefaultStorageClass'
import StorageclassAutoresizerModal from 'components/Modals/StorageclassAutoresizer'
import VolumeFunctionManage from 'components/Modals/VolumeFunctionManage'
import Accessor from 'clusters/components/Modals/Accessor'
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
            Notify.success({ content: t('CREATE_SUCCESSFUL') })
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
          Notify.success({ content: t('UPDATE_SUCCESSFUL') })
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
  'storageclass.pvc.autoresizer': {
    on({ store, cluster, detail, success, ...props }) {
      const modal = Modal.open({
        onOk: async annotations => {
          const params = detail._originData
          set(params, 'metadata.annotations', {
            ...params.metadata.annotations,
            ...annotations,
          })
          await store.patch(detail, params)
          await store.fetchDetail({
            name: detail.name,
            cluster: detail.cluster,
          })
          Notify.success({ content: t('UPDATE_SUCCESSFUL') })
          Modal.close(modal)
          success && success()
        },
        cluster,
        store,
        formData: detail._originData,
        modal: StorageclassAutoresizerModal,
        ...props,
      })
    },
  },
  'storageclass.accessor': {
    on({ cluster, store, detail, storageClassName, success, shouldAddCrd }) {
      const modal = Modal.open({
        onOk: async newObject => {
          Modal.close(modal)
          await store.update(
            { cluster, name: newObject.metadata.name },
            newObject
          )
          Notify.success({ content: t('UPDATE_SUCCESSFUL') })
          success && success()
        },
        storageClassName,
        cluster,
        store,
        detail,
        shouldAddCrd,
        modal: Accessor,
      })
    },
  },
  'storageclass.batch.delete': {
    on({ store, success, rowKey = 'name', accessorStore, cluster, ...props }) {
      const { data, selectedRowKeys } = store.list
      const selectValues = data
        .filter(item => selectedRowKeys.includes(item[rowKey]))
        .map(item => {
          return { name: item.name, namespace: item.namespace }
        })
      const selectNames = selectValues.map(item => item.name)
      const modal = Modal.open({
        onOk: async () => {
          const updateAccessor = []
          const reqs = []

          // disable it's accessor
          selectNames.forEach(name => {
            updateAccessor.push(
              accessorStore.silentPatch(
                { cluster, name: `${name}-accessor` },
                {
                  spec: { storageClassName: `${name}-accessor-disabled` },
                }
              )
            )

            reqs.push(store.delete({ cluster, name }))
          })

          await Promise.all([...updateAccessor, ...reqs])

          Modal.close(modal)
          Notify.success({ content: t('DELETED_SUCCESSFULLY') })
          store.setSelectRowKeys([])
          success && success()
        },
        resource: selectNames.join(', '),
        type: 'STORAGE_CLASS',
        modal: DeleteModal,
        store,
        desc: t.html('STORAGE_CLASS_DELETE_DESC_PL', {
          type: t('STORAGE_CLASS_LOW'),
          resource: selectNames.join(', '),
        }),
        ...props,
      })
    },
  },
  'storageclass.delete': {
    on({ store, detail, success, accessorStore, cluster, ...props }) {
      const modal = Modal.open({
        onOk: async () => {
          await accessorStore.silentPatch(
            { cluster, name: `${detail.name}-accessor` },
            {
              spec: { storageClassName: `${detail.name}-accessor-disabled` },
            }
          )

          store.delete(detail).then(() => {
            Modal.close(modal)
            Notify.success({ content: t('DELETED_SUCCESSFULLY') })
            success && success()
          })
        },
        store,
        modal: DeleteModal,
        resource: detail.name,
        desc: t('STORAGE_CLASS_DELETE_DESC'),
        ...props,
      })
    },
  },
}
