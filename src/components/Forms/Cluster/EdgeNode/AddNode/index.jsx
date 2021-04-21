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
import { clone } from 'lodash'
import {
  Form,
  Input,
  Notify,
  Button,
  Tooltip,
  Icon,
  Checkbox,
} from '@kube-design/components'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { generateId } from 'utils'
import { PATTERN_IP, PATTERN_NAME } from 'utils/constants'

import { Modal } from 'components/Base'

import styles from './index.scss'

const ERROR_MESSAGE = {
  name: name => t('IN_USE_Node_NAME', { name }),
  IP: ip => t('IN_USE_Node_IP', { ip }),
}

export default class AddEdgeModal extends Component {
  state = {
    link: '',
    loading: false,
    showLink: false,
    isCheck: true,
    formData: clone(this.props.formTemplate || {}),
  }

  formRef = React.createRef()

  store = this.props.store

  validator = type => (rule, value, callback) => {
    const key = type.toLocaleLowerCase()

    if (!value) {
      return callback()
    }

    const { cluster } = this.props

    if (rule.field === key) {
      this.store
        .createEdgeNode({ cluster, ...this.state.formData })
        .then(result => {
          if (result.status === 'Failure') {
            const isIpError = result.message.indexOf(`${type}`) > -1
            isIpError
              ? callback({
                  field: rule.field,
                  message: ERROR_MESSAGE[type](value),
                })
              : callback()
          } else {
            callback()
          }
        })
    }
  }

  handleLink = () => {
    const { cluster } = this.props
    const { isCheck } = this.state
    const form = this.formRef.current

    form &&
      form.validate(async () => {
        this.setState({ loading: true })
        const result = await this.store.createEdgeNode({
          cluster,
          defaultTaint: isCheck,
          ...this.state.formData,
        })

        if (result.status !== 'Failure') {
          const link = result.data
          this.setState({ link, showLink: true })
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
      this.setState({ link: '', showLink: false })
    }
  }

  renderLink = () => {
    const { showLink, link } = this.state

    return showLink ? (
      <div className={styles.column}>
        <Form.Item
          label={
            <>
              {t('Add Command')}
              <Tooltip
                content={
                  <span className={styles.installInfo}>
                    {t.html('INSTALL_EDGENODE_DESC')}
                  </span>
                }
              >
                <Icon
                  className={styles.infoIcon}
                  name="information"
                  size={18}
                />
              </Tooltip>
            </>
          }
          desc={t('ADD_EDGE_COMMAND')}
        >
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

  handleChangeCheck = check => {
    this.setState({ isCheck: check })
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
                message: t('Invalid name', { message: '' }),
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
                  message: t('Please input the IP address'),
                },
                {
                  pattern: PATTERN_IP,
                  message: t('Invalid IP address'),
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
          <Checkbox
            defaultValue={true}
            checked={this.state.isCheck}
            onChange={this.handleChangeCheck}
          >
            {t('ADD_DEFAULT_STAIN', {
              params: 'node-role.kubernetes.io/edge="":NoSchedule',
            })}
          </Checkbox>
          {this.renderLink()}
        </Form>
      </Modal>
    )
  }
}
