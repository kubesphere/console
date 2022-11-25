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

import { getLanguageName } from 'utils'

import styles from './index.scss'

export default class BuilderInfo extends React.Component {
  static defaultProps = {
    config: {
      sourceUrl: '-',
      builderImage: '-',
    },
  }

  render() {
    const { className } = this.props
    const { sourceUrl, builderImage } = this.props.config
    return (
      <ul className={classnames(styles.builderContent, className)}>
        <li>
          <span className={styles.icon}>
            <Icon name="resource" size={24} />
          </span>
          <div className={styles.info}>
            <p className={styles.value}>{sourceUrl}</p>
            <p className={styles.name}>{t('SOURCE_URL')}</p>
          </div>
        </li>
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
            <p className={styles.name}>{t('BUILDER_IMAGE')}</p>
          </div>
        </li>
      </ul>
    )
  }
}
