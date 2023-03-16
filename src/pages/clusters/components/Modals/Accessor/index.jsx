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

import { Alert, Select } from '@kube-design/components'
import { Modal, Switch, Text } from 'components/Base'
import { cloneDeep, get, set } from 'lodash'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import ProjectStore from 'stores/project'
import WorkspaceStore from 'stores/workspace'
import { showNameAndAlias } from 'utils'
import styles from './index.scss'

export default class AccessorModal extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    isSubmitting: PropTypes.bool,
  }

  static defaultProps = {
    visible: false,
    isSubmitting: false,
    onOk() {},
    onCancel() {},
  }

  constructor(props) {
    super(props)
    this.state = {
      newObject: cloneDeep(props.detail),
      enabled: !get(props.detail.spec, 'storageClassName', '').includes(
        'disabled'
      ),
      workspace: [],
      namespace: [],
      nsOpt: get(
        props.detail,
        'spec.namespaceSelector.fieldSelector[0].fieldExpressions[0].operator',
        'In'
      ),
      wsOpt: get(
        props.detail,
        'spec.workspaceSelector.fieldSelector[0].fieldExpressions[0].operator',
        'In'
      ),
      nsValues: get(
        props.detail,
        'spec.namespaceSelector.fieldSelector[0].fieldExpressions[0].values',
        []
      ),
      wsValues: get(
        props.detail,
        'spec.workspaceSelector.fieldSelector[0].fieldExpressions[0].values',
        []
      ),
    }
  }

  workspaceStore = new WorkspaceStore()

  namespaceStore = new ProjectStore()

  get namespaceOptions() {
    const { namespace } = this.state
    const { cluster } = this.props

    return namespace.map(ns => ({
      label: showNameAndAlias(ns, 'project', cluster),
      value: ns,
    }))
  }

  get workspaceOptions() {
    const { workspace } = this.state
    return workspace.map(ws => ({
      label: showNameAndAlias(ws, 'workspace'),
      value: ws,
    }))
  }

  get operatorOptions() {
    return [
      {
        label: t('OPERATOR_IN'),
        value: 'In',
      },
      {
        label: t('OPERATOR_NOT_IN'),
        value: 'NotIn',
      },
    ]
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = () => {
    const { cluster } = this.props
    Promise.all([
      this.workspaceStore.fetchList({ cluster, limit: -1 }),
      this.namespaceStore.fetchList({ cluster, limit: -1 }),
    ]).then(([workspace, namespace]) => {
      const workspaceArr = workspace.map(ws => ws.name)
      const namespaceArr = namespace.map(ns => ns.name)
      this.setState({
        workspace: workspaceArr,
        namespace: namespaceArr,
      })
    })
  }

  handleNsChange = ns => {
    this.setState({
      nsValues: ns,
    })
  }

  handleWsChange = ws => {
    this.setState({
      wsValues: ws,
    })
  }

  handleEnable = () => {
    this.setState({
      enabled: !this.state.enabled,
    })
  }

  expression = values => {
    return {
      fieldExpressions: [
        {
          field: 'Name',
          operator: 'In',
          values,
        },
      ],
    }
  }

  handleOk = () => {
    const { onOk, storageClassName } = this.props
    const { enabled, nsValues, wsValues, newObject, nsOpt, wsOpt } = this.state

    const namespaceItem = get(
      newObject.spec,
      'namespaceSelector.fieldSelector',
      [this.expression([])]
    )
    const workspaceItem = get(
      newObject.spec,
      'workspaceSelector.fieldSelector',
      [this.expression([])]
    )
    const name = enabled ? storageClassName : `${storageClassName}-disabled`
    set(newObject.spec, 'storageClassName', name)
    set(namespaceItem[0], 'fieldExpressions[0].values', nsValues)
    set(namespaceItem[0], 'fieldExpressions[0].operator', nsOpt)
    set(workspaceItem[0], 'fieldExpressions[0].values', wsValues)
    set(workspaceItem[0], 'fieldExpressions[0].operator', wsOpt)
    set(newObject.spec, 'namespaceSelector.fieldSelector', namespaceItem)
    set(newObject.spec, 'workspaceSelector.fieldSelector', workspaceItem)
    if (nsValues.length === 0) {
      delete newObject.spec.namespaceSelector
    }

    if (wsValues.length === 0) {
      delete newObject.spec.workspaceSelector
    }
    onOk(newObject)
  }

  handleNsOptChange = opt => {
    this.setState({
      nsOpt: opt,
    })
  }

  handleWsOptChange = opt => {
    this.setState({
      wsOpt: opt,
    })
  }

  render() {
    const { visible, onCancel, isSubmitting, shouldAddCrd } = this.props
    const { enabled, nsValues, wsValues, nsOpt, wsOpt } = this.state

    return (
      <Modal
        width={960}
        onOk={this.handleOk}
        onCancel={onCancel}
        visible={visible}
        title={t('SET_AUTHORIZATION_RULES')}
        okText={t('OK')}
        cancelText={t('CANCEL')}
        isSubmitting={isSubmitting}
        hideFooter={shouldAddCrd}
      >
        {shouldAddCrd && (
          <Alert type="warning" message={t.html('AUTHORIZATION_NOT_SUPPORT')} />
        )}
        <div className={styles.wrapper}>
          <Text
            className={styles.text}
            icon={() => (
              <img
                src="/assets/storageclass-tree.svg"
                style={{ width: '40px', marginRight: '16px' }}
              />
            )}
            title={t('AUTHORIZATION_RULES')}
            description={t('AUTHORIZATION_RULES_DESC')}
          />
          <Switch
            className={styles.switch}
            text={enabled ? t('ENABLED') : t('DISABLED')}
            checked={enabled}
            onChange={this.handleEnable}
          />
        </div>
        <div className={styles.selectBox}>
          <div className={styles.line}>
            <Select
              className={styles.labelSelect}
              options={[{ label: t('PROJECT'), value: 'namespace' }]}
              defaultValue={'namespace'}
              disabled
            />
            <Select
              className={styles.operator}
              options={this.operatorOptions}
              onChange={this.handleNsOptChange}
              value={nsOpt}
            />
            <Select
              multi
              className={styles.labelSelect}
              options={this.namespaceOptions}
              onChange={this.handleNsChange}
              value={nsValues}
            />
          </div>

          <div className={styles.line}>
            <Select
              className={styles.labelSelect}
              options={[{ label: t('WORKSPACE'), value: 'workspace' }]}
              defaultValue={'workspace'}
              disabled
            />
            <Select
              className={styles.operator}
              options={this.operatorOptions}
              onChange={this.handleWsOptChange}
              value={wsOpt}
            />
            <Select
              multi
              className={styles.labelSelect}
              options={this.workspaceOptions}
              onChange={this.handleWsChange}
              value={wsValues}
            />
          </div>
        </div>
      </Modal>
    )
  }
}
