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

import { get, pick, set } from 'lodash'
import { Notify } from '@kube-design/components'
import { Modal } from 'components/Base'

import CreateModal from 'components/Modals/Create'
import SecretEditModal from 'projects/components/Modals/SecretEdit'
import { MODULE_KIND_MAP } from 'utils/constants'
import FORM_TEMPLATES from 'utils/form.templates'
import formPersist from 'utils/form.persist'
import FORM_STEPS from 'configs/steps/secrets'
import SetDefaultSecretClass from 'components/Modals/SetDefaultSecretClass'

export default {
  'secret.create': {
    on({
      store,
      cluster,
      namespace,
      module,
      isFederated,
      success,
      prevDefault,
      ...props
    }) {
      const kind = MODULE_KIND_MAP[module]
      const formTemplate = {
        [kind]: FORM_TEMPLATES[module]({
          namespace,
        }),
      }

      if (isFederated) {
        Object.keys(formTemplate).forEach(key => {
          formTemplate[key] = FORM_TEMPLATES.federated({
            data: formTemplate[key],
            clusters: props.projectDetail.clusters.map(item => item.name),
            kind: key,
          })
        })
      }

      const modal = Modal.open({
        onOk: async newObject => {
          const data = get(newObject, kind)

          if (!data) {
            return
          }

          await clearDefault(store, data, {
            cluster,
            namespace: namespace || get(data, 'metadata.namespace'),
          })

          store
            .create(data, {
              cluster,
              namespace: namespace || get(data, 'metadata.namespace'),
            })
            .then(() => {
              Modal.close(modal)

              Notify.success({ content: t('CREATE_SUCCESSFUL') })
              success && success(data)

              formPersist.delete(`${module}_create_form`)
            })
        },
        module,
        cluster,
        namespace,
        name: kind,
        isFederated,
        formTemplate,
        steps: FORM_STEPS,
        modal: CreateModal,
        store,
        ...props,
      })
    },
  },
  'secret.edit': {
    on({ store, detail, success, ...props }) {
      const modal = Modal.open({
        onOk: async data => {
          set(data, 'metadata.resourceVersion', detail.resourceVersion)
          if (props.isFederated) {
            set(data, 'apiVersion', store.version)
            set(data, 'kind', store.secretKind)
          }

          await clearDefault(store, data, {
            cluster: detail.cluster,
            namespace: detail.namespace,
          })
          store.update(detail, data).then(() => {
            Modal.close(modal)
            Notify.success({ content: t('UPDATE_SUCCESSFUL') })
            success && success()
          })
        },
        store,
        detail,
        modal: SecretEditModal,
        disableSelect: true,
        ...props,
      })
    },
  },
  'secret.default': {
    on({ store, detail, cluster, success, ...props }) {
      const modal = Modal.open({
        onOk: async () => {
          const prevDefault = await getDefault(store, {
            cluster,
            namespace: detail.namespace,
          })
          await store.setDefault(
            {
              cluster,
              namespace: detail.namespace,
              name: detail.name,
            },
            {
              cluster,
              namespace: prevDefault.namespace,
              name: prevDefault.name,
            }
          )
          Modal.close(modal)
          Notify.success({ content: t('SET_DEFAULT_REPO_SUCCESSFUL') })
          success && success()
        },
        store,
        detail,
        modal: SetDefaultSecretClass,
        ...props,
      })
    },
  },
}

async function getDefault(store, { cluster, namespace }) {
  const prevList = await store.fetchList({
    cluster,
    namespace,
    annotation: 'secret.kubesphere.io/is-default-class=true',
  })
  return prevList?.find(item => item.isDefault) || {}
}

async function clearDefault(store, data, { cluster, namespace }) {
  const prevData = await getDefault(store, { cluster, namespace })
  if (
    get(
      data,
      'metadata.annotations["secret.kubesphere.io/is-default-class"]'
    ) === 'true' &&
    prevData.name &&
    prevData.name !== data.metadata.name
  ) {
    await store.patch(pick(prevData, ['cluster', 'namespace', 'name']), {
      metadata: {
        annotations: {
          'secret.kubesphere.io/is-default-class': 'false',
        },
      },
    })
  }
}
