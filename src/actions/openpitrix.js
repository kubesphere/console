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
import React from 'react'
import { Notify } from '@kube-design/components'
import { Modal } from 'components/Base'

import RepoAppModal from 'projects/components/Modals/RepoApp'
import AppEditModal from 'projects/components/Modals/AppEdit'
import AppTemplateEditModal from 'projects/components/Modals/AppTemplateEdit'
import DeleteModal from 'components/Modals/Delete'
import CreateRepoModal from 'components/Modals/AppRepoCreate'
import TemplateCreateModal from 'apps/components/Modals/AppCreate'
import TemplateUploadModal from 'apps/components/Modals/HelmUpload'
import TemplateEditModal from 'apps/components/Modals/AppEdit'
import TemplateDeployModal from 'apps/components/Modals/AppDeploy'
import ConfirmModal from 'apps/components/Modals/Confirm'
import AppReviewModal from 'apps/components/Modals/AppReview'
import RejectModal from 'apps/components/Modals/ReviewReject'
import CategoryCreateModal from 'apps/components/Modals/CategoryCreate'
import AdjustCategoryModal from 'apps/components/Modals/CategoryAdjust'
import AppAgreementModal from 'apps/components/Modals/AppAgreement'

import { HANDLE_TYPE_TO_SHOW } from 'configs/openpitrix/version'

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
            Notify.success({ content: t('UPDATE_SUCCESSFUL') })
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
  'openpitrix.app.template.edit': {
    on({ store, detail, success, ...props }) {
      const modal = Modal.open({
        onOk: data => {
          store.upgrade(data, detail).then(() => {
            Modal.close(modal)
            Notify.success({ content: t('UPDATE_SUCCESSFUL') })
            success && success()
          })
        },
        store,
        detail,
        modal: AppTemplateEditModal,
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
          Notify.success({ content: t('UPLOAD_SUCCESSFUL') })
          Modal.close(modal)
          success && success()
        },
        store,
        modal: TemplateUploadModal,
        title: t('UPLOAD_HELM_TITLE'),
        description: t('UPLOAD_HELM_CHART_DESC'),
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
          Notify.success({ content: t('MODIFY_SUCCESSFUL') })
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
          Notify.success({ content: t('ADD_VERSION_SUCCESSFUL') })
          Modal.close(modal)
          success && success()
        },
        store,
        modal: TemplateUploadModal,
        title: t('UPLOAD_HELM_TITLE'),
        description: t('UPLOAD_HELM_CHART_DESC'),
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
          Notify.success({ content: `${t('DEPLOYED_SUCCESSFUL')}` })
          success && success()
        },
        store,
        modal: TemplateDeployModal,
        ...props,
      })
    },
  },
  'openpitrix.template.delete': {
    on({ store, detail, versions, success, ...props }) {
      const type = 'APP_TEMPLATE'
      const resource = detail.name
      let desc = t.html('DELETE_APP_TEMPLATE_DESC', { resource })
      if (versions.length) {
        desc = (
          <span>
            {t.html('DELETE_APP_TEMPLATE_VERSIONS_DESC', { resource })}
          </span>
        )
      }
      const modal = Modal.open({
        onOk: async () => {
          await store.delete(detail)
          Modal.close(modal)
          Notify.success({ content: t('DELETED_SUCCESSFULLY') })
          success && success()
        },
        store,
        desc,
        type,
        resource,
        modal: DeleteModal,
        ...props,
      })
    },
  },
  'openpitrix.template.action': {
    on({ store, detail, handleType, success, ...props }) {
      const modal = Modal.open({
        onOk: async () => {
          await store.handle({ action: handleType, app_id: detail.app_id })
          const type = HANDLE_TYPE_TO_SHOW[handleType] || handleType
          Modal.close(modal)
          Notify.success({
            content: `${t(`${type.toUpperCase()}_SUCCESSFUL`)}`,
          })
          success && success()
        },
        content: t.html(`APP_${(handleType || 'suspend').toUpperCase()}_TIP`, {
          name: detail.name,
        }),
        modal: ConfirmModal,
        store,
        ...props,
      })
    },
  },
  'openpitrix.template.review': {
    on({ store, detail, type, success, onReject, ...props }) {
      const modal = Modal.open({
        onOk: async () => {
          const { app_id, version_id } = detail
          await store.handle({ app_id, version_id, action: 'pass' })
          Modal.close(modal)
          Notify.success(t('RELEASE_SUCCESSFUL'))
          success && success()
        },
        onReject: () => {
          Modal.close(modal)
          onReject()
        },
        icon: 'safe-notice',
        title: t('APP_DETAILS'),
        description: t('APP_DETAILS_DESC'),
        canHandle: type === 'unprocessed',
        modal: AppReviewModal,
        detail,
        store,
        ...props,
      })
    },
  },
  'openpitrix.template.reject': {
    on({ store, detail, type, success, ...props }) {
      const modal = Modal.open({
        onOk: async params => {
          const { app_id, version_id } = detail
          await store.handle({
            app_id,
            version_id,
            action: 'reject',
            ...params,
          })
          Modal.close(modal)
          Notify.success(t('REJECT_SUCCESSFUL'))
          success && success()
        },
        icon: 'safe-notice',
        title: t('REJECTION_REASON'),
        description: t('REJECT_REASON_DESC'),
        canHandle: type === 'unprocessed',
        versionId: detail.version_id || '',
        modal: RejectModal,
        store,
        ...props,
      })
    },
  },
  'openpitrix.category.edit': {
    on({ store, detail, names, success, ...props }) {
      const modal = Modal.open({
        onOk: async params => {
          let content
          if (detail.category_id) {
            await store.update(params)
            content = `${t('MODIFY_SUCCESSFUL')}`
          } else {
            await store.create(params)
            content = t('CREATE_SUCCESSFUL')
          }
          Modal.close(modal)
          Notify.success({ content })
          success && success()
        },
        title: t('CATEGORY'),
        icon: 'tag',
        detail,
        categoryNames: names,
        modal: CategoryCreateModal,
        store,
        ...props,
      })
    },
  },
  'openpitrix.category.delete': {
    on({ store, detail, success, ...props }) {
      const modal = Modal.open({
        onOk: async () => {
          await store.delete(detail)
          Modal.close(modal)
          Notify.success({ content: t('DELETED_SUCCESSFULLY') })
          success && success()
        },
        desc: t.html('DELETE_CATEGORY_DESC', { name: detail.name }),
        modal: DeleteModal,
        store,
        ...props,
      })
    },
  },
  'openpitrix.category.ajust': {
    on({ store, success, ...props }) {
      const modal = Modal.open({
        onOk: async params => {
          await store.adjustCategory(params)
          Modal.close(modal)
          Notify.success({ content: `${t('CHANGED_SUCCESSFULLY')}` })
          success && success()
        },
        title: t('CHANGE_CATEGORY'),
        icon: 'tag',
        modal: AdjustCategoryModal,
        store,
        ...props,
      })
    },
  },
  'openpitrix.app.agreement': {
    on({ success, ...props }) {
      const modal = Modal.open({
        onOk: () => {
          Modal.close(modal)
          success && success()
        },
        modal: AppAgreementModal,
        ...props,
      })
    },
  },
}
