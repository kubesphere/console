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
import { Icon } from '@kube-design/components'
import { get, isArray } from 'lodash'

import { getLanguageName, parseUrl, formatSize } from 'utils'

import styles from './index.scss'

export default class BuilderInfo extends React.Component {
  pathAddCluster = (path, cluster) => {
    const match = path.match(/(\/kapis|api|apis)(.*)/)
    return !cluster || cluster === 'default' || !isArray(match)
      ? path
      : `${match[1]}/clusters/${cluster}${match[2]}`
  }

  renderB2i() {
    const { className, params, runDetail } = this.props
    const {
      builderImage,
      sourceUrl,
      binaryName,
      binarySize,
      status,
    } = runDetail
    const { cluster } = params
    const path = get(parseUrl(sourceUrl), 'pathname', `/${sourceUrl}`)
    const url = this.pathAddCluster(path, cluster)
    const downLoadUrl = `${window.location.protocol}//${window.location.host}/b2i_download${url}`
    return (
      <ul className={classnames(styles.builderContent, className)}>
        <li>
          <span className={styles.icon}>
            <Icon name={getLanguageName(builderImage)} size={40} />
          </span>
          <div className={styles.info}>
            <p className={styles.value} title={builderImage}>
              {builderImage}
            </p>
            <p className={styles.name}>{t('BUILDER_IMAGE_SCAP')}</p>
          </div>
        </li>
        <li className={styles.downloadContent}>
          <a href={status !== 'Success' ? null : downLoadUrl} download>
            <span className={styles.icon}>
              <Icon name="resource" size={40} />
            </span>
            <div className={styles.info}>
              <p className={styles.value} title={binaryName}>
                {binaryName}
              </p>
              <p className={styles.name}>
                {t('FILE_SIZE_VALUE', { value: formatSize(binarySize) })}
              </p>
            </div>
          </a>
        </li>
      </ul>
    )
  }

  render() {
    const { className, isB2i, hiddenBuilderImage } = this.props

    if (isB2i) {
      return this.renderB2i()
    }

    const { sourceUrl, builderImage, revisionId } = this.props.runDetail

    return (
      <ul className={classnames(styles.builderContent, className)}>
        {!hiddenBuilderImage && (
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
              <p className={styles.value} title={builderImage}>
                {builderImage}
              </p>
              <p className={styles.name}>{t('BUILDER_IMAGE_SCAP')}</p>
            </div>
          </li>
        )}
        <li>
          <span className={styles.icon}>
            <Icon name="resource" size={40} />
          </span>
          <div className={styles.info}>
            <p className={styles.value} title={sourceUrl}>
              {sourceUrl}
            </p>
            <p className={styles.name}>{t('CODE_REPOSITORY_URL')}</p>
          </div>
        </li>
        {!hiddenBuilderImage && (
          <li>
            <Icon name="branch" className={styles.icon} />
            <div className={styles.info}>
              <p className={styles.value}>{revisionId || 'master'}</p>
              <p className={styles.name}>{t('BRANCH_SI')}</p>
            </div>
          </li>
        )}
      </ul>
    )
  }
}
