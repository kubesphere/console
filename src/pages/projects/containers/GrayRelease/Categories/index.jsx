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
import { Button, Notify, Icon } from '@kube-design/components'
import CreateModal from 'components/Modals/Create'
import { GRAY_RELEASE_CATEGORIES } from 'utils/constants'
import FORM_TEMPLATE from 'utils/form.templates'
import formPersist from 'utils/form.persist'

import GrayReleaseStore from 'stores/grayrelease'
import RouterStore from 'stores/router'

import FORM_STEPS from 'configs/steps/grayreleases'

import styles from './index.scss'

@inject('rootStore')
@observer
export default class Categories extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showCreateModal: false,
      selectType: '',
    }

    this.store = new GrayReleaseStore()
    this.routerStore = new RouterStore()

    this.module = 'strategies'

    this.namespace = this.props.match.params.namespace
    this.cluster = this.props.match.params.cluster
  }

  componentDidMount() {
    this.routerStore.getGateway(this.props.match.params)
  }

  get routing() {
    return this.props.rootStore.routing
  }

  get formTemplate() {
    return {
      strategy: FORM_TEMPLATE[this.module]({
        namespace: this.namespace,
        type: this.state.selectType,
      }),
    }
  }

  get steps() {
    return FORM_STEPS
  }

  get canCreate() {
    const { cluster, workspace, namespace: project } = this.props.match.params
    return globals.app.hasPermission({
      cluster,
      workspace,
      project,
      module: 'grayscale-release',
      action: 'create',
    })
  }

  showCreate = e => {
    this.setState({
      showCreateModal: true,
      selectType: e.currentTarget.dataset.type,
    })
  }

  hideCreate = () => {
    this.setState({ showCreateModal: false, selectType: '' })
  }

  handleCreate = data => {
    const { workspace, cluster, namespace } = this.props.match.params
    this.store.create(data, { cluster, namespace }).then(() => {
      this.hideCreate()
      Notify.success({ content: `${t('Created Successfully')}` })
      this.routing.push(
        `/${workspace}/clusters/${cluster}/projects/${namespace}/grayrelease/jobs`
      )
      formPersist.delete(`${this.module}_create_form`)
    })
  }

  render() {
    const { showCreateModal, selectType } = this.state

    const cate =
      GRAY_RELEASE_CATEGORIES.find(item => item.type === selectType) || {}

    return (
      <div>
        <ul className={styles.wrapper}>
          {GRAY_RELEASE_CATEGORIES.map(item => (
            <li key={item.title}>
              <div className={styles.content}>
                <div className={styles.icon}>
                  <Icon name={item.icon} size={24} type="light" />
                </div>
                <div className={styles.text}>
                  <div className="h5">{t(item.title)}</div>
                  <p>{t.html(item.desc)}</p>
                </div>
              </div>
              <div className={styles.footer}>
                {this.canCreate && (
                  <Button
                    type="control"
                    data-type={item.type}
                    onClick={this.showCreate}
                  >
                    {t('Create Job')}
                  </Button>
                )}
              </div>
            </li>
          ))}
        </ul>
        <CreateModal
          title={t(cate.title)}
          module={`grayreleases_${cate.type}`}
          formTemplate={this.formTemplate}
          cluster={this.cluster}
          namespace={this.namespace}
          store={this.store}
          visible={showCreateModal}
          steps={this.steps}
          onCancel={this.hideCreate}
          onOk={this.handleCreate}
          closable
          noCodeEdit
        />
      </div>
    )
  }
}
