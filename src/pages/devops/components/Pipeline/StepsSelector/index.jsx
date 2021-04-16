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
import { Icon } from '@kube-design/components'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import { ReactComponent as BackIcon } from 'assets/back.svg'
import CredentialModal from 'components/Modals/CredentialCreate'
import { PIPELINE_TASKS, PIPELINE_CONDITIONS } from 'utils/constants'

import {
  Echo,
  Shell,
  Dir,
  Container,
  ArchiveArtifacts,
  Git,
  Checkout,
  InputStep,
  WithCredentials,
  KubernetesDeploy,
  Timeout,
  Branch,
  Environment,
  Expression,
  Sonarqube,
  WaitForQualityGate,
  Script,
  Mail,
} from '../StepModals'

import siderStyle from '../Sider/index.scss'
import styles from './index.scss'

const noInputTasks = {
  not: true,
  allOf: true,
  anyOf: true,
}

const taskIcon = {
  echo: 'loudspeaker',
  mail: 'mail',
  shell: 'terminal',
  container: 'terminal',
  checkout: 'network-router',
  git: 'network-router',
  withCredentials: 'key',
  kubernetesDeploy: 'kubernetes',
  branch: 'network-router',
  timeout: 'clock',
  withSonarQubeEnv: 'network',
}

@observer
export default class StepsEditor extends React.Component {
  constructor(props) {
    super(props)
    this.taskDescs = {
      git: t('Pull code by Git'),
      shell: t(
        'You can execute shell commands or windows batch commands in the build.'
      ),
      container: t(
        'Specify a container to add nested tasks to execute inside the container'
      ),
      echo: t('Send messages in the build'),
      mail: t('Send messages by email'),
      checkout: t('CHECKOUT_DESC'),
      dir: t('Change Current Directory'),
      archiveArtifacts: t('Save Artifact'),
      cleanWs: t('Clean Workspace'),
      input: t('REVIEW_DESC'),
      withCredentials: t('Load credentials into environment variables'),
      kubernetesDeploy: t('Deploy resources to the Kubernetes cluster'),
      timeout: t(
        'Executes the code inside the block with a determined time out limit.'
      ),
      branch: t('Current branch name must match the input value'),
      environment: t(
        'The environment variable entered before running the pipeline is match the current value.'
      ),
      expression: t('Enter an expression'),
      not: t('Negative prefix'),
      allOf: t('Internal nesting conditions must be matched'),
      anyOf: t('Internal nested conditions only need to satisfy one'),
      withSonarQubeEnv: t('withSonarQubeEnv_DESC'),
      waitForQualityGate: t('waitForQualityGate_DESC'),
      script: t('script_DESC'),
    }
    this.state = [...PIPELINE_TASKS.All, ...PIPELINE_CONDITIONS].reduce(
      (prev, taskName) => {
        prev[`isShow${taskName}`] = false
        return prev
      },
      {}
    )
    this.state.showCredential = false
  }

  @observable
  activeTab = 'All'

  componentDidMount() {
    const { type } = this.props.store.edittingData

    const _type = type === 'sh' ? 'shell' : type
    this.setState({ [`isShow${_type}`]: true })
  }

  @action
  handleBack = () => {
    this.props.store.isAddingStep = false
  }

  @action
  handleAddTask = task => () => {
    if (task in noInputTasks) {
      this.props.onAddNoInputTask(task)
      return
    }
    this.setState({ [`isShow${task}`]: true })
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

  handleSetValue = () => {
    this.stage.name = this.stageName || this.stage.name

    this.props.store.setValue(this.stage)
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
        <Echo
          visible={this.state.isShowecho}
          onAddStep={this.handleAddStep('echo')}
          onCancel={this.handleCancel('echo')}
          edittingData={edittingData}
        />
        <Shell
          visible={this.state.isShowshell}
          onAddStep={this.handleAddStep('shell')}
          onCancel={this.handleCancel('shell')}
          edittingData={edittingData}
        />
        <Dir
          visible={this.state.isShowdir}
          onAddStep={this.handleAddStep('dir')}
          onCancel={this.handleCancel('dir')}
          edittingData={edittingData}
        />
        <Container
          visible={this.state.isShowcontainer}
          onAddStep={this.handleAddStep('container')}
          onCancel={this.handleCancel('container')}
          edittingData={edittingData}
        />
        <ArchiveArtifacts
          visible={this.state.isShowarchiveArtifacts}
          onAddStep={this.handleAddStep('archiveArtifacts')}
          onCancel={this.handleCancel('archiveArtifacts')}
          edittingData={edittingData}
        />
        <Git
          visible={this.state.isShowgit}
          showCredential={this.handleShowCredential}
          onAddStep={this.handleAddStep('git')}
          onCancel={this.handleCancel('git')}
          edittingData={edittingData}
          store={this.props.store}
        />
        <Checkout
          visible={this.state.isShowcheckout}
          showCredential={this.handleShowCredential}
          onAddStep={this.handleAddStep('checkout')}
          onCancel={this.handleCancel('checkout')}
          edittingData={edittingData}
          store={this.props.store}
        />
        <InputStep
          devops={devops}
          cluster={cluster}
          visible={this.state.isShowinput}
          edittingData={edittingData}
          onAddStep={this.handleAddStep('input')}
          onCancel={this.handleCancel('input')}
        />
        <WithCredentials
          visible={this.state.isShowwithCredentials}
          onAddStep={this.handleAddStep('withCredentials')}
          onCancel={this.handleCancel('withCredentials')}
          store={this.props.store}
          showCredential={this.handleShowCredential}
          edittingData={edittingData}
        />
        <KubernetesDeploy
          visible={this.state.isShowkubernetesDeploy}
          onAddStep={this.handleAddStep('kubernetesDeploy')}
          onCancel={this.handleCancel('kubernetesDeploy')}
          store={this.props.store}
          showCredential={this.handleShowCredential}
          edittingData={edittingData}
        />
        <Timeout
          visible={this.state.isShowtimeout}
          onAddStep={this.handleAddStep('timeout')}
          onCancel={this.handleCancel('timeout')}
          edittingData={edittingData}
        />
        <CredentialModal
          visible={this.state.showCredential}
          onOk={this.handleCreateCredential}
          onCancel={this.hideCreateCredential}
          devops={devops}
          cluster={cluster}
          credentialType={this.state.isShowkubernetesDeploy ? 'kubeconfig' : ''}
        />
        <Sonarqube
          visible={this.state.isShowwithSonarQubeEnv}
          onAddStep={this.handleAddStep('withSonarQubeEnv')}
          onCancel={this.handleCancel('withSonarQubeEnv')}
          edittingData={edittingData}
        />
        <WaitForQualityGate
          visible={this.state.isShowwaitForQualityGate}
          onAddStep={this.handleAddStep('waitForQualityGate')}
          onCancel={this.handleCancel('waitForQualityGate')}
          edittingData={edittingData}
        />
        <Script
          visible={this.state.isShowscript}
          onAddStep={this.handleAddStep('script')}
          onCancel={this.handleCancel('script')}
          edittingData={edittingData}
        />
        <Mail
          visible={this.state.isShowmail}
          onAddStep={this.handleAddStep('mail')}
          onCancel={this.handleCancel('mail')}
          edittingData={edittingData}
        />
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
            {PIPELINE_CONDITIONS.map((task, index) => (
              <div
                key={index}
                className={styles.task}
                key={task}
                onClick={this.handleAddTask(task)}
              >
                <div className={styles.taskIcon}>
                  <Icon name={taskIcon[task] || 'cdn'} size={24} />
                </div>
                <div className={styles.taskInfo}>
                  <div className={styles.taskName}>{task}</div>
                  <div className={styles.desc}>
                    {this.taskDescs[task] || '-'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }

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
        <div className={styles.tabs}>
          {Object.keys(PIPELINE_TASKS).map(task => (
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
          {PIPELINE_TASKS[this.activeTab].map(task => (
            <div
              className={styles.task}
              key={task}
              onClick={this.handleAddTask(task)}
            >
              <div className={styles.taskIcon}>
                <Icon name={taskIcon[task] || 'cdn'} size={24} />
              </div>
              <div className={styles.taskInfo}>
                <div className={styles.taskName}>{t(task)}</div>
                <div className={styles.desc}>{this.taskDescs[task] || '-'}</div>
              </div>
            </div>
          ))}
        </div>
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
