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
import { observer, inject } from 'mobx-react'
import { Link } from 'react-router-dom'
import { toJS } from 'mobx'
import { parse } from 'qs'
import { get, omit } from 'lodash'
import { Menu, Dropdown, Column, Icon } from '@pitrix/lego-ui'

import { JOB_STATUS } from 'utils/constants'
import { updatePipelineParams, updatePipelineParamsInSpec } from 'utils/devops'
import { Button } from 'components/Base'
import Health from 'projects/components/Health'
import EmptyTable from 'components/Cards/EmptyTable'
import DeleteModal from 'components/Modals/Delete'
import CreateModal from 'components/Modals/Create'
import Status from 'devops/components/Status'
import { getPipelineStatus } from 'utils/status'
import ParamsModal from 'components/Forms/CICDs/paramsModal'
import Banner from 'components/Cards/Banner'
import PipelineStore from 'stores/devops/pipelines'
import Table from 'components/Tables/Base'

import FORM_STEPS from 'configs/steps/pipelines'

import PipelineModal from './Modals/pipelineEditModal'
import EditPipelineConfig from './Modals/editPipelineConfigModal'
import styles from './index.scss'

const CREATE_TEMP = {
  json: {
    pipeline: {
      stages: [],
      agent: {
        type: 'any',
      },
    },
  },
}

@inject('rootStore', 'devopsStore')
@observer
class CICDs extends React.Component {
  constructor(props) {
    super(props)

    this.store = new PipelineStore()

    this.formTemplate = {
      project_name: this.props.devopsStore.project_name,
      cluster: this.cluster,
      enable_timer_trigger: true,
      enable_discarder: true,
    }

    this.state = {
      showCreate: false,
      showEdit: false,
      showDelete: false,
      showBranchModal: false,
      configFormData: {},
      selectPipeline: {},
    }
  }

  componentDidMount() {
    this.unsubscribe = this.routing.history.subscribe(location => {
      if (location.pathname === this.props.match.url) {
        const params = parse(location.search.slice(1))
        this.getData(params)
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    const { params } = this.props.match
    const { params: nextParams } = nextProps.match

    if (params.project_name !== nextParams.project_name) {
      this.getData(nextParams)
    }
  }

  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe()
  }

  get enabledActions() {
    return globals.app.getActions({
      module: 'pipelines',
      cluster: this.props.match.params.cluster,
      devops: this.props.devopsStore.data.name,
    })
  }

  get steps() {
    return FORM_STEPS
  }

  get project_id() {
    return this.props.devopsStore.project_id
  }

  getData(params) {
    this.store.fetchList({
      namespace: this.project_id,
      ...this.props.match.params,
      ...params,
    })
  }

  handleRunBranch = async (parameters, branch) => {
    const { project_id } = this.props.match.params
    const { name } = this.state.selectPipeline
    await this.store.runBranch({ project_id, name, branch, parameters })
    this.props.rootStore.routing.push(
      `${this.prefix}/${encodeURIComponent(this.state.selectPipeline.name)}/${
        branch ? `branch/${branch}/` : ''
      }activity`
    )
  }

  async handleRun(record) {
    const hasBranches = record.branchNames && record.branchNames.length
    const hasParameters = record.parameters && record.parameters.length
    if (hasBranches || hasParameters) {
      this.setState({ showBranchModal: true })
    } else {
      const { params } = this.props.match

      await this.store.runBranch({
        project_id: params.project_id,
        name: record.name,
      })
      this.props.rootStore.routing.push(
        `${this.prefix}/${encodeURIComponent(record.name)}/activity`
      )
    }
  }

  handleMoreMenuClick = record => (e, key) => {
    switch (key) {
      case 'edit':
        this.showEditConfig(record.name)
        break
      case 'delete':
        this.setState({ showDelete: true, selectPipeline: record })
        break
      case 'activity':
        this.props.rootStore.routing.push(
          `${this.prefix}/${encodeURIComponent(record.name)}/activity`
        )
        break
      case 'run':
        this.setState({ selectPipeline: record })
        this.handleRun(record)
        break
      default:
        break
    }
  }

  handleFetch = (params, refresh) => {
    this.routing.query(params, refresh)
  }

  handleBranchSelect = async branch => {
    const { params } = this.props.match
    const { selectPipeline } = this.state

    const result = await this.store.getBranchDetail({
      ...params,
      name: selectPipeline.name,
      branch,
    })

    if (result.parameters) {
      selectPipeline.parameters = result.parameters
      this.setState({ selectPipeline })
    }
  }

  get cluster() {
    return this.props.match.params.cluster
  }

  get workspace() {
    return this.props.match.params.workspace
  }

  get prefix() {
    if (this.props.match.url.endsWith('/')) {
      return this.props.match.url
    }
    return this.props.match.url
  }

  get routing() {
    return this.props.rootStore.routing
  }

  get module() {
    return 'cicds'
  }

  get name() {
    return 'CI/CD'
  }

  get itemActions() {
    return [
      {
        key: 'run',
        icon: 'triangle-right',
        text: t('Run'),
        action: 'trigger',
      },
      {
        key: 'activity',
        icon: 'calendar',
        text: t('Activity'),
        action: 'view',
      },
      {
        key: 'edit',
        icon: 'pen',
        text: t('Edit'),
        action: 'edit',
      },
      {
        key: 'delete',
        icon: 'trash',
        text: t('Delete'),
        action: 'delete',
      },
    ]
  }

  get enabledItemActions() {
    return this.itemActions.filter(
      item => !item.action || this.enabledActions.includes(item.action)
    )
  }

  showCreate = () => {
    this.setState({ showCreate: true })
  }

  showEditConfig = async name => {
    await this.store.fetchDetail({ name })
    const formData = this.store.getPipeLineConfig()
    formData.project_id = this.project_id

    this.setState({
      showEditConfig: true,
      configFormData: formData,
    })
  }

  hideCreate = () => {
    this.setState({ showCreate: false })
    // init formdata
    const project_name = this.props.devopsStore.project_name
    const cluster = this.cluster
    this.formTemplate = {
      project_name,
      cluster,
      enable_timer_trigger: true,
    }
  }

  hideDelete = () => {
    this.setState({ showDelete: false })
  }

  hideEditModal = () => {
    this.setState({ showEdit: false })
    this.props.rootStore.routing.push(
      `${this.prefix}/${encodeURIComponent(this.createName)}/`
    )
  }

  hideEditConfig = () => {
    this.setState({ showEditConfig: false })
  }

  hideBranchModal = () => {
    this.setState({ showBranchModal: false })
  }

  handleCreate = async data => {
    updatePipelineParams(data)
    updatePipelineParamsInSpec(data, this.project_id)
    this.setState({ isSubmitting: true })

    const result = await this.store
      .createPipeline({
        data,
        namespace: this.project_id,
        cluster: this.cluster,
      })
      .finally(() => {
        this.setState({ isSubmitting: false })
      })

    if (!result) {
      this.setState({ isSubmitting: false })
      return
    }

    if (data.spec.multi_branch_pipeline) {
      await this.store.scanRepository({
        name: data.spec.multi_branch_pipeline.name,
        project_id: this.project_id,
        cluster: this.cluster,
      })
      this.setState({ showCreate: false })
      this.props.rootStore.routing.push(
        `/${this.workspace}/clusters/${this.cluster}/devops/${
          this.project_id
        }/pipelines/${encodeURIComponent(
          data.spec.multi_branch_pipeline.name
        )}/activity`
      )
      return
    }

    if (result.metadata && result.metadata.name) {
      this.createName = result.metadata.name
      this.store.fetchDetail({ name: this.createName, cluster: this.cluster })
      this.setState({
        showCreate: false,
        showEdit: true,
      })
    }
  }

  handleSaveJenkinsFile = async jenkinsFile => {
    const { params } = this.props.match
    this.setState({ isSubmitting: true })
    const result = await this.store
      .updateJenkinsFile(jenkinsFile, params)
      .finally(() => {
        this.setState({ isSubmitting: false })
      })
    if (result.metadata.name) {
      this.setState({ showEdit: false })
      this.props.rootStore.routing.push(
        `${this.prefix}/${encodeURIComponent(result.metadata.name)}/`
      )
      const { namespace, project_id } = params
      localStorage.removeItem(
        `${globals.user.username}-${namespace}-${project_id}-${this.createName}`
      )
    }
  }

  handleEditConfig = async data => {
    updatePipelineParams(data, true)
    updatePipelineParamsInSpec(data, this.project_id)

    await this.store.updatePipeline({
      data,
      project_id: this.project_id,
      cluster: this.cluster,
    })

    this.setState({ showEditConfig: false })
    this.handleFetch()
  }

  handleDelete = async () => {
    this.setState({ isSubmitting: true })

    await this.store
      .deletePipeline(
        this.state.selectPipeline.name,
        this.project_id,
        this.cluster
      )
      .finally(() => {
        this.setState({ isSubmitting: false })
      })

    this.setState({ showDelete: false })
    this.handleFetch()
  }

  getStatus() {
    return JOB_STATUS.map(status => ({
      text: t(status.text),
      value: status.value,
    }))
  }

  getColumns = () => [
    {
      title: t('Name'),
      dataIndex: 'name',
      width: '20%',
      render: (name, record) => {
        if (record.numberOfFailingBranches !== undefined) {
          return (
            <Link
              className="item-name"
              to={`/${this.workspace}/clusters${this.cluster}/devops/${
                this.project_id
              }/pipelines/${encodeURIComponent(record.name)}/activity`}
            >
              {name}
            </Link>
          )
        }
        return (
          <Link
            className="item-name"
            to={`/${this.workspace}/clusters/${this.cluster}/devops/${
              this.project_id
            }/pipelines/${encodeURIComponent(record.name)}`}
          >
            {name}
          </Link>
        )
      },
    },
    {
      title: t('Status'),
      width: '15%',
      render: record => {
        if (record.numberOfSuccessfulBranches !== undefined) {
          return (
            <span className={styles.sourcePipelineStatus}>
              <span className={styles.pipelineSuccessNumber}>
                {record.numberOfSuccessfulBranches}
              </span>
              {t('branch success')}
            </span>
          )
        }
        return <Status {...getPipelineStatus(get(record, 'latestRun', {}))} />
      },
    },
    {
      title: t('WeatherScore'),
      dataIndex: 'weatherScore',
      width: '20%',
      render: weatherScore => <Health score={weatherScore} />,
    },
    {
      title: t('Branch'),
      dataIndex: 'totalNumberOfBranches',
      width: '20%',
      render: totalNumberOfBranches =>
        totalNumberOfBranches === undefined ? '-' : totalNumberOfBranches,
    },
    {
      title: t('PullRequest'),
      dataIndex: 'totalNumberOfPullRequests',
      render: totalNumberOfPullRequests =>
        totalNumberOfPullRequests === undefined
          ? '-'
          : totalNumberOfPullRequests,
      width: '20%',
    },
    {
      key: 'more',
      width: '20%',
      render: record =>
        this.enabledItemActions.length > 0 && (
          <Dropdown
            content={this.renderMoreMenu(record)}
            trigger="click"
            placement="bottomRight"
          >
            <Button icon="more" type="flat" />
          </Dropdown>
        ),
    },
  ]

  renderMoreMenu = record => (
    <Menu onClick={this.handleMoreMenuClick(record)}>
      {this.enabledItemActions.map(action => (
        <Menu.MenuItem key={action.key}>
          <Icon name={action.icon} /> {action.text}
        </Menu.MenuItem>
      ))}
    </Menu>
  )

  renderContent() {
    const { data = [], filters, isLoading, total, page, limit } = toJS(
      this.store.list
    )

    const isEmptyList = isLoading === false && total === 0

    const omitFilters = omit(filters, 'page')

    const showCreate = this.enabledActions.includes('create')
      ? this.showCreate
      : null

    if (isEmptyList && Object.keys(filters).length <= 0) {
      return <EmptyTable desc={t('CI/CD_CREATE_DESC')} onCreate={showCreate} />
    }

    const pagination = { total, page, limit }
    return (
      <Table
        data={data}
        columns={this.getColumns()}
        filters={omitFilters}
        pagination={pagination}
        rowKey="fullName"
        isLoading={isLoading}
        onFetch={this.handleFetch}
        onCreate={showCreate}
      />
    )
  }

  renderLastUpdatedItem = () => {
    const { data } = toJS(this.store.list)

    return (
      <Column>
        <div>{data[0] && data[0].name}</div>
      </Column>
    )
  }

  renderModals() {
    return (
      <React.Fragment>
        <CreateModal
          title={t('Create Pipeline')}
          store={this.store}
          module={this.module}
          steps={this.steps}
          formTemplate={this.formTemplate}
          visible={this.state.showCreate}
          onOk={this.handleCreate}
          onCancel={this.hideCreate}
          isSubmitting={this.state.isSubmitting}
          project_id={this.project_id}
          cluster={this.cluster}
          noCodeEdit
        />
        <EditPipelineConfig
          title={t('Edit Pipeline')}
          formTemplate={this.state.configFormData}
          visible={this.state.showEditConfig}
          onOk={this.handleEditConfig}
          onCancel={this.hideEditConfig}
          cluster={this.cluster}
        />
        <DeleteModal
          type={t('Pipeline')}
          resource={this.state.selectPipeline.name}
          visible={this.state.showDelete}
          onOk={this.handleDelete}
          onCancel={this.hideDelete}
          isSubmitting={this.state.isSubmitting}
        />
      </React.Fragment>
    )
  }

  render() {
    const { params } = this.prefix.match

    return (
      <div className={styles.wrapper}>
        <Banner
          title={t('Pipeline')}
          icon="blockchain"
          description={t('CI/CD_CREATE_DESC')}
          module={this.module}
        />
        {this.renderContent()}
        {this.renderModals()}
        <PipelineModal
          params={{ ...this.props.match.params, name: this.createName }}
          jsonData={CREATE_TEMP}
          visible={this.state.showEdit}
          onOk={this.handleSaveJenkinsFile}
          onCancel={this.hideEditModal}
          isSubmitting={this.state.isSubmitting}
        />
        <ParamsModal
          onOk={this.handleRunBranch}
          onCancel={this.hideBranchModal}
          onBranchSelect={this.handleBranchSelect}
          visible={this.state.showBranchModal}
          branches={
            this.state.selectPipeline && this.state.selectPipeline.branchNames
          }
          parameters={
            this.state.selectPipeline && this.state.selectPipeline.parameters
          }
          params={{
            ...params,
            name: get(this.state.selectPipeline, 'name', ''),
          }}
        />
      </div>
    )
  }
}

export default CICDs
