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
import { isObject } from 'lodash'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { ReactComponent as BackIcon } from 'assets/back.svg'
import { Image } from 'components/Base'

import styles from './index.scss'

export default class Banner extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  }

  get isAppsPage() {
    return location.pathname === '/apps'
  }

  renderTopIntro() {
    const { detail } = this.props
    if (!(isObject(detail) && 'name' in detail)) {
      return null
    }

    const { name, description, icon } = detail

    return (
      <div className={styles.intro}>
        <span className={styles.icon}>
          <Image iconSize={48} iconLetter={name} src={icon} alt="" />
        </span>
        <div className={styles.text}>
          <div>{name}</div>
          <p>{description}</p>
        </div>
      </div>
    )
  }

  render() {
    const { onBack } = this.props
    return (
      <div className={styles.banner}>
        <div className={styles.inner}>
          <div className={styles.innerContent}>
            <div className={classnames(styles.shape, styles.shape_1)} />
            <div className={classnames(styles.shape, styles.shape_3)} />
            <div className={classnames(styles.shape, styles.shape_4)} />
            {this.isAppsPage ? (
              <>
                <div className={styles.leftShape_1} />
                <div className={styles.leftShape_2} />
              </>
            ) : (
              <div className={classnames(styles.shape, styles.shape_2)} />
            )}
            <div className={styles.appOutline}>
              <div className={styles.back}>
                <a className="custom-icon" href="#" onClick={onBack}>
                  <BackIcon />
                  <span>{t('Back')}</span>
                </a>
              </div>
              {this.renderTopIntro()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
