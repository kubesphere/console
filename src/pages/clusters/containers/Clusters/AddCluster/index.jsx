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
import { get, set, unset, cloneDeep } from 'lodash'
import { Columns, Column } from '@pitrix/lego-ui'
import { inject, observer } from 'mobx-react'
import { Button, Form } from 'components/Base'
import { ReactComponent as BackIcon } from 'src/assets/back.svg'

import ClusterStore from 'stores/cluster'

import BaseInfo from './BaseInfo'
import Configuration from './Configuration'
import styles from './index.scss'

@inject('rootStore')
@observer
export default class AddCluster extends React.Component {
  state = {
    currentStep: 0,
    formTemplate: {
      apiVersion: 'cluster.kubesphere.io/v1alpha1',
      kind: 'Cluster',
      spec: {
        provider: '',
        connection: {
          type: 'direct',
          kubeconfig: '',
        },
        joinFederation: true,
      },
    },
  }

  store = new ClusterStore()

  formRef = React.createRef()

  steps = [
    {
      name: 'baseinfo',
      component: BaseInfo,
    },
    {
      name: 'configuration',
      component: Configuration,
    },
  ]

  routing = this.props.rootStore.routing

  handleImport = async data => {
    const postData = cloneDeep(data)

    if (get(postData, 'spec.connection.type') === 'proxy') {
      unset(postData, 'spec.connection.kubeconfig')
    } else {
      const config = get(postData, 'spec.connection.kubeconfig', '')
      set(postData, 'spec.connection.kubeconfig', btoa(config))
      await this.store.validate(postData)
    }

    await this.store.create(postData)
    const name = get(postData, 'metadata.name')
    this.routing.push(`/clusters/${name}`)
  }

  handlePrev = () => {
    if (this.state.currentStep === 0) {
      this.routing.go(-1)
    } else {
      this.setState(({ currentStep }) => ({
        currentStep: Math.max(0, currentStep - 1),
      }))
    }
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

  renderForm() {
    const { currentStep } = this.state
    const step = this.steps[currentStep]
    const Component = step.component
    return <Component store={this.store} />
  }

  renderFooter() {
    const { currentStep } = this.state
    const total = this.steps.length - 1
    const { isValidating, isSubmitting } = this.store
    return (
      <div className={styles.footer}>
        {currentStep < total ? (
          <Button type="control" onClick={this.handleNext}>
            {t('Next')}
          </Button>
        ) : (
          <Button
            type="control"
            htmlType="submit"
            loading={isValidating || isSubmitting}
          >
            {isValidating ? t('Validating') : t('Import')}
          </Button>
        )}
      </div>
    )
  }

  render() {
    const { formTemplate } = this.state
    return (
      <div className={styles.wrapper}>
        <div className={styles.back}>
          <a className="custom-icon" onClick={this.handlePrev}>
            <BackIcon />
            <span>{t('Go back')}</span>
          </a>
        </div>
        <div className={styles.title}>
          <div className="h4">{t('Import Kubernetes Cluster')}</div>
          <p>{t('IMPORT_CLUSTER_DESC')}</p>
        </div>
        <Form
          data={formTemplate}
          ref={this.formRef}
          onSubmit={this.handleImport}
        >
          <Columns>
            <Column>{this.renderForm()}</Column>
            <Column className="is-narrow">{this.renderFooter()}</Column>
          </Columns>
        </Form>
      </div>
    )
  }
}
