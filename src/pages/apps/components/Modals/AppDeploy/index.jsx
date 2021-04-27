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
import { observer } from 'mobx-react'
import { get } from 'lodash'
import { Button, Loading } from '@kube-design/components'

import { Modal } from 'components/Base'

import BasicInfo from 'components/Forms/AppDeploy/BasicInfo'
import AppConfig from 'components/Forms/AppDeploy/AppConfig'

import VersionStore from 'stores/openpitrix/version'
import AppFileStore from 'stores/openpitrix/file'

import { generateId } from 'utils'

import Steps from './Steps'

import styles from './index.scss'

@observer
export default class AppDeploy extends React.Component {
  static propTypes = {
    visible: PropTypes.bool,
    app: PropTypes.object,
    store: PropTypes.object,
    cluster: PropTypes.string,
    workspace: PropTypes.string,
    namespace: PropTypes.string,
    versionId: PropTypes.string,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
  }

  static defaultProps = {
    visible: false,
    app: {},
    onOk() {},
    onCancel() {},
  }

  constructor(props) {
    super(props)

    this.state = {
      currentStep: 0,
      formData: {
        app_id: props.app.app_id,
        name: `${props.app.name
          .slice(0, 7)
          .toLowerCase()
          .replaceAll(' ', '-')}-${generateId()}`,
        version_id: props.versionId,
        namespace: props.namespace,
        cluster: props.cluster,
        workspace: props.workspace,
      },
      intializing: true,
    }

    this.versionStore = new VersionStore()
    this.fileStore = new AppFileStore()

    this.formRef = React.createRef()
  }

  get steps() {
    return [
      {
        title: 'Basic Info',
        component: BasicInfo,
        required: true,
        isForm: true,
      },
      {
        title: 'App Config',
        component: AppConfig,
        required: true,
      },
    ]
  }

  componentDidMount() {
    this.init()
  }

  async init() {
    await this.versionStore.fetchList({
      app_id: this.props.app.app_id,
    })
    if (!this.state.formData.version_id) {
      this.setState({
        formData: {
          ...this.state.formData,
          version_id: get(this.versionStore, 'list.data[0].version_id', ''),
        },
      })
    }
    await this.fileStore.fetch({
      app_id: this.props.app.app_id,
      version_id: this.state.formData.version_id,
    })
    this.setState({ intializing: false })
  }

  handlePrev = () => {
    this.setState(({ currentStep }) => ({
      currentStep: Math.max(0, currentStep - 1),
    }))
  }

  handleNext = () => {
    const form = this.formRef.current
    form &&
      form.validate(() => {
        this.setState(({ currentStep }) => ({
          currentStep: Math.min(this.steps.length - 1, currentStep + 1),
        }))
      })
  }

  handleOk = () => {
    const form = this.formRef.current
    form &&
      form.validate(() => {
        this.props.onOk(this.state.formData)
      })
  }

  renderSteps() {
    return (
      <div className={styles.steps}>
        <Steps steps={this.steps} current={this.state.currentStep} />
      </div>
    )
  }

  renderForm() {
    const { app, cluster, workspace, namespace, versionId } = this.props
    const { formData, currentStep, intializing } = this.state

    if (intializing) {
      return <Loading className={styles.loading} />
    }
    const step = this.steps[currentStep]
    const Component = step.component

    const props = {
      formData,
      cluster,
      workspace,
      namespace,
      versionId,
      versionStore: this.versionStore,
      fileStore: this.fileStore,
      appId: app.app_id,
    }

    if (step.isForm) {
      props.formRef = this.formRef
    } else {
      props.ref = this.formRef
    }

    return (
      <div className={styles.form}>
        <Component {...props} />
      </div>
    )
  }

  renderFooter() {
    const { currentStep } = this.state

    const total = this.steps.length - 1
    return (
      <div className={styles.footer}>
        {currentStep > 0 && (
          <Button type="control" onClick={this.handlePrev}>
            {t('Previous')}
          </Button>
        )}
        {currentStep < total ? (
          <Button type="control" onClick={this.handleNext}>
            {t('Next')}
          </Button>
        ) : (
          <Button
            type="control"
            onClick={this.handleOk}
            loading={this.props.store.isSubmitting}
          >
            {t('Deploy')}
          </Button>
        )}
      </div>
    )
  }

  render() {
    const { app, versionId, onOk, onCancel, isSubmitting, ...rest } = this.props

    return (
      <Modal
        bodyClassName={styles.body}
        imageIcon={app.icon || app.name}
        title={app.name}
        description={app.description}
        onCancel={onCancel}
        rightScreen
        hideFooter
        {...rest}
      >
        {this.renderSteps()}
        {this.renderForm()}
        {this.renderFooter()}
      </Modal>
    )
  }
}
