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

import { get, set } from 'lodash'
import { Notify } from '@kube-design/components'
import { Modal } from 'components/Base'

import CreateModal from 'components/Modals/Create'
import EditRouteAnnotationsModal from 'projects/components/Modals/RouteAnnotationsEdit'
import EditRouteRulesModal from 'projects/components/Modals/RouteRulesEdit'
import FedprojectEditRouteRulesModal from 'fedprojects/components/RouteRulesEdit'
import { MODULE_KIND_MAP } from 'utils/constants'
import FORM_TEMPLATES from 'utils/form.templates'
import formPersist from 'utils/form.persist'
import FORM_STEPS from 'configs/steps/ingresses'

export default {
  'router.create': {
    on({ store, cluster, namespace, module, success, isFederated, ...props }) {
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
        onOk: newObject => {
          const data = get(newObject, kind)
          if (!newObject) {
            return
          }

          const params = { cluster, namespace }
          params.namespace = params.namespace || get(data, 'metadata.namespace')

          store.create(data, params).then(() => {
            Modal.close(modal)
            Notify.success({ content: t('CREATE_SUCCESSFUL') })
            success && success()
            formPersist.delete(`${module}_create_form`)
          })
        },
        module,
        cluster,
        namespace,
        name: 'Route',
        formTemplate,
        isFederated,
        steps: FORM_STEPS,
        modal: CreateModal,
        store,
        ...props,
      })
    },
  },
  'router.rules.edit': {
    on({ store, namespace, detail, success, ...props }) {
      const modal = Modal.open({
        onOk: newObject => {
          store.update(detail, newObject).then(() => {
            Modal.close(modal)
            Notify.success({ content: t('UPDATE_SUCCESSFUL') })
            success && success()
          })
        },
        modal: EditRouteRulesModal,
        detail,
        cluster: detail.cluster,
        store,
        namespace,
        ...props,
      })
    },
  },
  'fedproject.router.rules.edit': {
    on({ store, namespace, detail, success, ...props }) {
      const modal = Modal.open({
        onOk: newObject => {
          const template = get(newObject, 'spec.template', {})
          const clusterSet = new Set()
          Object.values(template.spec).forEach(rules => {
            rules.forEach(item =>
              item.clusters.forEach(name => clusterSet.add(name))
            )
          })
          const placementClusters = Array.from(clusterSet).map(cluster => ({
            name: cluster,
          }))
          set(newObject, 'spec.placement.clusters', placementClusters)
          store.update(detail, newObject).then(() => {
            Modal.close(modal)
            Notify.success({ content: t('UPDATE_SUCCESSFUL') })
            success && success()
          })
        },
        modal: FedprojectEditRouteRulesModal,
        detail,
        cluster: detail.cluster,
        namespace,
        store,
        ...props,
      })
    },
  },
  'router.annotations.edit': {
    on({ store, detail, success, ...props }) {
      const modal = Modal.open({
        onOk: newObject => {
          store.update(detail, newObject).then(() => {
            Modal.close(modal)
            Notify.success({ content: t('UPDATE_SUCCESSFUL') })
            success && success()
          })
        },
        modal: EditRouteAnnotationsModal,
        detail,
        store,
        ...props,
      })
    },
  },
}
