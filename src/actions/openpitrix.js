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

import RepoAppModal from 'projects/components/Modals/RepoApp'
import AppEditModal from 'projects/components/Modals/AppEdit'
import DeleteModal from 'components/Modals/Delete'
import CreateRepoModal from 'components/Modals/AppRepoCreate'
import TemplateCreateModal from 'apps/components/Modals/AppCreate'
import TemplateUploadModal from 'apps/components/Modals/HelmUpload'
import TemplateEditModal from 'apps/components/Modals/AppEdit'
import TemplateDeployModal from 'apps/components/Modals/AppDeploy'

export default {
  'openpitrix.app.create': {
    on({ store, cluster, namespace, ...props }) {
      const modal = Modal.open({
        onOk: () => {
          Modal.close(modal)
        },
        store,
        cluster,
        namespace,
        modal: RepoAppModal,
        ...props,
      })
    },
  },
  'openpitrix.app.edit': {
    on({ store, detail, success, ...props }) {
      const modal = Modal.open({
        onOk: data => {
          store.patch(detail, data).then(() => {
            Modal.close(modal)
            Notify.success({ content: `${t('Updated Successfully')}!` })
            success && success()
          })
        },
        store,
        detail,
        modal: AppEditModal,
        ...props,
      })
    },
  },
  'openpitrix.app.destroy': {
    on({ store, detail, success, ...props }) {
      const modal = Modal.open({
        onOk: () => {
          store.destroy(detail.cluster).then(() => {
            Modal.close(modal)
            success && success()
          })
        },
        title: t('DESTROY_TITLE'),
        desc: t.html('DESTROY_TIP', {
          type: t('Application'),
          resource: detail.name,
        }),
        modal: DeleteModal,
        store,
        ...props,
      })
    },
  },
  'openpitrix.repo.add': {
    on({ store, workspace, success, ...props }) {
      const modal = Modal.open({
        onOk: async data => {
          await store.create({
            ...data,
            workspace,
            app_default_status: 'active',
          })
          Modal.close(modal)
          success && success()
        },
        store,
        modal: CreateRepoModal,
        workspace,
        ...props,
      })
    },
  },
  'openpitrix.repo.edit': {
    on({ store, detail, workspace, success, ...props }) {
      const modal = Modal.open({
        onOk: async data => {
          await store.update(data)
          Modal.close(modal)
          success && success()
        },
        store,
        detail,
        modal: CreateRepoModal,
        workspace,
        ...props,
      })
    },
  },
  'openpitrix.template.create': {
    on({ store, success, ...props }) {
      const modal = Modal.open({
        onOk: () => {
          Modal.close(modal)
          success && success()
        },
        store,
        modal: TemplateCreateModal,
        ...props,
      })
    },
  },
  'openpitrix.template.upload': {
    on({ store, workspace, success, ...props }) {
      const modal = Modal.open({
        onOk: async data => {
          await store.create({ ...data, workspace })
          Notify.success({ content: `${t('Upload Successfully')}!` })
          Modal.close(modal)
          success && success()
        },
        store,
        modal: TemplateUploadModal,
        title: t('UPLOAD_HELM_TITLE'),
        description: t('UPLOAD_HELM_DESC'),
        icon: 'templet',
        type: 'CREATE_APP',
        workspace,
        ...props,
      })
    },
  },
  'openpitrix.template.edit': {
    on({ store, success, ...props }) {
      const modal = Modal.open({
        onOk: async params => {
          await store.update(params)
          Modal.close(modal)
          Notify.success({ content: `${t('Modify Successfully')}!` })
          success && success()
        },
        store,
        modal: TemplateEditModal,
        success,
        ...props,
      })
    },
  },
  'openpitrix.template.addVersion': {
    on({ store, versionStore, workspace, success, ...props }) {
      const modal = Modal.open({
        onOk: async params => {
          await versionStore.create(params)
          Notify.success({ content: `${t('Add Version Successfully')}!` })
          Modal.close(modal)
          success && success()
        },
        store,
        modal: TemplateUploadModal,
        title: t('UPLOAD_HELM_TITLE'),
        description: t('UPLOAD_HELM_DESC'),
        icon: 'templet',
        type: 'CREATE_APP',
        workspace,
        ...props,
      })
    },
  },
  'openpitrix.template.deploy': {
    on({ store, success, ...props }) {
      const modal = Modal.open({
        onOk: async params => {
          const { namespace, cluster, workspace, ...rest } = params
          await store.deploy(rest, { workspace, namespace, cluster })
          Modal.close(modal)
          Notify.success({ content: `${t('Deploy Successfully')}!` })
          success && success()
        },
        store,
        modal: TemplateDeployModal,
        ...props,
      })
    },
  },
}
