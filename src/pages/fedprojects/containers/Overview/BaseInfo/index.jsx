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
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { Icon } from '@pitrix/lego-ui'
import { Text } from 'components/Base'
import { getDisplayName } from 'utils'

import styles from './index.scss'

export default class BaseInfo extends React.Component {
  render() {
    const { className, detail = {}, workspace } = this.props

    return (
      <div className={classNames(styles.wrapper, className)}>
        <div className={styles.header}>
          <Icon name="project" size={40} />
          <Text
            title={getDisplayName(detail)}
            description={detail.description || '-'}
          />
        </div>
        <div className={styles.content}>
          <Text
            title={
              <Link to={`/workspaces/${workspace}/overview`}>{workspace}</Link>
            }
            description={t('Workspace')}
          />
          <Text title={detail.creator || '-'} description={t('Creator')} />
        </div>
        <img className={styles.background} src="/assets/project-overview.svg" />
      </div>
    )
  }
}
