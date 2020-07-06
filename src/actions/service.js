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

import { get, isEmpty, set } from 'lodash'
import { toJS } from 'mobx'
import { Modal, Notify } from 'components/Base'

import CreateModal from 'components/Modals/Create'
import CreateServiceModal from 'projects/components/Modals/ServiceCreate'
import EditServiceModal from 'projects/components/Modals/ServiceSetting'
import EditGatewayModal from 'projects/components/Modals/ServiceGatewaySetting'
import DeleteModal from 'projects/components/Modals/ServiceDelete'
import { MODULE_KIND_MAP } from 'utils/constants'
import { getOverrides } from 'utils/cluster'
import formPersist from 'utils/form.persist'
import FORM_TEMPLATES from 'utils/form.templates'
import FORM_STEPS from 'configs/steps/services'

export default {
  'service.create': {
    on({ store, cluster, namespace, module, success, ...props }) {
      const kind = MODULE_KIND_MAP[module]

      const modal = Modal.open({
        onOk: newObject => {
          let data = newObject

          if (!data) {
            return
          }

          if (kind) {
            if (Object.keys(newObject).length === 1 && newObject[kind]) {
              data = newObject[kind]
            }
          }

          store.create(data, { cluster, namespace }).then(() => {
            Modal.close(modal)
            Notify.success({ content: `${t('Created Successfully')}!` })
            success && success()
            formPersist.delete(`${module}_create_form`)
          })
        },
        cluster,
        namespace,
        modal: CreateServiceModal,
        store,
        ...props,
      })
    },
  },
  'service.simple.create': {
    on({ store, cluster, namespace, module, success, ...props }) {
      const kind = MODULE_KIND_MAP[module]
      const formTemplate = {
        [kind]: FORM_TEMPLATES[module]({
          namespace,
        }),
      }

      const modal = Modal.open({
        onOk: newObject => {
          const data = get(newObject, kind)

          if (!data) {
            return
          }

          store.create(data, { cluster, namespace }).then(() => {
            Modal.close(modal)
            Notify.success({ content: `${t('Created Successfully')}!` })
            success && success()
            formPersist.delete(`${module}_create_form`)
          })
        },
        module,
        cluster,
        namespace,
        name: kind,
        formTemplate,
        steps: FORM_STEPS.simpleservice,
        modal: CreateModal,
        store,
        ...props,
      })
    },
  },
  'service.edit': {
    on({ store, detail, success, ...props }) {
      const modal = Modal.open({
        onOk: newObject => {
          store.update(detail, newObject).then(() => {
            Modal.close(modal)
            Notify.success({ content: `${t('Updated Successfully')}!` })
            success && success()
          })
        },
        modal: EditServiceModal,
        detail: toJS(detail._originData),
        type: detail.type,
        store,
        ...props,
      })
    },
  },
  'service.gateway.edit': {
    on({ store, detail, success, ...props }) {
      const modal = Modal.open({
        onOk: newObject => {
          store.update(detail, newObject).then(() => {
            Modal.close(modal)
            Notify.success({ content: `${t('Updated Successfully')}!` })
            success && success()
          })
        },
        modal: EditGatewayModal,
        detail: detail._originData,
        store,
        ...props,
      })
    },
  },
  'fedservice.gateway.edit': {
    on({ store, cluster, detail, resources, success, ...props }) {
      const modal = Modal.open({
        onOk: newObject => {
          const { name, namespace, template, overrides } = detail
          const data = {}
          let override = overrides.find(od => od.clusterName === cluster)
          if (!override) {
            override = {
              clusterName: cluster,
              clusterOverrides: [],
            }
            overrides.push(override)
          }

          const keys = ['metadata.annotations', 'spec.type', 'spec.ports']
          override.clusterOverrides = getOverrides(template, newObject, keys)
          set(data, 'spec.overrides', overrides)

          store.patch({ name, namespace }, data).then(() => {
            Modal.close(modal)
            Notify.success({ content: `${t('Updated Successfully')}!` })
            success && success()
          })
        },
        modal: EditGatewayModal,
        detail: get(resources, `${cluster}._originData`),
        store,
        ...props,
      })
    },
  },
  'service.delete': {
    on({ store, detail, success, ...props }) {
      const modal = Modal.open({
        onOk: () => {
          Modal.close(modal)
          Notify.success({ content: `${t('Deleted Successfully')}!` })
          success && success()
        },
        store,
        modal: DeleteModal,
        resource: detail,
        ...props,
      })
    },
  },
  'service.batch.delete': {
    on({ store, success, rowKey = 'name', ...props }) {
      const { data, selectedRowKeys } = toJS(store.list)

      const resource = data.filter(item =>
        selectedRowKeys.includes(item[rowKey])
      )

      if (isEmpty(resource)) {
        return
      }

      const modal = Modal.open({
        onOk: () => {
          Modal.close(modal)
          Notify.success({ content: `${t('Deleted Successfully')}!` })
          success && success()
        },
        modal: DeleteModal,
        resource,
        store,
        ...props,
      })
    },
  },
}
