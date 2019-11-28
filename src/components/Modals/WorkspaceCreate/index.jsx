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
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { debounce } from 'lodash'
import { Columns, Column, Input, TextArea, Select } from '@pitrix/lego-ui'
import { Modal, Form } from 'components/Base'
import Title from 'components/Forms/Base/Title'
import UserStore from 'stores/user'
import { PATTERN_NAME } from 'utils/constants'

import styles from './index.scss'

@observer
export default class WorkSpaceCreateModal extends Component {
  static propTypes = {
    store: PropTypes.object,
    formTemplate: PropTypes.object,
    visible: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    isSubmitting: PropTypes.bool,
  }

  static defaultProps = {
    visible: false,
    isSubmitting: false,
    formTemplate: {},
    onOk() {},
    onCancel() {},
  }

  constructor(props) {
    super(props)

    this.userStore = new UserStore()
    this.userStore.fetchList()
  }

  getUsers() {
    return this.userStore.list.data.map(user => ({
      label: user.username,
      value: user.username,
    }))
  }

  nameValidator = (rule, value, callback) => {
    if (!value) {
      return callback()
    }

    if (value === 'workspaces') {
      return callback({
        message: t('current name is not available'),
        field: rule.field,
      })
    }

    this.props.store.checkName(value).then(resp => {
      if (resp.exist) {
        return callback({
          message: t('Workspace name exists'),
          field: rule.field,
        })
      }
      callback()
    })
  }

  handleScrollToBottom = () => {
    if (
      !this.scrolling &&
      this.userStore.list.total > this.userStore.list.data.length
    ) {
      this.scrolling = true
      this.userStore
        .fetchList({
          more: true,
          page: this.userStore.list.page + 1,
        })
        .then(() => {
          this.scrolling = false
        })
    }
  }

  handleInputChange = debounce(value => {
    // Workaround for search in select, should be fixed after lego-ui upgrade
    if (!value && this._select) {
      this._select = false
      return
    }

    this._search = true
    this.userStore.fetchList({ keyword: value })
  }, 300)

  handleChange = value => {
    this._select = true
    if (!value && this._search) {
      this.userStore.fetchList()
      this._search = false
    }
  }

  render() {
    const { detail, formTemplate, ...rest } = this.props

    return (
      <Modal.Form width={1162} hideHeader data={formTemplate} {...rest}>
        <div className={styles.wrapper}>
          <Title
            title={t('Create Workspace')}
            desc={t('WORKSPACE_CREATE_DESC')}
          />
          <Columns className="is-variable is-1">
            <Column>
              <div className="h6">{t('Basic Info')}</div>
              <div className={styles.baseWrapper}>
                <Form.Item
                  controlClassName={styles.nameWrapper}
                  label={t('Workspace Name')}
                  desc={t('WORKSPACE_NAME_DESC')}
                  rules={[
                    {
                      required: true,
                      message: t('Please input workspace name'),
                    },
                    {
                      pattern: PATTERN_NAME,
                      message: `${t('Invalid name')}, ${t(
                        'WORKSPACE_NAME_DESC'
                      )}`,
                    },
                    { validator: this.nameValidator },
                  ]}
                >
                  <Input
                    name="metadata.name"
                    placeholder={t('name')}
                    autoFocus={true}
                  />
                </Form.Item>
                <Form.Item label={t('Workspace Manager')}>
                  <Select
                    name="spec.manager"
                    searchable
                    options={this.getUsers()}
                    defaultValue={globals.user.username}
                    onChange={this.handleChange}
                    onInputChange={this.handleInputChange}
                    onBlurResetsInput={false}
                    onCloseResetsInput={false}
                    openOnClick={true}
                    isLoadingAtBottom
                    isLoading={this.userStore.list.isLoading}
                    bottomTextVisible={
                      this.userStore.list.total ===
                      this.userStore.list.data.length
                    }
                    onMenuScrollToBottom={this.handleScrollToBottom}
                  />
                </Form.Item>
                <Form.Item
                  controlClassName={styles.textarea}
                  label={t('Description')}
                  desc={t('SHORT_DESCRIPTION_DESC')}
                >
                  <TextArea
                    name="metadata.annotations['kubesphere.io/description']"
                    rows="3"
                  />
                </Form.Item>
              </div>
            </Column>
          </Columns>
        </div>
      </Modal.Form>
    )
  }
}
