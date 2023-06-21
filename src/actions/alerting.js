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

import { cloneDeep, get, set } from 'lodash'
import { toJS } from 'mobx'
import { Notify } from '@kube-design/components'
import { Modal } from 'components/Base'

import CreateModal from 'components/Modals/Create'
import { MODULE_KIND_MAP } from 'utils/constants'
import FORM_TEMPLATES from 'utils/form.templates'
import formPersist from 'utils/form.persist'
import DeleteModal from 'components/Modals/Delete'
import EditYamlModal from 'components/Modals/EditYaml'
import EditBasicInfoModal from 'components/Forms/AlertingPolicy/EditBasicInfo'
import AlertingRules from 'components/Forms/AlertingPolicy/AlertingRules'

import FORM_STEPS from 'configs/steps/alerting.policy'

const getKind = ({ namespace, type }) => {
  if (namespace) {
    return 'RuleGroup'
  }

  if (type === 'builtin') {
    return 'GlobalRuleGroup'
  }

  return 'ClusterRuleGroup'
}

export default {
  'alerting.policy.create': {
    on({ store, cluster, namespace, module, success, detail, ...props }) {
      const kind = MODULE_KIND_MAP[module]
      const formTemplate = detail
        ? cloneDeep(detail)
        : FORM_TEMPLATES[module]({ namespace })

      const modal = Modal.open({
        onOk: async data => {
          const rules = get(data, 'spec.rules', [])

          if (rules.length < 1) {
            return Notify.warning({ content: t('RULES_LIST_EMPTY') })
          }

          if (detail) {
            await store.update(detail, data)
            Notify.success({ content: t('UPDATE_SUCCESSFUL') })
          } else {
            await store.create(data, {
              name: data.metadata.name,
              cluster,
              namespace,
              ...props,
            })
            Notify.success({ content: t('CREATE_SUCCESSFUL') })
          }

          Modal.close(modal)
          success && success()
          formPersist.delete(`${module}_create_form`)
        },
        module,
        cluster,
        namespace,
        name: kind,
        formTemplate,
        modal: CreateModal,
        steps: FORM_STEPS,
        noCodeEdit: true,
        isEdit: !!detail,
        okBtnText: detail ? t('OK') : t('CREATE'),
        store,
        ...props,
      })
    },
  },
  'alerting.baseinfo.edit': {
    on({ type, store, detail, success, ...props }) {
      const modal = Modal.open({
        onOk: data => {
          const _data = cloneDeep(data)
          const interval = get(_data, 'spec.interval')

          // 's' | 'm' | 'h'
          if (interval.length < 2) {
            set(_data, 'spec.interval', '')
          }
          store.patch({ ...detail, type }, _data).then(() => {
            Modal.close(modal)
            Notify.success({ content: t('UPDATE_SUCCESSFUL') })
            success && success()
          })
        },
        detail,
        modal: EditBasicInfoModal,
        store,
        ...props,
      })
    },
  },
  'alerting.yaml.edit': {
    on({ type, store, detail, success, cluster, namespace, ...props }) {
      let initialConfig = ''
      const Kind = getKind({ namespace, type })
      if (type === 'builtin') {
        initialConfig = get(
          detail._originData,
          'metadata.annotations["alerting.kubesphere.io/initial-configuration"]',
          ''
        )
      }
      const modal = Modal.open({
        onOk: async data => {
          if (type === 'builtin') {
            set(data, 'apiVersion', store.yamlApiVersion)
            set(data, 'kind', Kind)
            set(
              data,
              'metadata.annotations["alerting.kubesphere.io/initial-configuration"]',
              initialConfig
            )
          }
          await store.update({ ...detail, type }, data)
          Notify.success({ content: t('UPDATE_SUCCESSFUL') })
          Modal.close(modal)
          success && success()
        },
        detail: { ...detail, type },
        store,
        type,
        modal: EditYamlModal,
        ...props,
      })
    },
  },
  'alerting.rule.edit': {
    on({ type, store, detail, success, cluster, namespace, title, ...props }) {
      const Kind = getKind({ namespace, type })
      const modal = Modal.open({
        onOk: async data => {
          if (type === 'builtin' || !data.Kind) {
            set(data, 'apiVersion', store.yamlApiVersion)
            set(data, 'kind', Kind)
          }
          await store.update({ ...detail, type }, data)
          Notify.success({ content: t('UPDATE_SUCCESSFUL') })
          Modal.close(modal)
          success && success()
        },
        store,
        resource: detail.name,
        detail,
        title: t('EDIT_ALERT_RULES'),
        icon: 'pen',
        modal: CreateModal,
        steps: [
          {
            title: 'ALERTING_RULE',
            component: AlertingRules,
            required: true,
          },
        ],
        noCodeEdit: true,
        okBtnText: t('OK'),
        formTemplate: detail._originData,
        namespace,
        cluster,
        type,
        ...props,
      })
    },
  },
  'enable.alerting.rule': {
    on({
      type,
      store,
      detail,
      success,
      cluster = '',
      namespace = '',
      batchMode,
      enabled = false,
    }) {
      const selectedRowKeys = get(toJS(store.list), 'selectedRowKeys', [])
      if (batchMode) {
        store
          .batchPatch(
            selectedRowKeys,
            { cluster, namespace, type },
            {
              metadata: {
                labels: {
                  'alerting.kubesphere.io/enable': JSON.stringify(!enabled),
                },
              },
            }
          )
          .then(() => {
            Notify.success({
              content: t('ENABLE_SUCCESSFUL'),
            })
            success && success()
          })
      } else {
        store
          .patch(
            { cluster, namespace, name: detail.name, type },
            {
              metadata: {
                labels: {
                  'alerting.kubesphere.io/enable': JSON.stringify(!enabled),
                },
              },
            }
          )
          .then(() => {
            Notify.success({
              content: t('ENABLE_SUCCESSFUL'),
            })
            success && success()
          })
      }
    },
  },
  'alerting.rule.update': {
    on({
      type,
      store,
      detail,
      success,
      cluster = '',
      namespace = '',
      title,
      batchMode,
      resourceName,
      enabled = false,
      ...props
    }) {
      const selectedRowKeys = get(toJS(store.list), 'selectedRowKeys', [])
      const resource = batchMode ? selectedRowKeys.join(', ') : detail.name
      const modal = Modal.open({
        onOk: () => {
          if (batchMode) {
            store
              .batchPatch(
                selectedRowKeys,
                { cluster, namespace, type },
                {
                  metadata: {
                    labels: {
                      'alerting.kubesphere.io/enable': JSON.stringify(!enabled),
                    },
                  },
                }
              )
              .then(() => {
                Modal.close(modal)
                Notify.success({ content: t('DISABLE_SUCCESSFUL') })
                success && success()
              })
          } else {
            store
              .patch(
                { cluster, namespace, name: detail.name, type },
                {
                  metadata: {
                    labels: {
                      'alerting.kubesphere.io/enable': JSON.stringify(!enabled),
                    },
                  },
                }
              )
              .then(() => {
                Modal.close(modal)
                Notify.success({ content: t('UPDATE_SUCCESSFUL') })
                success && success()
              })
          }
        },
        store,
        icon: 'information',
        modal: DeleteModal,
        tip: enabled ? t('DISABLE_ALARM_TIP') : '',
        type: resourceName,
        title:
          resource.split(', ').length === 1
            ? t('DISABLE_ALERTING_POLICY')
            : t('DISABLE_MULTIPLE_ALERTING_POLICIES'),
        resource,
        ...props,
      })
    },
  },
  'alerting.rule.delete': {
    on({ type, store, detail, success, name, ...props }) {
      const modal = Modal.open({
        onOk: () => {
          store.delete({ ...detail, type }).then(() => {
            Modal.close(modal)
            Notify.success({ content: t('DELETED_SUCCESSFULLY') })
            success && success()
          })
        },
        store,
        type: name,
        modal: DeleteModal,
        resource: detail.name,
        ...props,
      })
    },
  },
  'alerting.rule.monitor': {
    on() {},
  },
  'alerting.rule.reset': {
    on() {},
  },
}
