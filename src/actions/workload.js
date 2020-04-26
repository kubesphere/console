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

import { get } from 'lodash'
import { withProps } from 'utils'
import { Modal, Notify } from 'components/Base'

import CreateModal from 'components/Modals/Create'
import RedeployModal from 'projects/components/Modals/Redeploy'
import RollBackModal from 'projects/components/Modals/RollBack'
import HPAModal from 'projects/components/Modals/HPA'
import EditConfigTemplateModal from 'projects/components/Modals/ConfigTemplate'
import EditServiceModal from 'projects/components/Modals/ServiceSetting/StatefulSet'
import ClusterDiffSettings from 'components/Forms/Workload/ClusterDiffSettings'
import { MODULE_KIND_MAP } from 'utils/constants'
import FORM_TEMPLATES from 'utils/form.templates'
import formPersist from 'utils/form.persist'
import DEPLOYMENTS_FORM_STEPS from 'configs/steps/deployments'
import STATEFULSETS_FORM_STEPS from 'configs/steps/statefulsets'
import DAEMONSETS_FORM_STEPS from 'configs/steps/daemonsets'
import JOBS_FORM_STEPS from 'configs/steps/jobs'
import CRONJOBS_FORM_STEPS from 'configs/steps/cronjobs'

import RevisionStore from 'stores/workload/revision'
import HPAStore from 'stores/workload/hpa'
import ServiceStore from 'stores/service'

const FORM_STEPS = {
  deployments: DEPLOYMENTS_FORM_STEPS,
  statefulsets: STATEFULSETS_FORM_STEPS,
  daemonsets: DAEMONSETS_FORM_STEPS,
  jobs: JOBS_FORM_STEPS,
  cronjobs: CRONJOBS_FORM_STEPS,
}

export default {
  'workload.create': {
    on({ store, cluster, namespace, module, success, ...props }) {
      const kind = MODULE_KIND_MAP[module]
      const formTemplate = {
        [kind]: FORM_TEMPLATES[module]({
          namespace,
        }),
      }

      if (module === 'statefulsets') {
        formTemplate.Service = FORM_TEMPLATES.services({
          namespace,
          selector: formTemplate[kind].metadata.labels,
        })
      }

      const steps = [...FORM_STEPS[module]]

      if (props.projectDetail && props.projectDetail.isFedManaged) {
        steps.push({
          title: 'Diff Settings',
          icon: 'blue-green-deployment',
          component: withProps(ClusterDiffSettings, {
            withService: module === 'statefulsets',
          }),
        })
      }

      const modal = Modal.open({
        onOk: newObject => {
          let data = newObject

          if (!data) {
            return
          }

          if (kind) {
            if (Object.keys(newObject).length === 1 && newObject[kind]) {
              data = newObject[kind]
            }
          }

          store.create(data, { cluster, namespace }).then(() => {
            Modal.close(modal)
            Notify.success({ content: `${t('Created Successfully')}!` })
            success && success()
            formPersist.delete(`${module}_create_form`)
          })
        },
        steps,
        module,
        cluster,
        namespace,
        name: kind,
        formTemplate,
        modal: CreateModal,
        store,
        ...props,
      })
    },
  },
  'workload.redeploy': {
    on({ store, detail, module, success, ...props }) {
      const kind = MODULE_KIND_MAP[module]
      const modal = Modal.open({
        onOk: () => {
          store
            .patch(detail, {
              spec: {
                template: {
                  metadata: {
                    annotations: {
                      'kubesphere.io/restartedAt': new Date(),
                    },
                  },
                },
              },
            })
            .then(() => {
              Modal.close(modal)
              Notify.success({ content: `${t('Redeploy Successfully')}!` })
            })
        },
        detail,
        type: kind,
        modal: RedeployModal,
        store,
        ...props,
      })
    },
  },
  'workload.revision.rollback': {
    on({ store, detail, module, success, ...props }) {
      const revisionStore = new RevisionStore(module)
      const modal = Modal.open({
        onOk: data => {
          revisionStore.rollBack(data).then(() => {
            Modal.close(modal)
            success && success()
          })
        },
        detail,
        module,
        store: revisionStore,
        modal: RollBackModal,
        ...props,
      })
    },
  },
  'workload.hpa.edit': {
    on({ store, detail, success, ...props }) {
      const hpaStore = new HPAStore()
      const modal = Modal.open({
        onOk: (newData, isEdit) => {
          if (isEdit) {
            hpaStore.patch(detail, newData).then(() => {
              Modal.close(modal)
              success && success()
            })
          } else {
            hpaStore.create(newData).then(async () => {
              Modal.close(modal)
              await store.patch(detail, {
                metadata: {
                  annotations: {
                    'kubesphere.io/relatedHPA': get(
                      newData,
                      'metadata.name',
                      detail.name
                    ),
                  },
                },
              })
              success && success()
            })
          }
        },
        detail,
        store: hpaStore,
        modal: HPAModal,
        ...props,
      })
    },
  },
  'workload.template.edit': {
    on({ store, detail, module, success, ...props }) {
      const modal = Modal.open({
        onOk: data => {
          store.update(detail, data).then(() => {
            Modal.close(modal)
            success && success()
          })
        },
        module,
        store,
        detail: detail._originData,
        modal: EditConfigTemplateModal,
        ...props,
      })
    },
  },
  'workload.service.edit': {
    on({ store, detail, success, ...props }) {
      const serviceStore = new ServiceStore()
      const serviceDetail = {
        type: 'Headless(Selector)',
        name: get(detail, '_originData.spec.serviceName', ''),
        namespace: detail.namespace,
      }

      const modal = Modal.open({
        onOk: data => {
          store.update(serviceDetail, data).then(() => {
            Modal.close(modal)
            success && success()
          })
        },
        detail: serviceDetail,
        store: serviceStore,
        modal: EditServiceModal,
        ...props,
      })
    },
  },
}
