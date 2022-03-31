/*
 * This file is part of KubeSphere Console.
 * Copyright (C) 2022 The KubeSphere Console Authors.
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
import { Modal } from 'components/Base'
import { Notify } from '@kube-design/components'
import DeleteModal from 'components/Modals/Delete'
import CodeRepoForm from 'components/Modals/CodeRepoCreate'

export default {
  'codeRepo.create': {
    on({ store, cluster, workspace, module, success, ...props }) {
      const modal = Modal.open({
        onOk: async data => {
          await store.create({ data, devops: props.devops })

          Notify.success({ content: t('CREATE_SUCCESSFUL') })
          success && success()
          Modal.close(modal)
        },
        store,
        module,
        cluster,
        formTemplate: {},
        modal: CodeRepoForm,
        ...props,
      })
    },
  },
  'codeRepo.delete': {
    on({ store, detail, success, ...props }) {
      const modal = Modal.open({
        onOk: () => {
          Modal.close(modal)
          Notify.success({ content: t('DELETE_SUCCESSFUL') })
          success && success()
        },
        store,
        modal: DeleteModal,
        resource: detail,
        ...props,
      })
    },
  },
}
