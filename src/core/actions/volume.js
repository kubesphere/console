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

import { Modal, Notify } from 'components/Base'
import CreateModal from 'components/Modals/Create'
import NameModal from 'projects/components/Modals/ResourceNamed'
import ExpandModal from 'projects/components/Modals/ExpandVolume'

import { MODULE_KIND_MAP } from 'utils/constants'
import FORM_TEMPLATES from 'utils/form.templates'
import formPersist from 'utils/form.persist'
import FORM_STEPS, { APPLY_SNAPSHOT_FORM_STEPS } from 'configs/steps/volumes'

export default {
  'volume.create': {
    on({
      fromSnapshot,
      store,
      namespace,
      module,
      extendformTemplate,
      success,
      ...props
    }) {
      const kind = MODULE_KIND_MAP[module]
      const formTemplate = {
        [kind]: {
          ...FORM_TEMPLATES[module]({
            namespace,
          }),
          ...extendformTemplate,
        },
      }

      const modal = Modal.open({
        onOk: async newObject => {
          if (!newObject.PersistentVolumeClaim) {
            return
          }

          await store.create(newObject.PersistentVolumeClaim)
          Modal.close(modal)
          Notify.success({ content: `${t('Created Successfully')}!` })
          success && success()
          formPersist.delete(`${module}_create_form`)
        },
        module,
        namespace,
        name: kind,
        formTemplate,
        steps: fromSnapshot ? APPLY_SNAPSHOT_FORM_STEPS : FORM_STEPS,
        modal: CreateModal,
        store,
        ...props,
      })
    },
  },
  'volume.clone': {
    on({ store, ...props }) {
      const modal = Modal.open({
        onOk: async params => {
          await store.cloneVolume(params)
          Modal.close(modal)
          Notify.success({ content: `${t('Created Successfully')}!` })
        },
        title: t('Volume Clone'),
        modal: NameModal,
        ...props,
      })
    },
  },
  'volume.create.snapshot': {
    on({ store, ...props }) {
      const modal = Modal.open({
        onOk: async params => {
          await store.createSnapshot(params)
          Modal.close(modal)
          Notify.success({ content: `${t('Created Successfully')}!` })
        },
        title: t('Create Snapshot'),
        modal: NameModal,
        ...props,
      })
    },
  },
  'volume.expand': {
    on({ store, ...props }) {
      const modal = Modal.open({
        onOk: async params => {
          await store.patch(store.detail, params)
          Modal.close(modal)
          Notify.success({ content: `${t('Updated Successfully')}!` })
        },
        modal: ExpandModal,
        ...props,
      })
    },
  },
}
