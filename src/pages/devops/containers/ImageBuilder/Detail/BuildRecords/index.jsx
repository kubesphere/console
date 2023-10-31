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

import { get } from 'lodash'
import { inject, observer } from 'mobx-react'
import React from 'react'

import ImageBuilderLastRun from 'projects/components/Cards/ImageBuilderLastRun'
import DevopsRunsCard from 'projects/components/Cards/ImageRunRecord/devops'
import styles from './index.scss'

@inject('detailStore', 's2iRunStore')
@observer
class BuildRecords extends React.Component {
  get store() {
    return this.props.detailStore
  }

  get isB2i() {
    return get(this.store.detail, 'spec.config.isBinaryURL')
  }

  render() {
    const { params } = this.props.match
    const detail = this.store.detail
    return (
      <React.Fragment>
        <div className={styles.title}>{t('LAST_BUILD_ENVIRONMENT')}</div>
        <div className={styles.card}>
          <ImageBuilderLastRun
            hiddenBuilderImage={true}
            isB2i={false}
            runDetail={{
              sourceUrl: get(detail, 'spec.source.url'),
            }}
            params={params}
          />
        </div>
        <div className={styles.title}>{t('RUN_RECORDS')}</div>
        <div className={styles.card}>
          <DevopsRunsCard
            isB2i={false}
            imageBuilderName={params.name}
            params={{
              cluster: params.cluster,
              namespace: params.devops,
            }}
          />
        </div>
      </React.Fragment>
    )
  }
}

export default BuildRecords
