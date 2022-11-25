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

import { get, isEmpty, omit } from 'lodash'
import { toJS } from 'mobx'
import { withProps, multiCluster_overrides_Dot } from 'utils'
import { Notify } from '@kube-design/components'
import { Modal } from 'components/Base'

import CreateModal from 'components/Modals/Create'
import RedeployModal from 'projects/components/Modals/Redeploy'
import RollBackModal from 'projects/components/Modals/RollBack'
import HPAModal from 'projects/components/Modals/HPA'
import EditConfigTemplateModal from 'projects/components/Modals/ConfigTemplate'
import EditServiceModal from 'projects/components/Modals/ServiceSetting/StatefulSet'
import ClusterDiffSettings from 'components/Forms/Workload/ClusterDiffSettings'
import DeleteModal from 'projects/components/Modals/WorkloadDelete'
import { MODULE_KIND_MAP, OMIT_TOTAL_REPLICAS } from 'utils/constants'
import FORM_TEMPLATES from 'utils/form.templates'
import formPersist from 'utils/form.persist'
import DEPLOYMENTS_FORM_STEPS from 'configs/steps/deployments'
import STATEFULSETS_FORM_STEPS from 'configs/steps/statefulsets'
import DAEMONSETS_FORM_STEPS from 'configs/steps/daemonsets'
import JOBS_FORM_STEPS from 'configs/steps/jobs'
import CRONJOBS_FORM_STEPS from 'configs/steps/cronjobs'

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
    on({
      store,
      cluster,
      namespace,
      module,
      success,
      isFederated,
      renderScheduleTab = false,
      supportGpuSelect = false,
      ...props
    }) {
      const kind = MODULE_KIND_MAP[module]
      const formTemplate = {
        [kind]: FORM_TEMPLATES[module]({
          namespace,
        }),
      }

      let scheduleTemplate = {}

      if (module === 'statefulsets') {
        formTemplate.Service = FORM_TEMPLATES.services({
          namespace,
          selector: formTemplate[kind].metadata.labels,
        })
      }

      if (isFederated) {
        Object.keys(formTemplate).forEach(key => {
          formTemplate[key] = FORM_TEMPLATES.federated({
            data: formTemplate[key],
            clusters: props.projectDetail.clusters.map(item => item.name),
            kind: key,
          })

          scheduleTemplate = FORM_TEMPLATES.deploymentsSchedule({
            data: formTemplate[key],
            includeClusters: props.projectDetail.clusters.map(
              item => item.name
            ),
          })
        })
        store.setScheduleTemplate(scheduleTemplate)
      }

      const steps = [...FORM_STEPS[module]]

      if (isFederated) {
        steps.push({
          title: 'CLUSTER_DIFF',
          icon: 'blue-green-deployment',
          component: withProps(ClusterDiffSettings, {
            withService: module === 'statefulsets',
          }),
        })
      }

      if (renderScheduleTab) {
        store.ifRenderScheduleTab(renderScheduleTab)
      }

      const modal = Modal.open({
        onOk: newObject => {
          if (isFederated) {
            if (module === 'deployments') {
              multiCluster_overrides_Dot(
                get(newObject, 'Deployment.spec.overrides', [])
              )
            } else if (module === 'statefulsets') {
              multiCluster_overrides_Dot(
                get(newObject, 'StatefulSet.spec.overrides', [])
              )
            }
          }
          newObject = omit(newObject, OMIT_TOTAL_REPLICAS(kind))
          let data = newObject
          if (!data) {
            return
          }

          const customMode = get(data, 'spec.template.spec.customMode', {})
          if (!isEmpty(customMode)) {
            delete data.spec.template.spec.customMode
          }

          if (kind) {
            if (Object.keys(newObject).length === 1 && newObject[kind]) {
              data = newObject[kind]
            }
          }

          store.create(data, { cluster, namespace }).then(async () => {
            const { isScheduleDeployment } = store
            if (isScheduleDeployment && renderScheduleTab) {
              const scheduleData = toJS(store.scheduleTemplate)
              await store.scheduleCreate(scheduleData, { cluster, namespace })
              await store.switchSchedule(false)
            }
            Modal.close(modal)
            Notify.success({ content: t('CREATE_SUCCESSFUL') })
            success && success()
            formPersist.delete(`${module}_create_form`)
          })
        },
        onCancel: () => {
          const { isScheduleDeployment } = store
          if (isScheduleDeployment && renderScheduleTab) {
            store.switchSchedule(false)
          }
        },
        steps,
        module,
        cluster,
        namespace,
        name: kind,
        isFederated,
        formTemplate,
        modal: CreateModal,
        store,
        supportGpuSelect,
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
              Notify.success({ content: t('RECREATE_SUCCESS_DESC') })
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
    on({ store, detail, success, ...props }) {
      const modal = Modal.open({
        onOk: data => {
          store.rollBack({ ...detail, module: store.module }, data).then(() => {
            Modal.close(modal)
            success && success()
          })
        },
        detail,
        modal: RollBackModal,
        store,
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
            hpaStore.create(newData, detail).then(async () => {
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
    on({ store, detail, success, supportGpuSelect = false, ...props }) {
      const modal = Modal.open({
        onOk: data => {
          const customMode = get(data, 'spec.template.spec.customMode', {})

          if (!isEmpty(customMode)) {
            delete data.spec.template.spec.customMode
          }

          store.update(detail, data).then(() => {
            Modal.close(modal)
            success && success()
          })
        },
        store,
        module: store.module,
        detail: toJS(detail._originData),
        modal: EditConfigTemplateModal,
        supportGpuSelect,
        hideVolumeSetting: store.module === 'statefulsets',
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
        cluster: detail.cluster,
      }

      const modal = Modal.open({
        onOk: data => {
          serviceStore.update(serviceDetail, data).then(() => {
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
  'workload.delete': {
    on({ store, detail, success, ...props }) {
      const modal = Modal.open({
        onOk: () => {
          Modal.close(modal)
          Notify.success({ content: t('DELETED_SUCCESSFULLY') })
          success && success()
        },
        store,
        modal: DeleteModal,
        resource: detail,
        ...props,
      })
    },
  },
  'workload.batch.delete': {
    on({ store, success, rowKey = 'name', ...props }) {
      const { data, selectedRowKeys } = store.list

      const resource = data.filter(item =>
        selectedRowKeys.includes(item[rowKey])
      )

      const modal = Modal.open({
        onOk: () => {
          Modal.close(modal)
          Notify.success({ content: t('DELETED_SUCCESSFULLY') })
          success && success()
        },
        modal: DeleteModal,
        resource,
        store,
        ...props,
      })
    },
  },
}
