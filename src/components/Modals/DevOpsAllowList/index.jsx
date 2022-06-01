/*
 * This file is part of KubeSphere Console.
 * Copyright (C) 2022 The KubeSphere Console Authors.
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
import { ArrayInput } from 'components/Inputs'

import PropTypes from 'prop-types'
import { Form, Loading } from '@kube-design/components'
import { Modal, Empty } from 'components/Base'
import { get, isUndefined } from 'lodash'
import DevopsStore from 'stores/devops'
import CDStore from 'stores/cd'
import { toJS } from 'mobx'
import Destinations from './Destinations'
import CodeRepoSelect from './CodeRepoSelect'

export default class CDAllowListModal extends React.Component {
  static propTypes = {
    formTemplate: PropTypes.object,
    visible: PropTypes.bool,
    isSubmitting: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
  }

  static defaultProps = {
    formTemplate: {},
    visible: false,
    isSubmitting: false,
    onOk() {},
    onCancel() {},
  }

  state = {
    formTemplate: {},
    options: [],
    clusters: [],
    isLoading: false,
  }

  store = new DevopsStore()

  cdStore = new CDStore()

  formRef = React.createRef()

  componentDidMount() {
    this.init()
  }

  init = async () => {
    this.setState({ isLoading: true })
    await this.initFormTemplate()
    await this.fetchClusters()
    this.setState({ isLoading: false })
  }

  fetchClusters = async () => {
    await this.cdStore.getClustersList()
    const clusters = this.cdStore.clustersList.map(item => ({
      label: item.label,
      value: item.name,
      server: item.server,
    }))

    const allItem = {
      label: t('ALL'),
      value: '*',
      server: '*',
    }

    this.setState({ clusters: [allItem, ...clusters] })
  }

  initFormTemplate = () => {
    this.store.fetchDetail({ ...this.props }).then(() => {
      const argo = get(toJS(this.store.detail), '_originData.spec.argo', {})
      this.setState({
        formTemplate: { spec: { argo } },
      })
    })
  }

  checkItemValid = value => {
    return value !== ''
  }

  sourceReposValidator = (rule, value, callback) => {
    if (!value) {
      return callback()
    }

    if (value.length > 0) {
      const arr = []
      value.forEach(item => {
        if (arr.includes(item)) {
          return callback({ message: t('CODE_REPOSITORY_EXIST_DESC') })
        }

        if (!item) {
          return callback({ message: t('REPO_EMPTY_DESC') })
        }

        arr.push(item)
      })
    }

    callback()
  }

  destinationsValidator = (rule, value, callback) => {
    if (!value) {
      return callback()
    }

    if (value.length > 0) {
      const data = []
      value.forEach(item => {
        const isExit = data.find(destination => {
          return (
            destination.namespace === item.namespace &&
            destination.cluster === item.name
          )
        })

        if (!isUndefined(isExit)) {
          return callback({ message: t('DEPLOYMENT_LOCATION_EXIST_DESC') })
        }

        if (item.name && !item.namespace) {
          return callback({ message: t('PROJECT_NOT_SELECT_DESC') })
        }

        data.push({ namespace: item.namespace, cluster: item.name })
      })
    }

    callback()
  }

  render() {
    const { visible, onCancel, onOk, devops, cluster } = this.props

    return (
      <Modal.Form
        width={960}
        title={t('EDIT_ALLOWLIST')}
        data={this.state.formTemplate}
        onCancel={onCancel}
        onOk={onOk}
        visible={visible}
        formRef={this.formRef}
      >
        {this.state.isLoading ? (
          <Loading spinning={this.state.isLoading}>
            <Empty desc={'NO_DATA'} />
          </Loading>
        ) : (
          <>
            <Form.Item
              label={t('CODE_REPO_PL')}
              rules={[{ validator: this.sourceReposValidator }]}
            >
              <ArrayInput
                name="spec.argo.sourceRepos"
                addText={t('ADD')}
                itemType="string"
                checkItemValid={this.checkItemValid}
              >
                <CodeRepoSelect devops={devops} cluster={cluster} />
              </ArrayInput>
            </Form.Item>
            <Form.Item
              label={t('DEPLOYMENT_LOCATION_PL')}
              rules={[{ validator: this.destinationsValidator }]}
            >
              <ArrayInput
                name="spec.argo.destinations"
                itemType="object"
                addText={t('ADD')}
              >
                <Destinations
                  clusters={this.state.clusters}
                  formtemplate={this.state.formTemplate}
                />
              </ArrayInput>
            </Form.Item>
          </>
        )}
      </Modal.Form>
    )
  }
}
