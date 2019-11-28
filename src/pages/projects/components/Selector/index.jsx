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

import { get } from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from '@pitrix/lego-ui'

import ProjectStore from 'stores/project'
import DevOpsStore from 'stores/devops'

import SelectModal from 'components/Modals/ProjectSelect'
import CreateModal from 'components/Modals/ProjectCreate'
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
    defaultIcon: '/assets/default-project.svg',
    type: 'projects',
    value: '',
    onChange() {},
  }

  constructor(props) {
    super(props)

    this.state = {
      showSelect: false,
      showCreate: false,
      isSubmitting: false,
    }

    this.projectStore = new ProjectStore()
    this.devopsStore = new DevOpsStore()
  }

  get enabledActions() {
    return {
      projects: globals.app.getActions({
        workspace: this.workspace,
        module: 'projects',
      }),
      devops: globals.app.getActions({
        workspace: this.workspace,
        module: 'devops',
      }),
    }
  }

  get workspace() {
    return this.props.workspace.name
  }

  get createType() {
    if (
      this.enabledActions.projects.includes('create') &&
      this.enabledActions.devops.includes('create')
    ) {
      return ''
    } else if (this.enabledActions.projects.includes('create')) {
      return 'projects'
    } else if (this.enabledActions.devops.includes('create')) {
      return 'devops'
    }

    return null
  }

  get formTemplate() {
    if (!FORM_TEMPLATES.project) {
      return {}
    }

    const template = FORM_TEMPLATES.project()
    const limitRangeTemplate = FORM_TEMPLATES.limitRange()

    return {
      projects: {
        Project: template,
        LimitRange: limitRangeTemplate,
      },
      devops: {},
    }
  }

  showSelect = () => {
    this.setState({ showSelect: true })
  }

  hideSelect = () => {
    this.setState({ showSelect: false })
  }

  handleSelect = value => {
    const { onChange } = this.props
    this.hideSelect()
    onChange(value)
  }

  showCreate = () => {
    this.setState({ showCreate: true })
  }

  hideCreate = () => {
    this.setState({ showCreate: false })
  }

  handleCreate = ({ type, ...data }) => {
    const { onChange } = this.props
    this.setState({ isSubmitting: true })
    if (type === 'devops') {
      this.devopsStore
        .create(data, { workspace: this.workspace })
        .then(result => {
          this.hideCreate()
          if (result.project_id) {
            onChange(`/devops/${result.project_id}`)
          }
        })
        .finally(() => {
          this.setState({ isSubmitting: false })
        })
    } else {
      const namespace =
        get(data, 'metadata.name') || get(data, 'Project.metadata.name')
      if (namespace) {
        this.projectStore
          .create(data, { workspace: this.workspace })
          .then(() => {
            this.hideCreate()
            onChange(`/projects/${namespace}`)
          })
          .finally(() => {
            this.setState({ isSubmitting: false })
          })
      }
    }
  }

  render() {
    const { icon, defaultIcon, title, type, value, workspace } = this.props
    const { showSelect } = this.state

    return (
      <div>
        <div className={styles.titleWrapper} onClick={this.showSelect}>
          <div className={styles.icon}>
            <img src={icon || defaultIcon} alt="" />
          </div>
          <div className={styles.text}>
            <p>{title}</p>
            <div className="h6" data-tooltip={value}>
              {value}
            </div>
          </div>
          <div className={styles.arrow}>
            <Icon name="caret-down" type="light" />
          </div>
        </div>
        <SelectModal
          defaultType={type}
          workspace={workspace}
          visible={showSelect}
          onChange={this.handleSelect}
          onCancel={this.hideSelect}
          onShowCreate={this.createType !== null ? this.showCreate : null}
        />
        {this.createType !== null && (
          <CreateModal
            type={this.createType}
            formTemplate={this.formTemplate}
            visible={this.state.showCreate}
            isSubmitting={this.state.isSubmitting}
            onOk={this.handleCreate}
            onCancel={this.hideCreate}
          />
        )}
      </div>
    )
  }
}
