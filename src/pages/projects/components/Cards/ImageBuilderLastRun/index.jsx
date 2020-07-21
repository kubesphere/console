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
import classnames from 'classnames'
import { Icon } from '@pitrix/lego-ui'
import { get, isArray } from 'lodash'

import { getLanguageName, parseUrl, formatSize } from 'utils'

import styles from './index.scss'

export default class BuilderInfo extends React.Component {
  pathAddCluster = (path, cluster) => {
    const match = path.match(/(\/kapis|api|apis)(.*)/)
    return !cluster || cluster === 'default' || isArray(match)
      ? path
      : `${match[1]}/cluster/${cluster}${match[2]}`
  }

  renderB2i() {
    const { className, params, runDetail } = this.props
    const { builderImage, sourceUrl, binaryName, binarySize } = runDetail
    const { cluster } = params
    const path = get(parseUrl(sourceUrl), 'pathname', `/${sourceUrl}`)
    const url = this.pathAddCluster(path, cluster)
    const downLoadUrl = `${window.location.protocol}/${
      window.location.host
    }/b2i_download${url}`

    return (
      <ul className={classnames(styles.builderContent, className)}>
        <li>
          <span className={styles.icon}>
            <Icon name={getLanguageName(builderImage)} size={40} />
          </span>
          <div className={styles.info}>
            <p className={styles.value}>{builderImage}</p>
            <p className={styles.name}>{t('builderImage')}</p>
          </div>
        </li>
        <li>
          <span className={styles.icon}>
            <Icon name="resource" size={40} />
          </span>
          <div className={styles.info}>
            <p className={styles.value} title={binaryName}>
              {binaryName}
            </p>

            <p className={styles.name}>
              <a href={downLoadUrl} download>
                {`${t('File Size')}: ${formatSize(binarySize)}`}
              </a>
            </p>
          </div>
        </li>
      </ul>
    )
  }

  render() {
    const { className, isB2i } = this.props

    if (isB2i) {
      return this.renderB2i()
    }

    const { sourceUrl, builderImage, revisionId } = this.props.runDetail

    return (
      <ul className={classnames(styles.builderContent, className)}>
        <li>
          <span
            className={styles.icon}
            style={{
              backgroundImage: `url('/assets/${getLanguageName(
                builderImage
              )}.png')`,
            }}
          />
          <div className={styles.info}>
            <p className={styles.value}>{builderImage}</p>
            <p className={styles.name}>{t('builderImage')}</p>
          </div>
        </li>
        <li>
          <span className={styles.icon}>
            <Icon name="resource" size={40} />
          </span>
          <div className={styles.info}>
            <p className={styles.value}>{sourceUrl}</p>
            <p className={styles.name}>{t('sourceUrl')}</p>
          </div>
        </li>
        <li>
          <Icon name="branch" className={styles.icon} />
          <div className={styles.info}>
            <p className={styles.value}>{revisionId || 'master'}</p>
            <p className={styles.name}>{t('Branch')}</p>
          </div>
        </li>
      </ul>
    )
  }
}
