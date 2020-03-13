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

import { get, isEmpty } from 'lodash'
import React from 'react'
import { toJS } from 'mobx'
import { observer, inject } from 'mobx-react'

import { getDisplayName } from 'utils'
import FORM_TEMPLATES from 'utils/form.templates'
import WorkspaceStore from 'stores/workspace'
import ProjectStore from 'stores/project'
import DevOpsStore from 'stores/devops'

import {
  Columns,
  Column,
  RadioGroup,
  RadioButton,
  Loading,
  Pagination,
} from '@pitrix/lego-ui'
import { Button, Search } from 'components/Base'
import EmptyList from 'components/Cards/EmptyList'
import CreateModal from 'components/Modals/ProjectCreate'
import Card from './Card'

import styles from './index.scss'

@inject('rootStore')
@observer
export default class Resources extends React.Component {
  constructor(props) {
    super(props)

    this.store = new WorkspaceStore()
    this.projectStore = new ProjectStore()
    this.devopsStore = new DevOpsStore()

    this.state = {
      showCreate: false,
      isSubmitting: false,
      keyword: '',
      projectType: this.defaultType || 'projects',
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.workspace !== this.props.workspace) {
      const params = { workspace: nextProps.workspace }
      this.canViewProject && this.store.fetchNamespaces(params)
      this.canViewDevOps && this.store.fetchDevOps(params)
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  get workspace() {
    return this.props.workspace
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

  get showCreate() {
    return (
      this.enabledActions.projects.includes('create') ||
      this.enabledActions.devops.includes('create')
    )
  }

  get canViewProject() {
    return this.enabledActions.projects.includes('view')
  }

  get canViewDevOps() {
    return (
      this.enabledActions.devops.includes('view') &&
      globals.app.hasKSModule('devops')
    )
  }

  get defaultType() {
    let type = ''
    if (
      this.enabledActions.projects.includes('create') &&
      this.enabledActions.devops.includes('create')
    ) {
      type = ''
    } else if (this.enabledActions.projects.includes('create')) {
      type = 'projects'
    } else if (this.enabledActions.devops.includes('create')) {
      type = 'devops'
    }

    return type
  }

  get routing() {
    return this.props.rootStore.routing
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

  fetchData = query => {
    const { projectType } = this.state
    const params = { workspace: this.workspace, ...query }

    if (projectType === 'devops') {
      const { keyword } = this.store.devops
      this.store.fetchDevOps({ keyword, ...params })
    } else {
      const { keyword } = this.store.namespaces
      this.store.fetchNamespaces({ keyword, ...params })
    }
  }

  showCreateModal = () => {
    this.setState({ showCreate: true })
  }

  hideCreateModal = () => {
    this.setState({ showCreate: false })
  }

  handleCreate = ({ type, ...data }) => {
    this.setState({ isSubmitting: true })
    if (type === 'devops') {
      this.devopsStore
        .create(data, { workspace: this.workspace })
        .then(result => {
          this.hideCreateModal()
          if (result.project_id) {
            this.routing.push(`/devops/${result.project_id}`)
          }
        })
        .finally(() => {
          this.setState({ isSubmitting: false })
        })
    } else {
      this.projectStore
        .create(data, { workspace: this.workspace })
        .then(() => {
          this.hideCreateModal()
          this.routing.push(`/projects/${get(data, 'Project.metadata.name')}`)
        })
        .finally(() => {
          this.setState({ isSubmitting: false })
        })
    }
  }

  handlePagination = page => {
    this.fetchData({ page, limit: 10 })
  }

  handleSearch = keyword => {
    const params = { workspace: this.workspace }
    if (this.state.projectType === 'devops') {
      this.store.fetchDevOps({ ...params, keyword })
    } else {
      this.store.fetchNamespaces({ ...params, keyword })
    }

    this.setState({ keyword })
  }

  handleTypeChange = type => {
    if (this.state.type !== type) {
      this.setState({ projectType: type, keyword: '' }, () => {
        this.fetchData()
      })
    }
  }

  getTotal = () => {
    const { namespaces = {}, devops = {} } = this.store
    const { projectType } = this.state

    return projectType === 'devops' ? devops.total : namespaces.total
  }

  renderDevOps() {
    const { data, page, total, limit, isLoading } = toJS(this.store.devops)

    if (isLoading) {
      return <Loading className={styles.loading} />
    }

    if (isEmpty(data)) {
      return (
        <EmptyList
          icon="topology"
          title={t('NO_RELATE_DEVOPS_TITLE')}
          desc={t('NO_RELATE_DEVOPS_DESC')}
        />
      )
    }

    return (
      <div>
        {data.map(project => (
          <Card
            key={project.project_id}
            name={project.name}
            desc={project.description}
            admin={project.creator}
            createTime={project.create_time}
            icon="strategy-group"
            type={'DevOps Project'}
            url={`/devops/${project.project_id}`}
          />
        ))}
        <div className="text-right margin-t12">
          <Pagination
            current={page}
            total={total}
            pageSize={limit}
            onChange={this.handlePagination}
          />
        </div>
      </div>
    )
  }

  renderProjects() {
    const { data, page, total, limit, isLoading } = toJS(this.store.namespaces)

    if (isLoading) {
      return <Loading className={styles.loading} />
    }

    if (isEmpty(data)) {
      return (
        <EmptyList
          icon="project"
          title={t('NO_RELATE_PROJECTS_TITLE')}
          desc={t('NO_RELATE_PROJECTS_DESC')}
        />
      )
    }

    return (
      <div>
        {data.map(namespace => (
          <Card
            key={namespace.uid}
            name={getDisplayName(namespace)}
            desc={namespace.description}
            admin={namespace.creator}
            annotations={namespace.annotations}
            createTime={namespace.createTime}
            icon="project"
            type={'Project'}
            url={`/projects/${namespace.name}`}
          />
        ))}
        <div className="text-right margin-t12">
          <Pagination
            current={page}
            total={total}
            pageSize={limit}
            onChange={this.handlePagination}
          />
        </div>
      </div>
    )
  }

  renderList() {
    const { projectType } = this.state

    return projectType === 'devops'
      ? this.renderDevOps()
      : this.renderProjects()
  }

  renderModals() {
    return (
      <CreateModal
        type={this.defaultType}
        formTemplate={this.formTemplate}
        visible={this.state.showCreate}
        isSubmitting={this.state.isSubmitting}
        onOk={this.handleCreate}
        onCancel={this.hideCreateModal}
      />
    )
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <Columns>
          <Column className="is-narrow">
            <RadioGroup
              wrapClassName="radio-default"
              buttonWidth={117}
              value={this.state.projectType}
              onChange={this.handleTypeChange}
              size="small"
            >
              {this.canViewProject && (
                <RadioButton value="projects">{t('Projects')}</RadioButton>
              )}
              {this.canViewDevOps && (
                <RadioButton value="devops">{t('DevOps Projects')}</RadioButton>
              )}
            </RadioGroup>
          </Column>
          <Column>
            <Search
              placeholder={t('Please enter a name to find')}
              onSearch={this.handleSearch}
              value={this.state.keyword}
            />
          </Column>
          <Column className="is-narrow">
            {this.showCreate && (
              <Button
                type="control"
                className={styles.create}
                onClick={this.showCreateModal}
              >
                {t('Create')}
              </Button>
            )}
          </Column>
        </Columns>
        <ul className={styles.cards}>
          <div className="h6">
            {t('List')} <span className={styles.total}>{this.getTotal()}</span>
          </div>
          {this.renderList()}
        </ul>
        {this.renderModals()}
      </div>
    )
  }
}
