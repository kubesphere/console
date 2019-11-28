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
import { toJS } from 'mobx'
import { observer, inject } from 'mobx-react'
import { get, isEmpty } from 'lodash'

import { getLocalTime, parseUrl } from 'utils'
import S2IBuilderStore from 'stores/s2i/builder'
import S2IRunStore from 'stores/s2i/run'
import ResourceStore from 'stores/workload/resource'
import { renderRoutes } from 'utils/router.config'

import { Loading } from '@pitrix/lego-ui'
import Base from 'core/containers/Base/Detail'
import EditYamlModal from 'components/Modals/EditYaml'
import RerunModal from 'components/Forms/ImageBuilder/RerunForm'

import EditModal from './Components/EditModal'
import styles from './index.scss'

@inject('rootStore')
@observer
class ImageBuilderDetail extends Base {
  state = {
    editBaseInfo: false,
    viewYaml: false,
    deleteModule: false,
  }

  get module() {
    return 's2ibuilders'
  }

  get name() {
    return 's2ibuilders'
  }

  get selectors() {
    const { spec = {} } = this.store.detail
    const selector = get(spec, 'selector.matchLabels', {})

    return isEmpty(selector) ? (
      '-'
    ) : (
      <span>
        {Object.keys(selector)
          .map(key => `${key} = ${selector[key]}`)
          .join(', ')}
      </span>
    )
  }

  get labels() {
    const label = get(this.store.detail, 'labels', {})
    label.tag = get(this.store.detail, 'spec.config.tag', '')
    return label
  }

  get updateTime() {
    const conditions = get(this.store.detail, 'status.conditions', [])

    if (isEmpty(conditions)) return '-'

    let lastTime = new Date(
      get(conditions, '[0].lastTransitionTime', 0)
    ).valueOf()
    conditions.forEach(({ lastTransitionTime }) => {
      const value = new Date(lastTransitionTime).valueOf()
      value > lastTime && (lastTime = value)
    })

    return getLocalTime(lastTime).format('YYYY-MM-DD HH:mm:ss')
  }

  init() {
    this.store = new S2IBuilderStore(this.module)
    this.resourceStore = new ResourceStore(this.module)
    this.s2iRunStore = new S2IRunStore()
  }

  fetchData = async params => {
    if (this.store.fetchDetail) {
      const builderResult = await this.store
        .fetchDetail(this.params, params)
        .catch(this.catch)
      const runDetail = await this.s2iRunStore.fetchRunDetail({
        ...this.params,
        runName: get(builderResult, 'status.lastRunName', ''),
      })
      await this.s2iRunStore.fetchJobDetail({
        ...this.params,
        name: get(runDetail, '_originData.status.kubernetesJobName', ''),
      })
    }
  }

  getOperations = () => [
    {
      key: 'reRun',
      text: t('Rerun'),
      action: 'edit',
      type: 'control',
      onClick: this.showModal('reRun'),
    },
    {
      key: 'edit',
      icon: 'pen',
      text: t('EDIT'),
      action: 'edit',
      onClick: this.showModal('editBaseInfo'),
    },
    {
      key: 'viewYaml',
      icon: 'eye',
      text: t('View YAML'),
      action: 'view',
      onClick: this.showModal('viewYaml'),
    },
    {
      key: 'editYaml',
      icon: 'pen',
      text: t('Edit YAML'),
      action: 'edit',
      onClick: this.showModal('editYaml'),
    },
    {
      key: 'delete',
      icon: 'trash',
      text: t('Delete'),
      action: 'delete',
      onClick: this.showModal('deleteModule'),
    },
  ]

  getAttrs = () => {
    const detail = toJS(this.store.detail)
    const { spec = {} } = detail
    const isBinaryURL = get(spec, 'config.isBinaryURL', '')
    const { binaryName } = this.s2iRunStore.runDetail
    const sourceUrl = get(spec, 'config.sourceUrl', '')
    const path = get(parseUrl(sourceUrl), 'pathname', `/${sourceUrl}`)
    const downLoadUrl = `${window.location.protocol}//${
      window.location.host
    }/b2i_download${path}`

    return [
      {
        name: t('Name'),
        value: detail.name,
      },
      {
        name: t('Project'),
        value: this.namespace,
      },
      {
        name: t('type'),
        value: t(detail.type),
      },
      {
        name: t('BuilderImage'),
        value: get(spec, 'config.builderImage', '-'),
      },
      {
        name: t('imageName'),
        value: get(spec, 'config.imageName', '-'),
      },
      {
        name: t('BuilderPullPolicy'),
        value: get(spec, 'config.builderPullPolicy', '-'),
      },
      {
        name: t('SourceUrl'),
        value: isBinaryURL ? (
          <a href={downLoadUrl} download>
            {binaryName}
          </a>
        ) : (
          sourceUrl
        ),
      },
      {
        name: t('Created Time'),
        value: this.createTime,
      },
      {
        name: t('Creator'),
        value: detail.creator,
      },
    ]
  }

  handleRerun = formData => {
    this.store.updateBuilder(formData, this.params).then(() => {
      this.fetchData()
      this.setState({ reRun: false, editYaml: false })
    })
  }

  renderSubView() {
    const { route } = this.props

    if (this.store.isLoading || this.s2iRunStore.isLoading)
      return (
        <div className={styles.loading}>
          <Loading size="large" />
        </div>
      )

    return renderRoutes(route.routes, {
      ...this.baseProps,
      ...this.getRouteProps(),
    })
  }

  renderExtraModals() {
    const { detail = {}, isSubmitting } = this.store
    const { editBaseInfo, viewYaml, reRun, editYaml } = this.state

    return (
      <div>
        <EditModal
          visible={editBaseInfo}
          detail={detail}
          onOk={this.handleEdit('editBaseInfo')}
          onCancel={this.hideModal('editBaseInfo')}
          isSubmitting={isSubmitting}
        />
        <EditYamlModal
          visible={viewYaml}
          detail={toJS(detail._originData)}
          onCancel={this.hideModal('viewYaml')}
        />
        <EditYamlModal
          visible={editYaml}
          detail={toJS(detail._originData)}
          onCancel={this.hideModal('editYaml')}
          onOk={this.handleRerun}
        />
        <RerunModal
          detail={detail._originData}
          visible={reRun}
          isSubmitting={isSubmitting}
          onOk={this.handleRerun}
          onCancel={this.hideModal('reRun')}
        />
      </div>
    )
  }
}

export default ImageBuilderDetail
