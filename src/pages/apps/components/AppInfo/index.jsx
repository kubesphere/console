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
import classnames from 'classnames'
import moment from 'moment-mini'

import { Markdown } from 'components/Base'
import ImageSlider from './ImageSlider'

import styles from './index.scss'

export default class AppInfo extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    app: PropTypes.object.isRequired,
    versions: PropTypes.array,
  }

  static defaultProps = {
    app: {},
    versions: [],
  }

  filterImages(images) {
    if (typeof images === 'string') {
      return images
        .split(',')
        .map(v => v.trim())
        .filter(Boolean)
    }
    if (Array.isArray(images)) {
      return images
    }
    return []
  }

  renderVersionTable() {
    const { versions } = this.props

    return (
      <table className={styles.versions}>
        <thead>
          <tr>
            <th>{t('VERSION_NUMBER')}</th>
            <th>{t('UPDATE_LOG')}</th>
          </tr>
        </thead>

        <tbody>
          {versions.map(({ name, description, status_time, version_id }) => (
            <tr key={version_id}>
              <td>
                <p className={styles.name}>{name}</p>
                <p className={styles.date}>
                  {moment(status_time).format('YYYY-MM-DD')}
                </p>
              </td>
              <td>
                <p className={styles.desc}>{description || '-'}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  renderAppDeployAgreement() {
    const { isCheck, onChange } = this.props
    return (
      <div className={styles.agree}>
        <p>{t('APP_DEPLOY_AGREEMENT_1')}</p>
        <p>{t.html('APP_DEPLOY_AGREEMENT_2')}</p>
        <div className="margin-t12">
          <Checkbox checked={isCheck} onChange={onChange}>
            {t('APP_DEPLOY_AGREEMENT_CHEKC')}
          </Checkbox>
        </div>
      </div>
    )
  }

  render() {
    const { className, app } = this.props
    const { abstraction, screenshots } = app

    return (
      <div className={classnames(styles.appInfo, className)}>
        <div>
          <h3 className={styles.title}>{t('APP_INTRODUCTION')}</h3>
          <Markdown source={abstraction || t('NONE')} />
        </div>
        <div>
          <h3 className={styles.title}>{t('APP_SCREENSHOTS')}</h3>
          <ImageSlider images={this.filterImages(screenshots)} />
        </div>
        <div>
          <h3 className={styles.title}>{t('APP_VERSIONS_TITLE')}</h3>
          {this.renderVersionTable()}
        </div>
      </div>
    )
  }
}
