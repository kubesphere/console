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
import { observer } from 'mobx-react'

import { Image, Markdown } from 'components/Base'

import styles from './index.scss'

@observer
export default class BaseInfo extends React.Component {
  static propTypes = {
    detail: PropTypes.object,
    versionName: PropTypes.string,
  }

  static defaultProps = {
    detail: {},
    versionName: '',
  }

  renderBase() {
    const { detail, versionName } = this.props

    const url = detail.home
      ? /^https?:\/\//.test(detail.home)
        ? detail.home
        : `http://${detail.home}`
      : detail.home

    return (
      <div className={styles.base}>
        <div className={styles.title}>{t('Base Info')}</div>
        <div className={styles.info}>
          <div className={styles.icon}>
            <Image src={detail.icon} iconLetter={detail.name} iconSize={100} />
          </div>
          <div className={styles.words}>
            <dl>
              <dd>{detail.name}</dd>
              <dt>{t('Name')}</dt>
            </dl>
            <dl>
              <dd>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  {detail.home}
                </a>
                {!detail.home && <span>-</span>}
              </dd>
              <dt>{t('Service Provider Website')}</dt>
            </dl>
          </div>
          <div>
            <dl>
              <dd>{versionName}</dd>
              <dt>{t('App Version')}</dt>
            </dl>
            <dl>
              <dd>{detail.isv}</dd>
              <dt>{t('Service Provider')}</dt>
            </dl>
          </div>
        </div>
        <div className={styles.description}>
          <dl>
            <pre>{detail.description || '-'}</pre>
            <dt>{t('App Introduction')}</dt>
          </dl>
        </div>
        <div className={styles.title}>{t('App Description')}</div>
        <div>
          <Markdown source={detail.abstraction || t('None')} />
        </div>
      </div>
    )
  }

  render() {
    return <div className={styles.main}>{this.renderBase()}</div>
  }
}
