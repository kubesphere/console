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

import CreateModal from 'components/Modals/Create'
import RerunModal from 'components/Forms/ImageBuilder/RerunForm'
import FORM_TEMPLATES from 'utils/form.templates'
import formPersist from 'utils/form.persist'
import FORM_STEPS from 'configs/steps/imagebuilder'
import { get, isEmpty, isArray, set } from 'lodash'

const filterImageEnv = (data, fn) => {
  let environment = get(data, 'spec.config.environment')
  if (isArray(environment)) {
    environment = environment.filter(v => fn(v))
  }
  return environment
}

export default {
  'imagebuilder.create': {
    on({ store, cluster, namespace, module, success, ...props }) {
      const formTemplate = FORM_TEMPLATES[module]({
        namespace,
      })

      const modal = Modal.open({
        onOk: data => {
          if (!data) {
            return
          }

          const environment = filterImageEnv(data, v => !isEmpty(v))
          set(data, 'spec.config.environment', environment)

          store.create(data, { cluster, namespace }).then(() => {
            Modal.close(modal)
            Notify.success({ content: `${t('Created Successfully')}` })
            success && success()
            formPersist.delete(`${module}_create_form`)
          })
        },
        module,
        cluster,
        namespace,
        name: 'Image Builder',
        formTemplate,
        steps: FORM_STEPS,
        modal: CreateModal,
        noCodeEdit: true,
        store,
        ...props,
      })
    },
  },
  'imagebuilder.rerun': {
    on({ store, detail, success, ...props }) {
      const modal = Modal.open({
        onOk: data => {
          const environment = filterImageEnv(data, v => !isEmpty(v))
          set(data, 'spec.config.environment', environment)
          store.updateBuilder(data, detail).then(() => {
            Modal.close(modal)
            success && success()
          })
        },
        detail: toJS(detail._originData),
        modal: RerunModal,
        cluster: detail.cluster,
        namespace: detail.namespace,
        store,
        ...props,
      })
    },
  },
}
