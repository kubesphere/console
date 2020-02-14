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
import { debounce, uniq } from 'lodash'
import { action, toJS } from 'mobx'
import { observer } from 'mobx-react'
import { Form, Modal } from 'components/Base'
import { Mention, Alert } from '@pitrix/lego-ui'
import MentionsInput from '@pitrix/lego-ui/lib/components/Mention/MentionsInput'

import DevopsStore from 'stores/devops'

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
    this.devopsStore = new DevopsStore()
    this.state = { loading: false, value: '', submitter: [] }
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.edittingData.type === 'input') {
      const nextState = {}
      nextProps.edittingData.data.forEach(param => {
        if (param.key === 'message') {
          nextState.value = param.value.value
        }
        if (param.key === 'submitter') {
          nextState.submitter = param.value.value.split(', ')
        }
      })
      return nextState
    }
    return null
  }

  handleMessageChange = e => {
    this.setState({
      value: e.target.value,
      submitter: uniq(
        (this.state.value.match(/@([\w-.]*)?/g) || []).map(str => str.slice(1))
      ),
    })
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
    this.setState({ loading: true })
    this.devopsStore
      .fetchMembers({ project_id: this.props.project_id })
      .then(result => {
        this.setState({ loading: false })

        if (!result.items) {
          return []
        }

        return result.items
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
        <Alert type="info" className={styles.info} message={t('INPUT_DESC')} />
        <Form data={this.formData} ref={this.formRef}>
          <Form.Item
            label={t('Message')}
            desc={t('INPUT_MESSAGE_DESC')}
            rules={[{ required: true, message: t('This param is required') }]}
          >
            <MentionsInput
              value={this.state.value}
              onChange={this.handleMessageChange}
              placeholder={t('Can @somebody to help review')}
              markup="@__id__ "
              displayTransform={id => `@${id}`}
            >
              <Mention
                data={this.fetchUsers}
                loading={this.state.loading}
                type="user"
                appendSpaceOnAdd
              />
            </MentionsInput>
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}
