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
import { get } from 'lodash'

import { Notify } from '@kube-design/components'
import { Modal } from 'components/Base'
import CreateModal from 'components/Modals/Create'
import EditServiceAccountModal from 'components/Modals/EditServiceAccount'
import ModifyServiceAccountRole from 'components/Modals/ModifyServiceAccountRole'

import { MODULE_KIND_MAP } from 'utils/constants'
import FORM_TEMPLATES from 'utils/form.templates'
import FORM_STEPS from 'configs/steps/serviceaccounts'

export default {
  'serviceaccount.create': {
    on({ store, cluster, namespace, workspace, module, success, ...props }) {
      const kind = MODULE_KIND_MAP[module]
      const formTemplate = {
        [kind]: FORM_TEMPLATES[module]({ namespace }),
      }
      const modal = Modal.open({
        onOk: newObject => {
          const data = get(newObject, kind)

          if (!data) {
            Notify.error({ content: t('Invalid configuration file format') })
            return
          }

          store
            .create(data, {
              cluster,
              namespace: namespace || get(data, 'metadata.namespace'),
            })
            .then(() => {
              Modal.close(modal)
              Notify.success({ content: `${t('Created Successfully')}` })
              success && success()
            })
        },
        modal: CreateModal,
        steps: FORM_STEPS,
        formTemplate,
        name: kind,
        store,
        module,
        cluster,
        namespace,
        workspace,
        ...props,
      })
    },
  },
  'serviceaccount.edit': {
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
        modal: EditServiceAccountModal,
        namespace: detail.namespace,
        store,
        ...props,
      })
    },
  },
  'serviceaccount.role.edit': {
    on({ store, detail, success, ...props }) {
      const modal = Modal.open({
        onOk: data => {
          store.patch(detail, data).then(() => {
            Modal.close(modal)
            Notify.success({ content: `${t('Updated Successfully')}` })
            success && success()
          })
        },
        detail: toJS(detail._originData),
        modal: ModifyServiceAccountRole,
        store,
        module,
        namespace: detail.namespace,
        ...props,
      })
    },
  },
}
