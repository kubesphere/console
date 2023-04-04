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
import ParamsFormModal from 'components/Forms/Pipelines/ParamsFormModal'
import CreateModal from 'components/Modals/Create'
import DeleteModal from 'components/Modals/Delete'
import AdvanceEditorModal from 'components/Modals/Pipelines/AdvanceEdit'
import BaseInfoModal from 'components/Modals/Pipelines/Base'
import CopyModal from 'components/Modals/Pipelines/Copy'
import PipelineModal from 'components/Modals/Pipelines/PipelineEdit'

import ScanRepositoryLogs from 'components/Modals/Pipelines/ScanRepositoryLogs'

import {
  PIPELINE_CREATE_STEPS,
  PIPELINE_CREATE_STEPS_OLD,
  PIPELINE_PROJECT_CREATE_STEPS,
} from 'configs/steps/pipelines'
import JenkinsEdit from 'devops/components/Modals/JenkinsEdit'
import { cloneDeep, get, isEmpty } from 'lodash'
import { toJS } from 'mobx'
import { updatePipelineParams, updatePipelineParamsInSpec } from 'utils/devops'

function handleParams(param) {
  const type = param.type.toLowerCase().split('parameterdefinition')[0]
  const value = get(param, 'defaultParameterValue.value')
  const name = param.name
  const choicesOption = get(param, 'choices', [])

  let _params = {}
  switch (type) {
    case 'choice':
      _params = { name, value: value || choicesOption[0] }
      break
    default:
      _params = { name, value }
      break
  }
  return _params
}

export default {
  'pipeline.create': {
    on({
      store,
      cluster,
      devops,
      workspace,
      module,
      success,
      formTemplate,
      showCodeRepoCreate,
      ...props
    }) {
      const modal = Modal.open({
        onOk: async data => {
          updatePipelineParams(data)
          updatePipelineParamsInSpec(data, devops)

          await store.createPipeline({
            data,
            devops,
            cluster,
          })

          Modal.close(modal)
          Notify.success({ content: t('CREATE_SUCCESSFUL') })
          success && success()
        },
        store,
        module,
        cluster,
        devops,
        formTemplate,
        modal: CreateModal,
        steps: PIPELINE_PROJECT_CREATE_STEPS,
        noCodeEdit: true,
        showCodeRepoCreate,
        ...props,
      })
    },
  },
  'pipeline.batch.delete': {
    on({ store, success, rowKey, devops, cluster, ...props }) {
      const { data, selectedRowKeys } = toJS(store.list)
      const selectNames = data
        .filter(item => selectedRowKeys.includes(item[rowKey]))
        .map(item => item.name)

      const modal = Modal.open({
        onOk: async () => {
          const reqs = []

          data.forEach(item => {
            if (selectNames.includes(item.name)) {
              reqs.push(store.delete({ name: item.name, devops, cluster }))
            }
          })

          await Promise.all(reqs)

          Modal.close(modal)
          Notify.success({ content: t('DELETED_SUCCESSFULLY') })
          store.setSelectRowKeys([])
          success && success()
        },
        resource: selectNames.join(', '),
        modal: DeleteModal,
        store,
        ...props,
      })
    },
  },
  'pipeline.batch.run': {
    async on({ store, success, rowKey, devops, cluster }) {
      const { data, selectedRowKeys } = toJS(store.list)
      Notify.success({
        content:
          data.length === 1
            ? t('PIPELINE_RUN_START_SI')
            : t('PIPELINE_RUN_START_PL'),
      })

      const selectNames = data
        .filter(item => selectedRowKeys.includes(item[rowKey]))
        .map(item => item.name)

      const reqlist = []

      data.forEach(async item => {
        if (selectNames.includes(item.name)) {
          let parameters = item.parameters
          const branchs = item.branchNames
          const branchName = get(branchs, '[0]', '')

          if (branchs && !isEmpty(branchs)) {
            const branchData = await store.getBranchDetail({
              branch: branchName,
              name: item.name,
              devops,
              cluster,
            })

            parameters = branchData.parameters || undefined
          }

          if (!isEmpty(parameters)) {
            parameters = parameters.map(param => {
              return handleParams(param)
            })
          }

          reqlist.push(
            store.runBranch({
              name: item.name,
              devops,
              cluster,
              branch: branchName,
              parameters,
            })
          )
        }
      })

      await Promise.all(reqlist)

      Notify.success({
        content:
          data.length === 1
            ? t('BATCH_RUN_SUCCESS_SI')
            : t('BATCH_RUN_SUCCESS_PL'),
      })
      store.setSelectRowKeys([])
      success && success()
    },
  },
  'pipeline.edit': {
    on({ store, cluster, devops, success, formTemplate, ...props }) {
      const modal = Modal.open({
        onOk: async data => {
          updatePipelineParams(data, true)
          updatePipelineParamsInSpec(data, devops)

          await store.updatePipeline({ data, devops, cluster })

          Modal.close(modal)
          Notify.success({ content: t('UPDATE_SUCCESSFUL') })
          success && success()
        },
        store,
        cluster,
        devops,
        formTemplate: cloneDeep(formTemplate),
        modal: BaseInfoModal,
        ...props,
      })
    },
  },
  'pipeline.advance.edit': {
    on({ store, cluster, devops, success, formTemplate, ...props }) {
      const modal = Modal.open({
        onOk: async data => {
          updatePipelineParams(data, true)
          updatePipelineParamsInSpec(data, devops)

          await store.updatePipeline({
            data,
            devops,
            cluster,
          })

          Modal.close(modal)
          Notify.success({ content: t('UPDATE_SUCCESSFUL') })
          success && success()
        },
        store,
        cluster,
        devops,
        formTemplate: cloneDeep(formTemplate),
        modal: AdvanceEditorModal,
        ...props,
      })
    },
  },
  'pipeline.params': {
    on({ store, success, devops, cluster, ...props }) {
      const modal = Modal.open({
        onOk: async (parameters, branch) => {
          await store.runBranch({
            devops,
            name: props.params.name,
            branch,
            parameters,
            cluster,
          })

          Modal.close(modal)
          success && success(branch)
        },
        store,
        devops,
        cluster,
        modal: ParamsFormModal,
        ...props,
      })
    },
  },
  'pipeline.scanRepositoryLogs': {
    on({ store, success, ...props }) {
      const modal = Modal.open({
        onOk: async () => {
          Modal.close(modal)
        },
        modal: ScanRepositoryLogs,
        store,
        ...props,
      })
    },
  },
  'pipeline.jenkins': {
    on({ store, params, defaultValue, success, ...props }) {
      const modal = Modal.open({
        onOk: jenkinsFile => {
          store.updateJenkinsFile(jenkinsFile, params)
          Modal.close(modal)
          Notify.success({ content: t('UPDATE_SUCCESSFUL') })
          success && success()
        },
        modal: JenkinsEdit,
        defaultValue,
        params,
        ...props,
      })
    },
  },
  'pipeline.pipelineCreate': {
    on({ store, rootStore, success, jsonData, params, ...props }) {
      const modal = Modal.open({
        onOk: async jenkinsFile => {
          await store.updateJenkinsFile(jenkinsFile, params)
          Modal.close(modal)
          Notify.success({ content: t('UPDATE_SUCCESSFUL') })
          success && success()
        },
        modal: PipelineModal,
        jsonData,
        params,
        store,
        ...props,
      })
    },
  },
  'pipeline.pipelineTemplateOld': {
    on({ store, rootStore, success, jsonData, params, ...props }) {
      const modal = Modal.open({
        onOk: async data => {
          let jenkinsFile = data.jenkinsFile

          if (data.template !== 'custom') {
            const { paramsForm = {} } = data
            const postData = Object.keys(paramsForm).reduce((prev, curr) => {
              prev.push({ name: curr, value: paramsForm[curr] })
              return prev
            }, [])
            const jenkins = await store.getTempleJenkins(data.template, {
              parameters: postData,
            })
            const { devops, name, cluster } = params
            await store.checkScriptCompile({
              devops,
              pipeline: name,
              value: jenkins,
              cluster,
            })

            jenkinsFile = await store.convertJenkinsFileToJson(jenkins, cluster)
          }

          Modal.close(modal)
          success && success(jenkinsFile)
        },
        modal: CreateModal,
        steps: PIPELINE_CREATE_STEPS_OLD,
        jsonData,
        params,
        store,
        ...props,
      })
    },
  },
  'pipeline.pipelineTemplate': {
    on({
      store,
      rootStore,
      success,
      jsonData,
      params,
      pipelineDetailStore,
      ...props
    }) {
      store.isSubmitting = false
      const modal = Modal.open({
        onOk: async data => {
          let re
          if (data.template !== 'custom') {
            const { paramsForm = {} } = data
            const postData = Object.keys(paramsForm).reduce((prev, curr) => {
              prev.push({ name: curr, value: paramsForm[curr] })
              return prev
            }, [])
            const jenkins = await store.getTempleJenkins(data.template, {
              parameters: postData,
            })
            const { devops, name, cluster } = params
            await store.checkScriptCompile({
              devops,
              pipeline: name,
              value: jenkins,
              cluster,
            })

            const {
              mode,
              jsonData: json,
            } = await store.convertJenkinsFileToJson(
              jenkins,
              cluster,
              devops,
              name,
              true
            )
            re = {
              jenkinsFile: jenkins,
              jsonData: json,
              mode,
              template: data.template,
            }
          } else {
            re = {
              jenkinsFile: '',
              json: {},
              mode: 'raw',
              template: 'custom',
            }
          }

          Modal.close(modal)
          success && success(re)
        },
        modal: CreateModal,
        steps: PIPELINE_CREATE_STEPS,
        jsonData,
        params,
        store,
        ...props,
      })
    },
  },
  'pipeline.copy': {
    on({ store, cluster, devops, success, formTemplate, ...props }) {
      const modal = Modal.open({
        onOk: async data => {
          updatePipelineParams(data, true)
          updatePipelineParamsInSpec(data, devops)

          Object.keys(data).forEach(key => {
            if (key === 'metadata' && data[key]) {
              Object.keys(data[key]).forEach(_key => {
                if (_key !== 'name' && _key !== 'namespace') {
                  delete data[key][_key]
                }
              })
            }
          })

          await store.createPipeline({
            data,
            devops,
            cluster,
          })

          Modal.close(modal)
          Notify.success({ content: t('CREATE_SUCCESSFUL') })
          success && success()
        },
        store,
        cluster,
        devops,
        success,
        formTemplate,
        modal: CopyModal,
        ...props,
      })
    },
  },
}
