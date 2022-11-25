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
import GatewayStore from 'stores/gateway'

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
        cluster,
        namespace,
        name,
        store,
        detail: FORM_TEMPLATES.gateways(),
        ...props,
      })
    },
  },
  'gateways.edit': {
    async on({ store, detail, cluster, namespace, success, ...props }) {
      const gateWayStore = new GatewayStore()
      const params = namespace === '' ? { cluster } : { cluster, namespace }
      const versionData = await gateWayStore.getGateway({
        ...params,
      })
      let version = versionData.resourceVersion
      const modal = Modal.open({
        onOk: async data => {
          const latestData = await gateWayStore.getGateway({
            ...params,
          })
          if (latestData.resourceVersion === version) {
            set(data, 'metadata.resourceVersion', latestData.resourceVersion)
            store.editGateway({ cluster, namespace }, data).then(() => {
              Modal.close(modal)
              Notify.success({ content: t('UPDATE_SUCCESSFUL') })
              success && success()
            })
          } else {
            version = latestData.resourceVersion
            Notify.info({ content: t('GATEWAY_UPDATING_TIP') })
          }
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
      const desc = resource
        ? t.html('DELETE_RESOURCE_TYPE_DESC_GW', {
            resource,
            type: t('GATEWAY_LOW'),
          })
        : t('DISABLE_GATEWAY_TIP')
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
              Notify.success({ content: t('DISABLE_SUCCESSFUL') })
              success && success()
            })
        },
        store,
        modal: DeleteModal,
        title: t('DISABLE_GATEWAY'),
        desc,
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
              Notify.success({ content: t('UPDATE_SUCCESSFUL') })
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
          Notify.success({ content: t('DELETED_SUCCESSFULLY') })
          store.setSelectRowKeys([])
          success && success()
        },
        resource: selectNames.join(', '),
        modal: DeleteModal,
        title:
          selectNames.length === 1
            ? t('DISABLE_GATEWAY')
            : t('DISABLE_MULTIPLE_GATEWAYS'),
        store,
        ...props,
      })
    },
  },
}
