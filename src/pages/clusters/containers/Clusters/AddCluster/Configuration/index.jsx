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
import { Icon, Select } from '@pitrix/lego-ui'
import { Form, Text, CodeEditor } from 'components/Base'

import SubTitle from '../SubTitle'
import styles from './index.scss'

export default class BaseInfo extends React.Component {
  state = {
    connectType: 'direct',
  }

  get types() {
    return [
      {
        label: t('CONNTECT_DIRECT'),
        value: 'direct',
      },
      {
        label: t('CONNTECT_PROXY'),
        value: 'proxy',
      },
    ]
  }

  get editOptions() {
    return {
      width: '100%',
      height: '100%',
    }
  }

  handleTypeChange = type => {
    this.setState({ connectType: type })
  }

  render() {
    const { connectType } = this.state
    return (
      <div>
        <SubTitle
          title={t('Cluster Settings')}
          description={t('CLUSTER_SETTINGS_DESC')}
        />
        <Form.Item
          label={t('Connect Method')}
          desc={t('CLUSTER_CONNECT_METHOD_DESC')}
        >
          <Select
            name="spec.connection.type"
            options={this.types}
            onChange={this.handleTypeChange}
          />
        </Form.Item>
        {connectType === 'direct' ? (
          <div className={styles.editorWrapper}>
            <div className={styles.editor}>
              <div className={styles.editorTitle}>
                <Icon name="kubernetes" size={20} />
                <span>{t('请填写目标集群的 KubeConfig')}</span>
              </div>
              <Form.Item>
                <CodeEditor
                  mode="yaml"
                  name="spec.connection.kubeconfig"
                  className={styles.editor}
                  options={this.editOptions}
                />
              </Form.Item>
            </div>
          </div>
        ) : (
          <div className={styles.tip}>
            <Text
              title={t('请根据集群中提供的代理连接设置加入集群')}
              description={t('需要在集群中设置下相应的代理Agent')}
            />
          </div>
        )}
      </div>
    )
  }
}
