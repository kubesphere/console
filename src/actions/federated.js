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

import { get, set, unset, cloneDeep, uniqBy } from 'lodash'
import { Modal, Notify } from 'components/Base'
import FedProjectCreateModal from 'components/Modals/FedProjectCreate'
import FORM_TEMPLATES from 'utils/form.templates'
import FED_TEMPLATES from 'utils/fed.templates'

import FederatedStore from 'stores/federated'

export default {
  'federated.project.create': {
    on({ store, success, cluster, workspace, ...props }) {
      const modal = Modal.open({
        onOk: async data => {
          set(data, 'metadata.labels["kubesphere.io/workspace"]', workspace)
          const clusters = uniqBy(
            get(data, 'spec.placement.clusters', []),
            'name'
          )

          const federatedStore = new FederatedStore(store)
          set(data, 'spec.placement.clusters', clusters)

          const hostData = cloneDeep(data)
          set(
            hostData,
            'metadata.labels["kubesphere.io/kubefed-host-namespace"]',
            'true'
          )
          unset(hostData, 'spec.placement')
          unset(hostData, 'metadata.annotations')
          await store.create(hostData, { workspace })
          await federatedStore.create(FED_TEMPLATES.namespaces(data), {
            namespace: get(data, 'metadata.name'),
          })

          Modal.close(modal)
          Notify.success({ content: `${t('Created Successfully')}!` })
          success && success()
        },
        cluster,
        workspace,
        formTemplate: FORM_TEMPLATES.project(),
        modal: FedProjectCreateModal,
        store,
        ...props,
      })
    },
  },
}
