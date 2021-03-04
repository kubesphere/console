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

import CreateModal from 'settings/components/Modals/SecretCreate'
import SecretEditModal from 'components/Modals/SecretEdit'
import { MODULE_KIND_MAP } from 'utils/constants'
import FORM_TEMPLATES from 'utils/form.templates'

export default {
  'notification.secret.create': {
    on({ store, module, success, ...props }) {
      const kind = MODULE_KIND_MAP[module]
      const formTemplate = {
        [kind]: FORM_TEMPLATES[module]({}),
      }
      const modal = Modal.open({
        onOk: data => {
          if (!data) {
            return
          }

          store.create(data).then(() => {
            Modal.close(modal)
            Notify.success({ content: `${t('Created Successfully')}!` })
            success && success()
          })
        },
        module,
        formTemplate,
        modal: CreateModal,
        store,
        ...props,
      })
    },
  },
  'notification.secret.edit': {
    on({ store, detail, success, ...props }) {
      const modal = Modal.open({
        onOk: data => {
          store.update(detail, data).then(() => {
            Modal.close(modal)
            success && success()
          })
        },
        store,
        detail,
        modal: SecretEditModal,
        ...props,
      })
    },
  },
}
