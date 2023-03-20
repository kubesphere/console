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

import { Button } from '@kube-design/components'
import { List, TypeSelect } from 'components/Base'
import React from 'react'

import WorkloadStore from 'stores/workload'
import Card from './Card'
import styles from './index.scss'

export default class WorkloadAddCard extends React.Component {
  state = {
    detail: {},
  }

  static defaultProps = {
    onChange() {},
    onShowAdd() {},
    onShowEdit() {},
  }

  onShowAdd = () => {
    this.props.onShowAdd()
  }

  handleEdit = data => {
    this.props.onShowEdit(data)
  }

  handleDelete = () => {
    const { onChange } = this.props
    onChange(undefined)
  }

  renderAddComponent() {
    return (
      <List.Add
        onClick={this.onShowAdd}
        title={t('ADD_WORKLOAD')}
        description={t('ADD_WORKLOAD_DESC')}
      />
    )
  }

  componentDidMount() {
    this.getWorkloadDetail()
  }

  getWorkloadDetail = async () => {
    const { scaleTargetRef, namespace, cluster } = this.props

    const targetRef = scaleTargetRef

    if (!targetRef.name || !targetRef.kind) {
      return
    }

    const kind = targetRef.kind.toLowerCase()
    const module = `${kind}s`
    const stores = new WorkloadStore(module)
    const detail = await stores.fetchDetail({
      namespace,
      cluster,
      name: targetRef.name,
    })

    const initContainers = detail?.initContainers ?? []

    const containers = [...detail.containers, ...initContainers]

    const containerOptions = containers.map(item => ({
      icon: 'docker',
      value: item.name,
      label: item.name,
      description: t('ENV_CONTAINER'),
    }))

    this.selectContainer(containers[0].name)

    this.setState({
      detail: { ...detail, module },
      containerOptions,
      container: containers[0].name,
    })
  }

  selectContainer = value => {
    this.props.selectContainer(value)
  }

  renderContainerSelector = () => {
    return (
      <TypeSelect
        value={this.state.container}
        options={this.state.containerOptions}
        onChange={this.selectContainer}
      />
    )
  }

  render() {
    const { value } = this.props
    const { detail } = this.state

    return (
      <div className={styles.wrapper}>
        {value ? (
          <div>
            <Card
              detail={detail}
              onEdit={null}
              onDelete={null}
              action={
                <Button className={styles.action} onClick={this.handleEdit}>
                  {t('RESELECT')}
                </Button>
              }
            />
            {this.renderContainerSelector()}
          </div>
        ) : (
          this.renderAddComponent()
        )}
      </div>
    )
  }
}
