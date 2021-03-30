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
import PropTypes from 'prop-types'
import { Loading } from '@kube-design/components'
import classnames from 'classnames'
import noop from 'lodash/noop'
import { Link } from 'react-router-dom'
import AppCard from 'components/Cards/App'
import { stringify } from 'qs'

import styles from './index.scss'

export default class AppList extends React.PureComponent {
  static propTypes = {
    apps: PropTypes.array,
    isLoading: PropTypes.bool,
    total: PropTypes.number,
    onFetchMore: PropTypes.func,
    itemCls: PropTypes.string,
    title: PropTypes.string,
    disableLink: PropTypes.bool,
    onClickAppItem: PropTypes.func,
  }

  static defaultProps = {
    apps: [],
    isLoading: false,
    total: 0,
    onFetchMore: noop,
    disableLink: false,
  }

  renderApps() {
    const {
      workspace,
      cluster,
      namespace,
      apps,
      isLoading,
      itemCls,
      disableLink,
      onClickAppItem,
    } = this.props

    if (apps.length === 0 && !isLoading) {
      return (
        <div className={styles.noApp}>
          <img src="/assets/empty-card.svg" alt="" />
          <p>{t('RESOURCE_NOT_FOUND')}</p>
        </div>
      )
    }

    const query = stringify({ workspace, cluster, namespace })

    return (
      <>
        {apps.map(app => {
          const link = `/apps/${app.app_id}?${query}`
          if (disableLink && onClickAppItem) {
            return (
              <div
                key={app.app_id}
                className={classnames(styles.appItem, itemCls)}
                onClick={() => onClickAppItem(app)}
              >
                <AppCard app={app} />
              </div>
            )
          }

          return (
            <Link
              key={app.app_id}
              className={classnames(styles.appItem, itemCls)}
              to={link}
            >
              <AppCard app={app} />
            </Link>
          )
        })}
      </>
    )
  }

  render() {
    const {
      apps,
      isLoading,
      total,
      onFetchMore,
      title,
      className,
      appRef,
    } = this.props
    return (
      <div className={classnames(styles.appList, className)} ref={appRef}>
        {title && <p className="apps-title">{title}</p>}
        {this.renderApps()}
        {isLoading && (
          <div className={styles.loading}>
            <Loading />
          </div>
        )}
        {!isLoading && apps.length < total && (
          <a className={styles.loadMore} onClick={onFetchMore}>
            <span>{t('Load More')}</span>
          </a>
        )}
      </div>
    )
  }
}
