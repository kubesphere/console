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
import { set, isEmpty } from 'lodash'
import GatewaySettingModal from 'projects/components/Modals/GatewaySetting'
import DeleteModal from 'components/Modals/Delete'
import FORM_TEMPLATES from 'utils/form.templates'
import UpdateGatewayModal from 'projects/components/Modals/UpdateGateway'

export default {
  'gateways.create': {
    on({ store, cluster, namespace, name, success, ...props }) {
      const modal = Modal.open({
        onOk: data => {
          set(data, 'metadata', {
            namespace,
            name,
            creator: globals.user.username,
            createTime: new Date(),
            annotations: { ...data.metadata.annotations },
          })

          if (namespace !== 'kubesphere-controls-system') {
            set(data, 'spec.controller.scope', { enabled: true, namespace })
          }

          store.addGateway({ cluster, namespace }, data).then(() => {
            Modal.close(modal)
            Notify.success({ content: t('CREATE_SUCCESSFUL') })
            success && success()
          })
        },
        modal: GatewaySettingModal,
        store,
        detail: FORM_TEMPLATES.gateways(),
        ...props,
      })
    },
  },
  'gateways.edit': {
    on({ store, detail, cluster, namespace, success, ...props }) {
      const modal = Modal.open({
        onOk: data => {
          store.editGateway({ cluster, namespace }, data).then(() => {
            Modal.close(modal)
            Notify.success({ content: t('UPDATED_SUCCESS_DESC') })
            success && success()
          })
        },
        modal: GatewaySettingModal,
        detail,
        cluster,
        namespace,
        store,
        ...props,
      })
    },
  },
  'gateways.delete': {
    on({ store, resource, detail, cluster, namespace, success, ...props }) {
      const modal = Modal.open({
        onOk: () => {
          store
            .deleteGateway({
              cluster,
              namespace,
              isOld: isEmpty(detail.createTime),
            })
            .then(() => {
              Modal.close(modal)
              Notify.success({ content: t('DELETE_SUCCESS_DESC') })
              success && success()
            })
        },
        store,
        modal: DeleteModal,
        type: 'GATEWAY',
        resource,
        cluster,
        namespace,
        ...props,
      })
    },
  },
  'gateways.update': {
    on({ store, detail, cluster, namespace, success, ...props }) {
      const modal = Modal.open({
        onOk: () => {
          store
            .updateGateway(
              { cluster, namespace, gatewayName: detail.metadata.name },
              detail
            )
            .then(() => {
              Modal.close(modal)
              Notify.success({ content: t('UPDATED_SUCCESS_DESC') })
              success && success()
            })
        },
        modal: UpdateGatewayModal,
        detail,
        store,
        cluster,
        namespace,
        ...props,
      })
    },
  },
  'gateways.batch.delete': {
    on({ store, success, rowKey, ...props }) {
      const { data, selectedRowKeys } = store.list

      const selectValues = data
        .filter(item => selectedRowKeys.includes(item[rowKey]))
        .map(item => {
          return { name: item.name, namespace: item.namespace }
        })

      const selectNames = selectValues.map(item => item.name)
      const modal = Modal.open({
        onOk: async () => {
          const reqs = []

          data.forEach(item => {
            const selectValue = selectValues.find(
              value =>
                value.name === item.name && value.namespace === item.namespace
            )

            if (selectValue) {
              const name = item.name.split('kubesphere-router-')[1]
              const namespace = name === 'kubesphere-system' ? '' : name
              const cluster = item.cluster

              reqs.push(store.deleteGateway({ namespace, cluster }))
            }
          })

          await Promise.all(reqs)

          Modal.close(modal)
          Notify.success({ content: t('DELETE_SUCCESS_DESC') })
          store.setSelectRowKeys([])
          success && success()
        },
        resource: selectNames.join(', '),
        modal: DeleteModal,
        store,
        ...props,
      })
    },
  },
}
