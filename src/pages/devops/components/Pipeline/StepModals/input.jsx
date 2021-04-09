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
import PropTypes from 'prop-types'
import { debounce, uniq, isEmpty, isArray } from 'lodash'
import { action, toJS } from 'mobx'
import { observer } from 'mobx-react'
import { Mention, MentionsInput } from 'react-mentions'
import { Alert, Form } from '@kube-design/components'
import { Modal } from 'components/Base'

import UserStore from 'stores/user'

import styles from './index.scss'

@observer
export default class InputStep extends React.Component {
  static propTypes = {
    name: PropTypes.string,
  }

  static defaultProps = {
    visible: false,
    onOk() {},
    onCancel() {},
  }

  constructor(props) {
    super(props)
    this.memberStore = new UserStore()
    const { value, submitter } = this.getDefaultData()
    this.state = { loading: false, value, submitter }
  }

  handleMessageChange = e => {
    this.setState({
      value: e.target.value,
    })
  }

  handleMessageSubmitter = () => {
    const submitter = uniq(
      (this.state.value.match(/@([\w-.]*)?/g) || []).map(str => str.slice(1))
    )
    this.setState({
      submitter,
    })
  }

  getDefaultData = () => {
    const { edittingData } = this.props
    let value = ''
    let submitter = []
    const editData = toJS(edittingData)

    if (
      !isEmpty(editData) &&
      !isEmpty(editData.data) &&
      isArray(editData.data)
    ) {
      editData.data.forEach(param => {
        if (param.key === 'message') {
          value = param.value.value
        }
        if (param.key === 'submitter') {
          submitter = param.value.value.split(', ')
        }
      })
    }
    return { value, submitter }
  }

  @action
  fetchUsers = (query, callback) => {
    if (!query) return
    if (!this.debounced) {
      this.debounced = debounce(this.getUsers, 300)
    }
    this.query = query
    this.callback = callback
    this.debounced()
  }

  getUsers = () => {
    const { devops, cluster } = this.props
    this.setState({ loading: true })
    this.memberStore
      .fetchList({
        devops,
        cluster,
      })
      .then(result => {
        this.setState({ loading: false })
        if (isEmpty(result)) {
          return []
        }
        return result
          .map(user => ({
            id: user.username,
            display: user.username,
            sort: user.username.indexOf(toJS(this.query)),
          }))
          .sort((a, b) => {
            if (a.sort >= 0 && b.sort >= 0) {
              return a.sort - b.sort
            }
            return b.sort - a.sort
          })
      })
      .then(this.callback)
  }

  handleOk = () => {
    this.props.onAddStep({
      name: 'input',
      arguments: [
        {
          key: 'message',
          value: {
            isLiteral: true,
            value: this.state.value,
          },
        },
        {
          key: 'submitter',
          value: {
            isLiteral: true,
            value: this.state.submitter.join(', '),
          },
        },
      ],
    })
  }

  render() {
    const { visible, onCancel } = this.props

    return (
      <Modal
        width={680}
        bodyClassName={styles.body}
        onCancel={onCancel}
        onOk={this.handleOk}
        visible={visible}
        closable={false}
        title={t('input')}
      >
        <Alert
          type="info"
          icon="information"
          className={styles.info}
          message={t('INPUT_DESC')}
        />

        <Form data={this.formData} ref={this.formRef}>
          <Form.Item
            label={t('Message')}
            desc={t('INPUT_MESSAGE_DESC')}
            rules={[{ required: true, message: t('This param is required') }]}
          >
            <MentionsInput
              className="mention-input"
              value={this.state.value}
              onChange={this.handleMessageChange}
              onBlur={this.handleMessageSubmitter}
              placeholder={t('@somebody to help review')}
            >
              <Mention
                data={this.fetchUsers}
                loading={this.state.loading}
                type="user"
                appendSpaceOnAdd
                displayTransform={id => `@${id}`}
                markup="@__id__ "
              />
            </MentionsInput>
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}
