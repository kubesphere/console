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

import { cloneDeep, set, unset } from 'lodash'
import { Notify } from '@kube-design/components'
import { Modal } from 'components/Base'

import CreateModal from 'components/Modals/Create'
import { MODULE_KIND_MAP } from 'utils/constants'
import FORM_TEMPLATES from 'utils/form.templates'
import formPersist from 'utils/form.persist'
import { getQuery } from 'utils/alerting'

import FORM_STEPS from 'configs/steps/alerting.policy'

export default {
  'alerting.policy.create': {
    on({ store, cluster, namespace, module, success, detail, ...props }) {
      const kind = MODULE_KIND_MAP[module]
      const formTemplate = detail
        ? cloneDeep(detail)
        : FORM_TEMPLATES[module]({ namespace })

      const modal = Modal.open({
        onOk: async data => {
          if (!data) {
            return
          }

          const {
            ruleType = 'template',
            resources,
            rules,
            namespace: ns,
            kind: resourceKind = 'Node',
            ...params
          } = data

          if (ruleType === 'template') {
            params.query = rules
              .map(rule => getQuery({ kind: resourceKind, rule, resources }))
              .join(' or ')
            set(params, 'annotations.kind', resourceKind)
            set(params, 'annotations.resources', JSON.stringify(resources))
            set(params, 'annotations.rules', JSON.stringify(rules))
          } else {
            unset(params, 'annotations.kind')
            unset(params, 'annotations.resources')
            unset(params, 'annotations.rules')
          }

          if (detail) {
            await store.update(detail, params)
            Notify.success({ content: `${t('Updated Successfully')}` })
          } else {
            await store.create(params, { cluster, namespace })
            Notify.success({ content: `${t('Created Successfully')}` })
          }

          Modal.close(modal)
          success && success()
          formPersist.delete(`${module}_create_form`)
        },
        module,
        cluster,
        namespace,
        name: kind,
        formTemplate,
        modal: CreateModal,
        steps: FORM_STEPS,
        noCodeEdit: true,
        isEdit: !!detail,
        okBtnText: detail ? t('Update') : t('Create'),
        store,
        ...props,
      })
    },
  },
}
