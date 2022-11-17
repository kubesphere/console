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
import { Icon } from '@kube-design/components'

import { Modal } from 'components/Base'
import LogModal from 'components/Modals/LogSearch'
import EventModal from 'components/Modals/EventSearch'
import AuditingModal from 'components/Modals/AuditingSearch'
import KubeCtlModal from 'components/Modals/KubeCtl'
import KubeConfigModal from 'components/Modals/KubeConfig'
import BillModal from 'components/Modals/Bill'

export default {
  'toolbox.logquery': {
    on({ store, ...props }) {
      const modal = Modal.open({
        onOk: () => {
          Modal.close(modal)
        },
        modal: LogModal,
        title: t('CONTAINER_LOG_SEARCH'),
        ...props,
      })
    },
  },
  'toolbox.eventsearch': {
    on({ store, ...props }) {
      const modal = Modal.open({
        onOk: () => {
          Modal.close(modal)
        },
        modal: EventModal,
        title: (
          <div>
            <Icon size={20} name="thunder" style={{ marginRight: 7 }} />{' '}
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                lineHeight: '20px',
                height: '20px',
              }}
            >
              {t('RESOURCE_EVENT_SEARCH')}
            </span>
          </div>
        ),
        ...props,
      })
    },
  },
  'toolbox.auditingsearch': {
    on({ store, ...props }) {
      const modal = Modal.open({
        onOk: () => {
          Modal.close(modal)
        },
        modal: AuditingModal,
        title: (
          <div>
            <Icon size={20} name="login-servers" style={{ marginRight: 7 }} />{' '}
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                lineHeight: '20px',
                height: '20px',
              }}
            >
              {t('AUDIT_LOG_SEARCH')}
            </span>
          </div>
        ),
        ...props,
      })
    },
  },
  'toolbox.kubectl': {
    on({ store, ...props }) {
      const modal = Modal.open({
        onOk: () => {
          Modal.close(modal)
        },
        modal: KubeCtlModal,
        title: 'kubectl',
        ...props,
      })
    },
  },
  'toolbox.kubeconfig': {
    on({ store, ...props }) {
      const modal = Modal.open({
        onOk: () => {
          Modal.close(modal)
        },
        modal: KubeConfigModal,
        title: 'kubeconfig',
        ...props,
      })
    },
  },
  'toolbox.bill': {
    on({ store, ...props }) {
      const modal = Modal.open({
        onOk: () => {
          Modal.close(modal)
        },
        modal: BillModal,
        store,
        ...props,
      })
    },
  },
}
