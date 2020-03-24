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

import { get, omitBy, isEmpty } from 'lodash'
import { Modal } from 'components/Base'
import QuotaEditModal from 'components/Modals/QuotaEdit'

import QuotaStore from 'stores/quota'

export default {
  'project.qutoa.edit': {
    on({ store, detail, success, ...props }) {
      const quotaStore = new QuotaStore()
      const modal = Modal.open({
        onOk: async data => {
          const params = {
            name: data.name,
            namespace: detail.name,
          }

          const spec = get(data, 'spec.hard', {})
          data.spec = { hard: omitBy(spec, isEmpty) }
          const resp = await quotaStore.checkName(params)

          if (resp.exist) {
            await quotaStore.update(params, {
              apiVersion: 'v1',
              kind: 'ResourceQuota',
              metadata: { ...params, name: detail.name },
              spec: data.spec,
            })
          } else {
            await quotaStore.create({
              apiVersion: 'v1',
              kind: 'ResourceQuota',
              metadata: { ...params, name: detail.name },
              spec: data.spec,
            })
          }

          Modal.close(modal)

          success && success()
        },
        detail,
        store: quotaStore,
        modal: QuotaEditModal,
        ...props,
      })
    },
  },
}
