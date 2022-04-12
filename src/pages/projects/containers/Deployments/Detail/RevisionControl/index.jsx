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

import { sortBy } from 'lodash'

import { getLocalTime } from 'utils'
import { getValue } from 'utils/yaml'
import { getCurrentRevision } from 'utils/workload'
import RevisionStore from 'stores/workload/revision'

import { Alert, Tag } from '@kube-design/components'
import { Text, TypeSelect, Panel } from 'components/Base'
import DiffYaml from 'components/DiffYaml'

import styles from './index.scss'

class RevisionControl extends React.Component {
  revisionStore = new RevisionStore(this.module)

  state = {
    showViewYaml: false,
    lastRevision: 0,
    selectRevision: 0,
  }

  componentDidMount() {
    this.fetchData()
  }

  get module() {
    return this.store.module
  }

  get store() {
    return this.props.detailStore
  }

  @computed
  get curRevision() {
    const { data } = toJS(this.revisionStore.list)
    return getCurrentRevision(this.store.detail, data, this.module)
  }

  @computed
  get revisions() {
    const { data } = toJS(this.revisionStore.list)
    return sortBy(data, item => parseInt(item.revision, 10))
      .reverse()
      .map(item => {
        let label = `#${item.revision} (${item.name.replace(
          `${item.ownerName}-`,
          ''
        )})`
        if (item.revision === this.curRevision) {
          label = (
            <span>
              <span>{label}</span> <Tag type="primary">{t('RUNNING')}</Tag>
            </span>
          )
        }
        const description = t('CREATED_TIME', {
          diff: getLocalTime(item.createTime).format('YYYY-MM-DD HH:mm:ss'),
        })
        return {
          label,
          description,
          icon: 'timed-task',
          value: item.revision,
        }
      })
  }

  fetchData = () => {
    this.revisionStore.fetchList(this.store.detail).then(() => {
      this.setState({ selectRevision: this.curRevision })
    })
  }

  handleRevisionChange = value => {
    this.setState({ selectRevision: value })
  }

  renderDiff() {
    const { selectRevision } = this.state
    const data = toJS(this.revisionStore.list.data)
    const lastRevision = Math.max(Number(selectRevision) - 1, 0)

    const newRevision = data.find(item => item.revision === selectRevision)
    const oldRevision = data.find(item => item.revision === lastRevision)

    const newYaml = newRevision ? getValue(newRevision._originData) : ''
    const oldYaml = oldRevision ? getValue(oldRevision._originData) : ''
    return (
      <DiffYaml
        datas={[oldYaml, newYaml]}
        title={t('CONFIG_FILE')}
        description={
          oldRevision
            ? t('COMPARE_WITH', {
                version: `#${lastRevision} (${oldRevision.name.replace(
                  `${oldRevision.ownerName}-`,
                  ''
                )})`,
              })
            : ''
        }
      />
    )
  }

  render() {
    const { data, isLoading } = this.revisionStore.list
    const { selectRevision } = this.state
    const revision = data.find(item => item.revision === selectRevision)

    return (
      <div>
        <Panel title={t('REVISION_RECORDS')}>
          <Alert
            className="margin-b12"
            message={t('REVISION_RECORDS_DESC')}
            hideIcon
          />
          <TypeSelect
            value={selectRevision}
            options={this.revisions}
            loading={isLoading}
            onChange={this.handleRevisionChange}
          />
        </Panel>
        {revision && (
          <Panel>
            <div className={styles.header}>
              <Text
                title={`#${revision.revision}`}
                description={t('SERIAL_NUMBER')}
              />
              <Text
                title={getLocalTime(revision.createTime).format(
                  'YYYY-MM-DD HH:mm:ss'
                )}
                description={t('CREATION_TIME')}
              />
            </div>
            <div className={styles.diffWrapper}>{this.renderDiff()}</div>
          </Panel>
        )}
      </div>
    )
  }
}

export default inject('rootStore', 'detailStore')(observer(RevisionControl))
export const Component = RevisionControl
