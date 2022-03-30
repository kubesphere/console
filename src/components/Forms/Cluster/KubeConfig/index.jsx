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
import { Form, Icon, Columns, Column } from '@kube-design/components'
import { getDocsUrl } from 'utils'
import EditMode from 'components/EditMode'
import ClusterTitle from 'components/Clusters/ClusterTitle'
import { Text, Modal } from 'components/Base'
import PropTypes from 'prop-types'
import styles from './index.scss'

export default class KubeConfigModal extends React.Component {
  static propTypes = {
    formTemplate: PropTypes.object,
    visible: PropTypes.bool,
    isSubmitting: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
  }

  static defaultProps = {
    formTemplate: {},
    visible: false,
    isSubmitting: false,
    onOk() {},
    onCancel() {},
  }

  formRef = React.createRef()

  handleSubmit = () => {
    const { formTemplate, onOk } = this.props
    onOk(formTemplate)
  }

  render() {
    const { detail, formTemplate, visible, ...res } = this.props
    const expiredDay = detail.expiredDay
    const isExpired = expiredDay && expiredDay < 0

    return (
      <Modal width={1162} visible={visible} {...res} onOk={this.handleSubmit}>
        <Columns>
          <Column className="is-6">
            <ClusterTitle
              cluster={detail}
              onClick={this.handleClick}
              isExpired={isExpired}
            />
          </Column>
          <Column className="is-6">
            <Text title={detail.provider} description={t('PROVIDER')} />
          </Column>
        </Columns>
        <Form data={formTemplate} formRef={this.formRef}>
          <div className={styles.editor}>
            <div className={styles.editorTitle}>
              <Icon name="kubernetes" size={20} />
              <span>{t('INPUT_KUBECONFIG')}</span>
              <a
                className={styles.link}
                href={getDocsUrl('kube_config')}
                target="_blank"
                rel="noreferrer noopener"
              >
                {t('HOW_TO_GET_KUBECONFIG')}
              </a>
            </div>
            <Form.Item
              rules={[{ required: true, message: t('INPUT_KUBECONFIG') }]}
              unControl
            >
              <EditMode
                mode="yaml"
                name="kubeconfig"
                className={styles.editor}
              />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    )
  }
}
