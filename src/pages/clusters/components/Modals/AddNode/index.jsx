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
import { CheckboxGroup } from '@pitrix/lego-ui'
import { Modal, Text } from 'components/Base'

import styles from './index.scss'

export default class AddNodeModal extends React.Component {
  get types() {
    return [
      {
        label: 'Control',
        value: 'control',
      },
      {
        label: 'Worker',
        value: 'worker',
      },
      {
        label: 'ETCD',
        value: 'etcd',
      },
    ]
  }

  render() {
    const { visible, onCancel } = this.props

    return (
      <Modal
        visible={visible}
        onCancel={onCancel}
        width={600}
        icon="nodes"
        title={t('Add Node')}
        hideFooter
      >
        <div className={styles.wrapper}>
          <div className={styles.step}>
            <Text
              title={`1. ${t('Node type settings')}`}
              description={t('CLUSTER_NODES_TYPE_DESC')}
            />
            <CheckboxGroup
              className="margin-t12"
              defaultValue={['control', 'worker', 'etcd']}
              options={this.types}
            />
          </div>
          <div className={styles.step}>
            <Text
              title={`2. ${t('复制以下命令通过SSH在主机节点上运行')}`}
              description={t(
                '安装好 Docker 后，运行主机安装命令。查看如何安装 Docker'
              )}
            />
            <pre>
              <code>
                {`sudo docker run -d --privileged --restart=unless-stopped --net=host -v /etc/kubernetes:/etc/kubernetes -v /var/run:/var/run kubesphere/kubesphere-console:v3.0.0-dev --server https://192.168.5.151 --token r4x7tpx44wnm97t2ps8hlptwpjz69ctvkwrv5jxht998lbpfwmfvj8 --ca-checksum 5a4c5b1935e71c70027b8b5a7c866c4c7ef390f5f05fb89707c2c2c2255b65cd --worker —-etcd —controller`}
              </code>
            </pre>
          </div>
        </div>
      </Modal>
    )
  }
}
