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

import { get } from 'lodash'
import { Modal, Notify } from 'components/Base'

import CreateModal from 'components/Modals/Create'
import EditBasicInfoModal from 'components/Modals/EditBasicInfo'
import ChangeStatusModal from 'components/Modals/Alerting/PolicyStatus'
import CommentModal from 'components/Modals/Alerting/Comment'
import { MODULE_KIND_MAP } from 'utils/constants'
import FORM_TEMPLATES from 'utils/form.templates'
import formPersist from 'utils/form.persist'

import FORM_STEPS from 'configs/steps/alerting.policy'

export default {
  'alerting.policy.create': {
    on({ store, cluster, namespace, module, success, ...props }) {
      const kind = MODULE_KIND_MAP[module]
      const formTemplate = {
        [kind]: FORM_TEMPLATES[module]({
          namespace,
        }),
      }

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
        module,
        cluster,
        namespace,
        name: kind,
        formTemplate,
        modal: CreateModal,
        steps: FORM_STEPS,
        noCodeEdit: true,
        store,
        ...props,
      })
    },
  },
  'alerting.policy.edit': {
    on({ store, detail, cluster, success, ...props }) {
      const modal = Modal.open({
        onOk: newObect => {
          const data = {
            policy_name: get(
              newObect,
              'metadata.annotations["kubesphere.io/alias-name"]',
              ''
            ),
            policy_description: get(
              newObect,
              'metadata.annotations["kubesphere.io/description"]',
              ''
            ),
          }

          store.patchBasicInfo(detail, data).then(() => {
            Modal.close(modal)
            Notify.success({ content: `${t('Updated Successfully')}!` })
            success && success()
          })
        },
        detail,
        modal: EditBasicInfoModal,
        store,
        ...props,
      })
    },
  },
  'alerting.status.edit': {
    on({ store, detail, success, ...props }) {
      const modal = Modal.open({
        onOk: newObject => {
          newObject.disabled = newObject.disabled === 'true'

          store.patch(detail, newObject).then(() => {
            Modal.close(modal)
            Notify.success({ content: `${t('Updated Successfully')}!` })
            success && success()
          })
        },
        detail,
        modal: ChangeStatusModal,
        store,
        ...props,
      })
    },
  },
  'alerting.message.comment': {
    on({ store, detail, success, ...props }) {
      const modal = Modal.open({
        onOk: newData => {
          const { cluster, id, comment = '' } = newData || {}
          const addresser = get(globals, 'user.email')
          const data = {
            history_id: id,
            addresser,
            content: comment,
          }

          store.createComment({ cluster }, data).then(() => {
            Modal.close(modal)
            Notify.success({ content: `${t('Updated Successfully')}!` })
            success && success()
          })
        },
        detail,
        modal: CommentModal,
        store,
        ...props,
      })
    },
  },
}
