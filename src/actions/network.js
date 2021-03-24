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

import { get, isEmpty } from 'lodash'
import { Notify } from '@kube-design/components'
import { Modal } from 'components/Base'
import NetworkPoliciesModal from 'components/Modals/Network/Policies'
import NetworkPoliciesIpBlockModal from 'components/Modals/Network/Policies/IpBlock'
import AddByYamlModal from 'components/Modals/Network/Policies/AddByYaml'
import CreateIPPoolModal from 'components/Modals/Network/IPPoolsCreate'
import IPPoolWorkspaceModal from 'components/Modals/Network/IPPoolWorkspace'
import DeleteModal from 'components/Modals/Delete'
import FORM_TEMPLATES from 'utils/form.templates'

export default {
  'network.policies.add': {
    on({ store, success, ...props }) {
      const { namespace, module, cluster } = props
      const modal = Modal.open({
        modal: NetworkPoliciesModal,
        onOk: data => {
          if (isEmpty(data)) {
            Modal.close(modal)
            return
          }
          store.create(data, { cluster, namespace }).then(() => {
            Modal.close(modal)
            Notify.success({ content: `${t('Created Successfully')}` })
            success && success()
          })
        },
        formTemplate: FORM_TEMPLATES[module]({ namespace }),
        store,
        ...props,
      })
    },
  },
  'network.policies.addIpBlock': {
    on({ store, success, ...props }) {
      const { namespace, module, cluster } = props
      const modal = Modal.open({
        modal: NetworkPoliciesIpBlockModal,
        onOk: data => {
          if (isEmpty(data)) {
            Modal.close(modal)
            return
          }
          store.create(data, { cluster, namespace }).then(() => {
            Modal.close(modal)
            Notify.success({ content: `${t('Created Successfully')}` })
            success && success()
          })
        },
        formTemplate: FORM_TEMPLATES[module]({ namespace }),
        store,
        ...props,
      })
    },
  },
  'network.policies.delete': {
    on({ store, success, ...props }) {
      const { namespace, cluster, ruleName } = props
      const modal = Modal.open({
        modal: DeleteModal,
        onOk: () => {
          store.delete({ name: ruleName, namespace, cluster }).then(() => {
            Modal.close(modal)
            Notify.success({ content: `${t('Deleted Successfully')}` })
            success && success()
          })
        },
        resource: ruleName,
        store,
        ...props,
      })
    },
  },
  'network.policies.addByYaml': {
    on({ store, detail, success, ...props }) {
      const { cluster } = props
      const modal = Modal.open({
        modal: AddByYamlModal,
        onOk: async data => {
          const namespace = get(data, 'metadata.namespace')
          await store.create(data, { namespace, cluster })
          Modal.close(modal)
          success && success()
        },
        store,
        ...props,
      })
    },
  },
  'network.ippool.add': {
    on({ store, success, ...props }) {
      const { cluster } = props
      const modal = Modal.open({
        modal: CreateIPPoolModal,
        onOk: async data => {
          const { cidrs } = data
          const reqs = []

          cidrs.forEach(item => {
            reqs.push(
              store.create(
                {
                  apiVersion: 'network.kubesphere.io/v1alpha1',
                  kind: 'IPPool',
                  metadata: {
                    name: item.name,
                    annotations: { 'kubesphere.io/description': item.desc },
                  },
                  spec: { type: 'calico', cidr: item.cidr },
                },
                { cluster }
              )
            )
          })
          await Promise.all(reqs)
          Modal.close(modal)
          success && success()
        },
        store,
        ...props,
      })
    },
  },
  'network.ipool.assignworkspace': {
    on({ store, success, detail, ...props }) {
      const modal = Modal.open({
        modal: IPPoolWorkspaceModal,
        onOk: async data => {
          await store.patch(detail, data)
          Modal.close(modal)
          success && success()
        },
        store,
        detail,
        ...props,
      })
    },
  },
}
