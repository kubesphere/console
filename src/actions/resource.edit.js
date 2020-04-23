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

import { Modal } from 'components/Base'
import EditBasicInfoModal from 'components/Modals/EditBasicInfo'
import EditYamlModal from 'components/Modals/EditYaml'

import FederatedStore from 'stores/federated'

export default {
  'resource.baseinfo.edit': {
    on({ store, detail, success, ...props }) {
      const modal = Modal.open({
        onOk: data => {
          store.patch(detail, data).then(() => {
            Modal.close(modal)
            success && success()
          })
        },
        detail: detail._originData,
        modal: EditBasicInfoModal,
        store,
        ...props,
      })
    },
  },
  'resource.yaml.edit': {
    on({ store, detail, success, ...props }) {
      const fedStore = new FederatedStore(store.module)
      const _store = detail.isFedManaged ? fedStore : store
      const modal = Modal.open({
        onOk: async data => {
          await _store.patch(detail, data)
          Modal.close(modal)
          success && success()
        },
        store: _store,
        detail,
        modal: EditYamlModal,
        ...props,
      })
    },
  },
}
