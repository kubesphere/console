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
import { computed, toJS } from 'mobx'
import { observer, inject } from 'mobx-react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import moment from 'moment-mini'
import { get, sortBy, isUndefined } from 'lodash'

import { getLocalTime, cacheFunc } from 'utils'
import { getCurrentRevision } from 'utils/workload'
import RevisionStore from 'stores/workload/revision'

import { Icon } from '@pitrix/lego-ui'
import { Button, Card } from 'components/Base'
import EditYamlModal from 'components/Modals/EditYaml'

import styles from './index.scss'

class RevisionControl extends React.Component {
  constructor(props) {
    super(props)

    this.revisionStore = props.revisionStore || new RevisionStore(this.module)
  }

  state = {
    showViewYaml: false,
    selectItem: {},
  }

  get module() {
    return this.props.module
  }

  get store() {
    return this.props.detailStore
  }

  get routing() {
    return this.props.rootStore.routing
  }

  get name() {
    return 'Deployments'
  }

  @computed
  get curRevision() {
    const { data } = toJS(this.revisionStore.list)
    return getCurrentRevision(this.store.detail, data, this.module)
  }

  @computed
  get diffDate() {
    const { data } = toJS(this.revisionStore.list)
    const createTime = get(
      data.find(item => item.revision === this.curRevision),
      'createTime'
    )
    return getLocalTime(createTime).fromNow()
  }

  getDetailLink = revisionId => {
    const { name, namespace } = this.props.match.params
    return `/projects/${namespace}/${
      this.module
    }/${name}/revisions/${revisionId}`
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = () => {
    this.revisionStore.fetchList(this.store.detail)
  }

  handleClick = e => {
    e.persist()
    const { revision } = e.target.dataset

    if (!isUndefined(revision)) {
      this.routing.push(this.getDetailLink(revision))
    }
  }

  hideViewYaml = () => {
    this.setState({ showViewYaml: false })
  }

  handleViewYaml = item =>
    cacheFunc(
      `_view_${item.revision}`,
      () => {
        this.setState({
          showViewYaml: true,
          selectItem: item._originData,
        })
      },
      this
    )

  renderRevisionItem = item => {
    const { revision, createTime } = item
    const isCur = parseInt(revision, 10) === this.curRevision

    return (
      <div key={revision} className={styles.item} data-revision={revision}>
        <div
          className={classnames(styles.icon, {
            [styles.checked]: isCur,
          })}
        >
          {isCur && <Icon name="check" type="light" />}
        </div>
        <div>
          <div className={styles.title}>#{revision}</div>
          <p className={styles.text}>
            {t('CREATE_TIME', {
              diff: moment(createTime).format(`${t('MMMM Do YYYY')} HH:mm:ss`),
            })}
          </p>
        </div>
        <div className={styles.operations}>
          <Button type="ghost" icon="eye" onClick={this.handleViewYaml(item)} />
        </div>
      </div>
    )
  }

  renderModals() {
    const { showViewYaml, selectItem } = this.state

    return (
      <EditYamlModal
        visible={showViewYaml}
        detail={selectItem}
        onCancel={this.hideViewYaml}
        readOnly
      />
    )
  }

  render() {
    const { data, isLoading } = toJS(this.revisionStore.list)
    const revisions = sortBy(data, item =>
      parseInt(item.revision, 10)
    ).reverse()

    const text = this.diffDate
      ? t('UPDATE_TIME', { diff: this.diffDate })
      : t('Updated just now')

    return (
      <div>
        <Card className={styles.main} loading={isLoading}>
          <div className={styles.header}>
            <Icon name="timed-task" size={40} />
            <div>
              <div className={styles.title}>
                {t('Revision')}
                <Link to={this.getDetailLink(this.curRevision)}>
                  #{this.curRevision}
                </Link>
                {t('is running')}
              </div>
              <p className={styles.text}>{text}</p>
            </div>
          </div>
          <div className={styles.list} onClick={this.handleClick}>
            {revisions.map(this.renderRevisionItem)}
          </div>
        </Card>
        {this.renderModals()}
      </div>
    )
  }
}

export default inject('rootStore', 'detailStore')(observer(RevisionControl))
export const Component = RevisionControl
