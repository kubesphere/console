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

import CreateModal from 'components/Modals/Create'
import { FLUXCD_FORM } from 'configs/steps/fluxcd'
import { Modal } from 'components/Base'
import { Notify } from '@kube-design/components'
import DeleteModal from 'components/Modals/CDDelete'
import FORM_TEMPLATES from 'utils/form.templates'
import { set, cloneDeep, split, merge } from 'lodash'
import { toJS } from 'mobx'
import EditCDAdvanceSetting from 'components/Modals/CDAdvanceEdit'

const arr2Obj = arr1 => {
  if (arr1 === undefined) return null
  const gen = (idx, arr, end) => {
    if (idx === arr.length) {
      return end
    }
    return { [arr[idx]]: gen(++idx, arr, end) }
  }

  let o = {}
  for (const entry of arr1) {
    const ks = entry.k.split('.')
    o = merge(o, gen(0, ks, entry.v))
  }
  return o
}

const handleFormData = ({ data, module }) => {
  const formTemplate = FORM_TEMPLATES[module]()

  set(formTemplate, 'metadata', data.metadata)
  set(formTemplate, 'spec.kind', 'fluxcd')
  set(
    formTemplate,
    'spec.fluxApp',
    data.appType === 'HelmRelease'
      ? buildHelmRelease(data)
      : buildKustomization(data)
  )
  return formTemplate
}

const buildHelmRelease = data => {
  const convert = str => {
    if (str === 'true') return true
    if (str === 'false') return false
    return str
  }

  const str2Obj = str => {
    if (str === undefined) return null
    const options = split(str, ';')
    const o = {}
    for (const item of options) {
      const option = split(item, '=')
      o[option[0]] = convert(option[1])
    }
    return o
  }
  if (
    data.metadata.labels &&
    data.metadata.labels['gitops.kubesphere.io/save-helm-template']
  ) {
    set(
      data.metadata.labels,
      'gitops.kubesphere.io/save-helm-template',
      String(data.metadata.labels['gitops.kubesphere.io/save-helm-template'])
    )
  }

  return {
    spec: {
      source: {
        sourceRef: {
          name: `fluxcd-${data.repoURL.match('.*?(?=\\()')[0]}`,
          kind: 'GitRepository',
        },
      },
      config: {
        helmRelease: {
          chart: {
            chart: data.config.helmRelease.chart.chart,
            valuesFiles: split(data.config.helmRelease.chart.valuesFiles, ';'),
          },
          deploy: [
            {
              destination: {
                kubeConfig:
                  data.destination.name !== 'in-cluster'
                    ? {
                        secretRef: {
                          name: data.destination.name,
                        },
                      }
                    : null,
                targetNamespace: data.destination.namespace,
              },
              values: arr2Obj(data.config.helmRelease.values),
              valuesFrom: data.config.helmRelease.valuesFrom,
              interval: data.config.helmRelease.interval,
              releaseName: data.config.helmRelease.releaseName,
              storageNamespace: data.config.helmRelease.storageNamespace,
              install: str2Obj(data.config.helmRelease.install),
              upgrade: str2Obj(data.config.helmRelease.upgrade),
              test: str2Obj(data.config.helmRelease.test),
              uninstall: str2Obj(data.config.helmRelease.uninstall),
            },
          ],
        },
      },
    },
  }
}

const buildKustomization = data => {
  return {
    spec: {
      source: {
        sourceRef: {
          name: `fluxcd-${data.repoURL.match('.*?(?=\\()')[0]}`,
          kind: 'GitRepository',
        },
      },
      config: {
        kustomization: [
          {
            destination: {
              kubeConfig:
                data.destination.name !== 'in-cluster'
                  ? {
                      secretRef: {
                        name: data.destination.name,
                      },
                    }
                  : null,
              targetNamespace: data.destination.namespace,
            },
            interval: data.config.kustomization.interval,
            path: data.config.kustomization.path,
          },
        ],
      },
    },
  }
}

export default {
  'fluxcd.create': {
    on({ store, cluster, workspace, module, success, ...props }) {
      const modal = Modal.open({
        onOk: async data => {
          const formTemplate = handleFormData({
            data,
            module,
          })
          await store.create({
            data: formTemplate,
            devops: props.devops,
            cluster,
          })

          Notify.success({ content: t('CREATE_SUCCESSFUL') })
          success && success()
          Modal.close(modal)
        },
        store,
        module,
        cluster,
        formTemplate: {},
        modal: CreateModal,
        steps: FLUXCD_FORM,
        ...props,
      })
    },
  },
  'fluxcd.edit': {
    on({ store, cluster, detail, module, success, ...props }) {
      const modal = Modal.open({
        onOk: async data => {
          const formTemplate = handleFormData({
            data,
            module,
          })
          await store.update(detail, formTemplate)
          Notify.success({ content: t('UPDATE_SUCCESSFUL') })
          success && success()
          Modal.close(modal)
        },
        store,
        module,
        cluster,
        formTemplate: cloneDeep(toJS(detail._originData)),
        modal: EditCDAdvanceSetting,
        ...props,
      })
    },
  },
  'fluxcd.delete': {
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
}
