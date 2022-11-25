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
import { get } from 'lodash'
import { Input, Form } from '@kube-design/components'
import { NumberInput } from 'components/Inputs'

import styles from './index.scss'

import Title from '../Title'
import KSSettings from './KSSettings'

export default class ClusterSettings extends React.Component {
  render() {
    const { store, formRef, formTemplate } = this.props
    return (
      <div className={styles.wrapper}>
        <Title
          title={t('ADVANCED_SETTINGS')}
          description={t('CLUSTER_ADVANCED_SETTINGS_DESC')}
        />
        <Form className={styles.form} data={formTemplate} ref={formRef}>
          <Form.Group
            label={t('KUBESPHERE_SETTINGS')}
            desc={t('CLUSTER_KUBESPHERE_SETTINGS_DESC')}
            checkable
            keepDataWhenUnCheck
          >
            <Form.Item>
              <KSSettings
                name="spec.addons[1].sources.chart.values"
                components={get(
                  store.kubekey,
                  'parameters.kubesphere.components',
                  []
                )}
              />
            </Form.Item>
          </Form.Group>
          <Form.Group
            label={t('PRIVATE_REGISTRY_CONFIGURATION')}
            desc={t('CLUSTER_PRIVATE_REGISTRY_DESC')}
            checkable
            keepDataWhenUnCheck
          >
            <Form.Item label={t('PRIVATE_REGISTRY')}>
              <Input name="spec.registry.privateRegistry" />
            </Form.Item>
          </Form.Group>
          <Form.Group
            label={t('CLUSTER_CONTROLPLANE_ENDPOINT')}
            desc={t('CLUSTER_CONTROLPLANE_ENDPOINT_DESC')}
            checkable
            keepDataWhenUnCheck
          >
            <Form.Item label={t('DOMAIN')}>
              <Input name="spec.controlPlaneEndpoint.domain" />
            </Form.Item>
            <Form.Item label={t('ADDRESS')}>
              <Input name="spec.controlPlaneEndpoint.address" />
            </Form.Item>
            <Form.Item label={t('PORT')}>
              <NumberInput
                name="spec.controlPlaneEndpoint.port"
                integer
                min={0}
                max={65535}
              />
            </Form.Item>
          </Form.Group>
          <Form.Group
            label={t('ETCD_BACKUP')}
            desc={t('CLUSTER_ETCD_BACKUP_DESC')}
            checkable
            keepDataWhenUnCheck
          >
            <Form.Item
              label={t('ETCD_BACKUP_DIR')}
              desc={t('CLUSTER_ETCD_BACKUP_DIR_DESC')}
            >
              <Input name="spec.kubernetes.etcdBackupDir" />
            </Form.Item>
            <Form.Item
              label={t('ETCD_BACKUP_PERIOD')}
              desc={t('CLUSTER_ETCD_BACKUP_PERIOD_DESC')}
            >
              <NumberInput
                name="spec.kubernetes.etcdBackupPeriod"
                integer
                min={0}
              />
            </Form.Item>
            <Form.Item
              label={t('KEEP_BACKUP_NUMBER')}
              desc={t('CLUSTER_ETCD_BACKUP_NUMBER_DESC')}
            >
              <NumberInput
                name="spec.kubernetes.keepBackupNumber"
                integer
                min={0}
              />
            </Form.Item>
          </Form.Group>
        </Form>
      </div>
    )
  }
}
