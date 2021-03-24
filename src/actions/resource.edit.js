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

import { toJS } from 'mobx'
import { Notify } from '@kube-design/components'
import { Modal } from 'components/Base'
import EditBasicInfoModal from 'components/Modals/EditBasicInfo'
import EditYamlModal from 'components/Modals/EditYaml'
import { set } from 'lodash'

export default {
  'resource.baseinfo.edit': {
    on({ store, detail, success, ...props }) {
      const modal = Modal.open({
        onOk: data => {
          store.patch(detail, data).then(() => {
            Modal.close(modal)
            Notify.success({ content: `${t('Updated Successfully')}` })
            success && success()
          })
        },
        detail: toJS(detail._originData || detail),
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
          set(data, 'metadata.resourceVersion', detail.resourceVersion)
          await store.update(detail, data)
          Notify.success({ content: `${t('Updated Successfully')}` })
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
