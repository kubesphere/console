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

import CreateModal from 'components/Modals/UserCreate'
import ModifyPasswordModal from 'components/Modals/ModifyPassword'
import UserSettingModal from 'components/Modals/UserSetting'
import set from 'lodash/set'

export default {
  'user.create': {
    on({ store, success, ...props }) {
      const modal = Modal.open({
        onOk: async data => {
          if (!data) {
            Modal.close(modal)
            return
          }

          set(
            data,
            'metadata.annotations["iam.kubesphere.io/uninitialized"]',
            'true'
          )

          await store.create(data)

          Modal.close(modal)
          Notify.success({ content: `${t('Created Successfully')}` })
          success && success()
        },
        modal: CreateModal,
        store,
        ...props,
      })
    },
  },
  'user.edit': {
    on({ store, detail, success, ...props }) {
      const modal = Modal.open({
        onOk: async data => {
          if (!data) {
            Modal.close(modal)
            return
          }

          set(data, 'metadata.resourceVersion', detail.resourceVersion)
          await store.update(detail, data)

          Modal.close(modal)
          Notify.success({ content: `${t('Updated Successfully')}` })
          success && success()
        },
        modal: CreateModal,
        detail,
        store,
        ...props,
      })
    },
  },
  'user.setting': {
    on({ store, success, ...props }) {
      const modal = Modal.open({
        onOk: async data => {
          if (!data) {
            Modal.close(modal)
            return
          }

          const { currentPassword, password, rePassword, ...rest } = data
          if (currentPassword && password) {
            await store.modifyPassword(
              { name: globals.user.username },
              { currentPassword, password }
            )
            setTimeout(() => {
              location.href = '/login'
            }, 1000)
          } else {
            await store.update({ name: globals.user.username }, rest)
          }

          Modal.close(modal)
          Notify.success({ content: `${t('Updated Successfully')}` })
          success && success()
        },
        modal: UserSettingModal,
        store,
        ...props,
      })
    },
  },
  'user.modifypassword': {
    on({ store, detail, success, ...props }) {
      const modal = Modal.open({
        onOk: data => {
          if (!data) {
            Modal.close(modal)
            return
          }
          store.modifyPassword(detail, data).then(() => {
            Modal.close(modal)
            Notify.success({ content: `${t('Updated Successfully')}` })
            success && success()
          })
        },
        modal: ModifyPasswordModal,
        detail,
        store,
        ...props,
      })
    },
  },
}
