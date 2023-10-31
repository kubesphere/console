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

import CreateModal from 'components/Modals/Create'
import EditBasicInfoModal from 'components/Modals/EditBasicInfo'
import FORM_STEPS from 'configs/steps/devopsImageBuilder'
import { get, set } from 'lodash'
import moment from 'moment-mini'

export default {
  'devops.imagebuilder.create': {
    on({ store, cluster, namespace, module, success, ...props }) {
      const formTemplate = store.getFormTemplate({
        namespace,
      })

      const modal = Modal.open({
        onOk: data => {
          if (!data) {
            return
          }

          set(data, 'spec.source.revisionId', undefined)
          set(
            data,
            'spec.output.image',
            `${get(data, 'spec.output.image')}:${get(data, 'spec.output.tag')}`
          )
          const now = moment().format('YYYYMMDDHHmmss')
          set(
            data,
            'metadata.name',
            `${get(
              data,
              'metadata.annotations.languageType',
              'image-builder'
            )}-${now}-${Math.random()
              .toString(32)
              .slice(2)}`
          )
          store.create(data, { cluster, namespace }).then(() => {
            Modal.close(modal)
            Notify.success({ content: t('CREATE_SUCCESSFUL') })
            success && success()
          })
        },
        module,
        cluster,
        namespace,
        hideB2i: true,
        hideAdvanced: true,
        name: 'IMAGE_BUILDER',
        formTemplate,
        steps: FORM_STEPS,
        modal: CreateModal,
        noCodeEdit: true,
        store,
        ...props,
      })
    },
  },
  'devops.imagebuilder.baseinfo.edit': {
    on({ store, detail, success, ...props }) {
      const modal = Modal.open({
        onOk: _data => {
          store.update(detail, _data).then(() => {
            Modal.close(modal)
            Notify.success({ content: t('UPDATE_SUCCESSFUL') })
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
}
