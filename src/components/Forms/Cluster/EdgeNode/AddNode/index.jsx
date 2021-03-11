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

import React, { Component } from 'react'

import { Form, Input, Notify, Button } from '@kube-design/components'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { generateId } from 'utils'
import { PATTERN_IP, PATTERN_NAME } from 'utils/constants'

import { Modal } from 'components/Base'
import { clone } from 'lodash'
import styles from './index.scss'

const ERROR_MESSAGE = {
  name: name => t('name', { name }),
  IP: ip => t('name', { ip }),
}

export default class AddEdgeModal extends Component {
  state = {
    link: '',
    loading: false,
    formData: clone(this.props.formTemplate || {}),
  }

  formRef = React.createRef()

  store = this.props.store

  validator = type => (rule, value, callback) => {
    if (!value) {
      return callback()
    }

    const { cluster } = this.props

    this.store
      .createEdgeNode({ cluster, ...this.state.formData })
      .then(result => {
        if (result.status === 'Failure') {
          const isIpError = result.message.indexOf(type) > -1
          if (isIpError) {
            callback({
              field: rule.field,
              message: ERROR_MESSAGE.type(value),
            })
          } else {
            callback()
          }
        } else {
          callback()
        }
      })
  }

  handleLink = async () => {
    const { cluster } = this.props
    const form = this.formRef.current
    this.setState({ loading: true })

    form &&
      form.validate(async () => {
        const result = await this.store.createEdgeNode({
          cluster,
          ...this.state.formData,
        })

        if (result.status !== 'Failure') {
          this.setState({ link: result.data })
        }
        this.setState({ loading: false })
      })
  }

  handleCopy = () => {
    Notify.success({
      content: t('Copy Successfully'),
    })
  }

  emptyLink = () => {
    if (this.state.link) {
      this.setState({ link: '' })
    }
  }

  renderLink = () => {
    const { link } = this.state

    return this.state.link ? (
      <div className={styles.column}>
        <Form.Item label={t('Add Command')} desc={t('ADD_EDGE_COMMAND')}>
          <div className={styles.linkContainer}>
            <pre className={styles.link}>{link}</pre>
          </div>
        </Form.Item>
        <CopyToClipboard text={link} onCopy={this.handleCopy}>
          <Button>{t('Copy')}</Button>
        </CopyToClipboard>
      </div>
    ) : null
  }

  render() {
    const { visible, onOk, onCancel } = this.props

    return (
      <Modal
        title={t('Add Edge Node')}
        width={600}
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
        hideFooter
      >
        <Form data={this.state.formData} ref={this.formRef}>
          <Form.Item
            label={t('Node Name')}
            rules={[
              {
                required: true,
                message: t("Please input the node's name"),
              },
              {
                pattern: PATTERN_NAME,
                message: t('Invalid name'),
              },
              { validator: this.validator('name') },
            ]}
          >
            <Input
              name="name"
              defaultValue={`edgenode-${generateId(4)}`}
              onChange={this.emptyLink}
            />
          </Form.Item>

          <div className={styles.column}>
            <Form.Item
              label={t('Node Internal IP Address')}
              desc={t('CLUSTER_NODE_INTERNAL_IP_DESC')}
              rules={[
                {
                  required: true,
                  message: t('Please input the ip address'),
                },
                {
                  pattern: PATTERN_IP,
                  message: t('Invalid ip address'),
                },
                { validator: this.validator('IP') },
              ]}
            >
              <Input
                name="ip"
                placeholder="XXX.XXX.XXX.XXX"
                autoComplete="off"
                onChange={this.emptyLink}
              />
            </Form.Item>
            <Button onClick={this.handleLink} loading={this.state.loading}>
              {t('Validate')}
            </Button>
          </div>

          {this.renderLink()}
        </Form>
      </Modal>
    )
  }
}
