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
import { cloneDeep } from 'lodash'
import { Notify } from '@kube-design/components'
import { Modal } from 'components/Base'
import EnableForm from 'components/Forms/LoggingCollection/Status'
import ESForm from 'components/Forms/Elasticsearch/Settings'
import KafkaForm from 'components/Forms/KafkaForm/Settings'
import FluentdForm from 'components/Forms/Fluentd/Settings'

export default {
  'log.collection.active.switch': {
    on({ store, success, ...props }) {
      const modal = Modal.open({
        onOk: async ({ enabled }) => {
          await store.patch(store.detail, {
            metadata: {
              labels: {
                'logging.kubesphere.io/enabled': enabled ? 'true' : 'false',
              },
            },
          })
          Modal.close(modal)
          success && success()
          Notify.success({ content: `${t('Updated Successfully')}` })
        },
        modal: Modal.Form,
        store,
        width: 497,
        icon: 'timed-task',
        title: t('Change Status'),
        children: <EnableForm />,
        ...props,
      })
    },
  },
  'log.collection.edit': {
    on({ store, success, ...props }) {
      const EditFormMap = {
        es: ESForm,
        forward: FluentdForm,
        kafka: KafkaForm,
      }
      const { type } = store.detail
      const EditForm = EditFormMap[type] || null
      const data = cloneDeep(store.detail.config)

      const modal = Modal.open({
        onOk: async params => {
          await store.patch(store.detail, {
            spec: {
              [type]: params,
            },
          })
          Modal.close(modal)
          success && success()
          Notify.success({ content: `${t('Updated Successfully')}` })
        },
        modal: Modal.Form,
        data,
        width: 691,
        icon: 'timed-task',
        title: t('Log Collections'),
        children: <EditForm />,
        store,
        ...props,
      })
    },
  },
}
