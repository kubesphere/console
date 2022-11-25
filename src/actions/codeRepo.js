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
import { cloneDeep, get, set } from 'lodash'
import { Notify } from '@kube-design/components'

import { Modal } from 'components/Base'
import FORM_TEMPLATES from 'utils/form.templates'
import DeleteModal from 'components/Modals/Delete'
import CodeRepoModal from 'components/Modals/CodeRepoCreate'

import { getRepoUrl, isSvnRepo } from '../utils/devops'

const handleFormData = ({ data, module, devops }) => {
  const postData = FORM_TEMPLATES[module]({ namespace: devops })
  const repoType = data.sources.source_type
  const repo = get(data, `sources.${repoType}_source`, {})

  const spec = {
    provider: data.sources.source_type,
    owner: repo.owner,
    repo: repo.repo,
    server: repo.server_name,
    url: repo.url || repo.remote,
    secret: {
      name: repo.credential_id || data.sources.credentialId,
      namespace: devops,
    },
  }

  set(postData, 'metadata', data.metadata)
  set(postData, 'spec', spec)
  return postData
}

export default {
  'codeRepo.create': {
    on({
      store,
      cluster,
      devops,
      module,
      success,
      isComplexMode,
      addSvnCodeRepoDirectly,
      ...props
    }) {
      const modal = Modal.open({
        onOk: async data => {
          if (isSvnRepo(data.sources.source_type) && addSvnCodeRepoDirectly) {
            addSvnCodeRepoDirectly(data)
            Notify.success({ content: t('CREATE_SUCCESSFUL') })
            success && success()
            Modal.close(modal)
            return
          }

          const postData = handleFormData({ data, module, devops })
          const { metadata, spec } = await store.create({
            data: postData,
            devops,
            cluster,
          })

          Notify.success({ content: t('CREATE_SUCCESSFUL') })
          success &&
            success(
              isComplexMode
                ? `${metadata.name}(${getRepoUrl(spec)})`
                : undefined
            )
          Modal.close(modal)
        },
        store,
        module,
        cluster,
        devops,
        formTemplate: {},
        modal: CodeRepoModal,
        ...props,
      })
    },
  },
  'codeRepo.edit': {
    on({ store, cluster, devops, module, detail, success, ...props }) {
      const template = cloneDeep(detail)
      const metadata = get(template, '_originData.metadata', {})

      const type = template.provider === 'git' ? 'url' : 'repo'

      const editTemplate = {
        metadata,
        sources: {
          source_type: template.provider,
          [`${template.provider}_source`]: {
            [type]: template.repoURL,
          },
          credentialId: template.secret.name,
        },
      }

      const modal = Modal.open({
        onOk: async data => {
          const postData = handleFormData({
            data,
            module,
            devops,
          })

          await store.edit({
            data: postData,
            devops,
            name: detail.name,
            cluster,
          })

          Notify.success({ content: t('UPDATE_SUCCESSFUL') })
          success && success()
          Modal.close(modal)
        },
        store,
        module,
        cluster,
        devops,
        formTemplate: editTemplate,
        modal: CodeRepoModal,
        isEdit: true,
        ...props,
      })
    },
  },
  'codeRepo.delete': {
    on({ store, detail, devops, success, ...props }) {
      const modal = Modal.open({
        onOk: async () => {
          await store.delete({ ...detail, devops })
          Modal.close(modal)
          Notify.success({ content: t('DELETED_SUCCESSFULLY') })
          success && success()
        },
        store,
        modal: DeleteModal,
        resource: detail.name,
        ...props,
      })
    },
  },
}
