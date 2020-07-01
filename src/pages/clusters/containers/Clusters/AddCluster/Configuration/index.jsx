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
          label={t('Connection Method')}
          desc={t('CLUSTER_CONNECT_METHOD_DESC')}
        >
          <Select
            name="spec.connection.type"
            options={this.types}
            onChange={this.handleTypeChange}
          />
        </Form.Item>
        {connectType === 'direct' && (
          <div className={styles.tip}>
            {t.html('CLUSTER_DIRECT_IMPORT_TIP')}
          </div>
        )}
        {connectType === 'direct' ? (
          <div className={styles.editorWrapper}>
            <div className={styles.editor}>
              <div className={styles.editorTitle}>
                <Icon name="kubernetes" size={20} />
                <span>{t('INPUT_KUBECONFIG')}</span>
                <a className={styles.link} href="" target="_blank">
                  {t.html('HOW_TO_GET_KUBECONFIG')}
                </a>
              </div>
              <Form.Item
                rules={[{ required: true, message: t('INPUT_KUBECONFIG') }]}
                unControl
              >
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
              title={t('CLUSTER_AGENT_TITLE')}
              description={t('CLUSTER_AGENT_DESC')}
            />
            <div className="margin-t12">
              {t.html('CLUSTER_AGENT_IMPORT_TIP')}
            </div>
          </div>
        )}
      </div>
    )
  }
}
