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
import classNames from 'classnames'
import { Icon } from '@pitrix/lego-ui'

import CreateModal from 'workspaces/components/Modals/WorkspaceCreate'
import SelectModal from 'workspaces/components/Modals/WorkspaceSelect'

import WorkspaceStore from 'stores/workspace'

import FORM_TEMPLATES from 'utils/form.templates'

import styles from './index.scss'

export default class Selector extends React.Component {
  static propTypes = {
    icon: PropTypes.string,
    defaultIcon: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    icon: '',
    defaultIcon: '/assets/default-workspace.svg',
    value: '',
    onChange() {},
  }

  constructor(props) {
    super(props)

    this.state = {
      showSelect: false,
      showCreate: false,
    }

    this.store = new WorkspaceStore()
  }

  get formTemplate() {
    return FORM_TEMPLATES['workspaces']()
  }

  showSelect = () => {
    this.setState({ showSelect: true })
  }

  hideSelect = () => {
    this.setState({ showSelect: false })
  }

  handleSelect = workspace => {
    const { onChange } = this.props
    this.hideSelect()
    onChange(workspace)
  }

  showCreate = () => {
    this.setState({ showCreate: true, showSelect: false })
  }

  hideCreate = () => {
    this.setState({ showCreate: false })
  }

  handleCreate = data => {
    this.store.create(data).then(() => {
      this.hideCreate()
      location.href = `/workspaces/${data.metadata.name}`
    })
  }

  render() {
    const { icon, defaultIcon, value } = this.props
    const { showSelect, showCreate } = this.state

    const canCreate = globals.app
      .getActions({ module: 'workspaces' })
      .includes('manage')

    return (
      <div>
        <div
          className={classNames(styles.titleWrapper, 'pointer')}
          onClick={this.showSelect}
        >
          <div className={styles.icon}>
            <img src={icon || defaultIcon} alt="" />
          </div>
          <div className={styles.text}>
            <p>{t('Workspace')}</p>
            <div className="h6" data-tooltip={value}>
              {value}
            </div>
          </div>
          <div className={styles.arrow}>
            <Icon name="caret-down" type="light" />
          </div>
        </div>
        <SelectModal
          visible={showSelect}
          onChange={this.handleSelect}
          onCancel={this.hideSelect}
          onShowCreate={canCreate ? this.showCreate : null}
        />
        {canCreate && (
          <CreateModal
            store={this.store}
            formTemplate={this.formTemplate}
            visible={showCreate}
            onOk={this.handleCreate}
            onCancel={this.hideCreate}
            isSubmitting={this.store.isSubmitting}
          />
        )}
      </div>
    )
  }
}
