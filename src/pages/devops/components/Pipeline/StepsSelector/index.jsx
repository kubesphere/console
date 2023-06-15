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
import classNames from 'classnames'
import { Icon, Loading } from '@kube-design/components'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import { ReactComponent as BackIcon } from 'assets/back.svg'
import CredentialModal from 'components/Modals/CredentialCreate'
import { PIPELINE_CONDITIONS } from 'utils/constants'

import { Branch, Environment, Expression, Params } from '../StepModals'

import siderStyle from '../Sider/index.scss'
import styles from './index.scss'

const noInputTasks = {
  not: true,
  allOf: true,
  anyOf: true,
}

const condIcon = {
  branch: 'network-router',
}

const conditionDescs = {
  branch: t('Current branch name must match the input value'),
  environment: t(
    'The environment variable entered before running the pipeline is match the current value.'
  ),
  expression: t('Enter an expression'),
  not: t('Negative prefix'),
  allOf: t('Internal nesting conditions must be matched'),
  anyOf: t('Internal nested conditions only need to satisfy one'),
}

@observer
export default class StepsEditor extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: true,
      stepTemplates: [],
      activeTask: null,
      showCredential: false,
      isShowParamModal: false,
      ...PIPELINE_CONDITIONS.reduce(
        (prev, name) => ({
          ...prev,
          [`isShow${name}`]: false,
        }),
        {}
      ),
    }
  }

  @observable
  activeTab = 'All'

  get steps() {
    return this.props.store.pipelineSteps
  }

  async componentDidMount() {
    const { type } = this.props.store.edittingData
    if (type && PIPELINE_CONDITIONS.includes(type)) {
      this.setState({ [`isShow${type}`]: true })
      return
    }
    if (type) {
      const task = await this.props.store.fetchStepTemplate(type)
      task &&
        this.setState({
          activeTask: task,
          isShowParamModal: true,
        })
      return
    }

    await this.getPipelineSteps()
  }

  @action
  handleBack = () => {
    this.props.store.isAddingStep = false
  }

  @action
  handleCancel = modalName => () => {
    this.setState({ [`isShow${modalName}`]: false })
    this.props.onCancel()
  }

  @action
  handleChangeActiveTab = tab => () => {
    this.activeTab = tab
  }

  @action
  handleAddStep = modalName => step => {
    this.props.onAddStep(step)
    this.setState({ [`isShow${modalName}`]: false })
  }

  handleAddTask = task => () => {
    if (task in noInputTasks) {
      this.props.onAddNoInputTask(task)
      return
    }
    const _task = this.state.stepTemplates.filter(t => t.name === task)
    if (_task.length) {
      this.setState({
        activeTask: _task[0],
        isShowParamModal: true,
      })
      return
    }
    this.setState({ [`isShow${task}`]: true })
  }

  async getPipelineSteps() {
    const { cluster } = this.props.store.params
    await this.props.store.fetchPipelineStepTemplates({ cluster })
    this.setState({
      stepTemplates: [...this.steps],
      isLoading: false,
    })
  }

  handleCreateCredential = async (data, callback) => {
    const { devops, cluster } = this.props.store.params
    await this.props.store.createCredential(data, { devops, cluster })
    callback()
    this.hideCreateCredential()
  }

  hideCreateCredential = async () => {
    await this.props.store.getCredentials()
    this.setState({ showCredential: false })
  }

  handleShowCredential = () => {
    this.setState({ showCredential: true })
  }

  renderStepsModal = () => {
    const { devops, cluster } = this.props.store.params
    const { edittingData, isAddingStep } = this.props.store
    const { activeTask } = this.state
    const hasCredential = activeTask?.parameters.some(
      task => task.type === 'secret'
    )

    if (isAddingStep === 'condition') {
      return (
        <React.Fragment>
          <Branch
            visible={this.state.isShowbranch}
            onAddStep={this.handleAddStep('branch')}
            onCancel={this.handleCancel('branch')}
            edittingData={edittingData}
          />
          <Environment
            visible={this.state.isShowenvironment}
            onAddStep={this.handleAddStep('environment')}
            onCancel={this.handleCancel('environment')}
            edittingData={edittingData}
          />
          <Expression
            visible={this.state.isShowexpression}
            onAddStep={this.handleAddStep('expression')}
            onCancel={this.handleCancel('expression')}
            edittingData={edittingData}
          />
        </React.Fragment>
      )
    }

    return (
      <React.Fragment>
        {activeTask && (
          <Params
            visible={this.state.isShowParamModal}
            activeTask={activeTask}
            onAddStep={this.handleAddStep('ParamModal')}
            onCancel={this.handleCancel('ParamModal')}
            showCredential={this.handleShowCredential}
            edittingData={edittingData}
            store={this.props.store}
            devops={devops}
            cluster={cluster}
            trigger={this.props.trigger}
          />
        )}
        {hasCredential && (
          <CredentialModal
            visible={this.state.showCredential}
            onOk={this.handleCreateCredential}
            onCancel={this.hideCreateCredential}
            devops={devops}
            cluster={cluster}
          />
        )}
      </React.Fragment>
    )
  }

  renderSider = () => {
    const { isAddingStep } = this.props.store

    if (isAddingStep === 'condition') {
      return (
        <div className={siderStyle.sheet}>
          <div className={siderStyle.title}>
            <span
              className={classNames('custom-icon', styles.back)}
              onClick={this.handleBack}
            >
              <BackIcon />
            </span>
            {t('Add conditions')}
          </div>
          <div className={styles.taskList}>
            {PIPELINE_CONDITIONS.map(cond => (
              <div
                className={styles.task}
                key={cond}
                onClick={this.handleAddTask(cond)}
              >
                <div className={styles.taskIcon}>
                  <Icon name={condIcon[cond] || 'cdn'} size={24} />
                </div>
                <div className={styles.taskInfo}>
                  <div className={styles.taskName}>{cond}</div>
                  <div className={styles.desc}>
                    {conditionDescs[cond] || '-'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }

    const allTask = this.state.stepTemplates
      .filter(t => t.category)
      .reduce(
        (prev, task) => {
          const _tasks = prev[task.category] || []
          return {
            ...prev,
            [task.category]: [..._tasks, task],
          }
        },
        {
          All: this.state.stepTemplates,
        }
      )
    const others = this.state.stepTemplates.filter(t => !t.category)
    others.length && (allTask.others = others)
    return (
      <div className={siderStyle.sheet}>
        <div className={siderStyle.title}>
          <span
            className={classNames('custom-icon', styles.back)}
            onClick={this.handleBack}
          >
            <BackIcon />
          </span>
          {t('Add Step')}
        </div>
        {this.state.isLoading ? (
          <Loading className={styles.loading} />
        ) : (
          <>
            <div className={styles.tabs}>
              {Object.keys(allTask).map(task => (
                <div
                  key={task}
                  className={classNames(styles.tab, {
                    [styles.tab_active]: this.activeTab === task,
                  })}
                  onClick={this.handleChangeActiveTab(task)}
                >
                  {t(task)}
                </div>
              ))}
            </div>
            <div className={styles.taskList}>
              {(allTask[this.activeTab] || []).map(task => (
                <div
                  className={styles.task}
                  key={task.name}
                  onClick={this.handleAddTask(task.name)}
                >
                  <div className={styles.taskIcon}>
                    <Icon name={task.icon || 'cdn'} size={24} />
                  </div>
                  <div className={styles.taskInfo}>
                    <div className={styles.taskName}>
                      <span>{t(task.title)}</span>
                    </div>
                    <div className={styles.desc}>{t(task.desc) || '-'}</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    )
  }

  render() {
    return (
      <React.Fragment>
        {!this.props.isEditMode ? this.renderSider() : null}
        {this.renderStepsModal()}
      </React.Fragment>
    )
  }
}
