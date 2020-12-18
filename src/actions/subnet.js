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

import { get, isUndefined } from 'lodash'
import { Modal } from 'components/Base'
import { Notify } from '@kube-design/components'
import FORM_TEMPLATES from 'utils/form.templates'
import { MODULE_KIND_MAP } from 'utils/constants'
import FORM_STEPS from 'configs/steps/subnets'
import CreateModal from 'components/Modals/Create'
import formPersist from 'utils/form.persist'
import EditSubnetModal from 'clusters/components/Modals/EditSubnet'

export default {
  'subnet.create': {
    on({ store, cluster, module, success, ...props }) {
      const kind = MODULE_KIND_MAP[module]
      const formTemplate = {
        [kind]: FORM_TEMPLATES[module](),
      }

      const modal = Modal.open({
        onOk: newObject => {
          const data = get(newObject, kind)

          if (!data) {
            return
          }

          store
            .create(data, {
              cluster,
            })
            .then(() => {
              Modal.close(modal)
              Notify.success({ content: `${t('Created Successfully')}!` })
              success && success()
              formPersist.delete(`${module}_create_form`)
            })
        },
        module,
        cluster,
        name: kind,
        formTemplate,
        steps: FORM_STEPS.create_subnet,
        modal: CreateModal,
        store,
        ...props,
      })
    },
  },
  'subnet.edit': {
    on({ store, module, detail, success, ...props }) {
      const { disabled } = props

      const formTemplate = FORM_TEMPLATES[module]()
      formTemplate.metadata = detail._originData.metadata
      formTemplate.spec = detail._originData.spec

      if (!isUndefined(disabled) && disabled) {
        Notify.error({ content: t('EDIT_DEFAULT_SUBNET') })
        return false
      }

      const modal = Modal.open({
        onOk: newObject => {
          store.update(detail, newObject).then(() => {
            Modal.close(modal)
            Notify.success({ content: `${t('Updated Successfully')}!` })
            success && success()
          })
        },
        modal: EditSubnetModal,
        formTemplate,
        cluster: detail.cluster,
        store,
        ...props,
      })
    },
  },
}
