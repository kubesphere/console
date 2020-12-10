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
import classNames from 'classnames'
import { Link } from 'react-router-dom'

import { Image } from 'components/Base'

import styles from './index.scss'

export default class Avatar extends React.Component {
  static propTypes = {
    avatar: PropTypes.string,
    avatarClass: PropTypes.string,
    iconLetter: PropTypes.string,
    iconSize: PropTypes.number,
    title: PropTypes.string,
    desc: PropTypes.string,
    to: PropTypes.string,
    onClick: PropTypes.func,
  }

  static defaultProps = {
    iconSize: 20,
    onClick: null,
  }

  renderImage() {
    const { avatar, iconLetter, iconSize, avatarClass } = this.props

    return (
      <label className={classNames(styles.image, avatarClass)}>
        <Image src={avatar} iconLetter={iconLetter} iconSize={iconSize} />
      </label>
    )
  }

  render() {
    const { title, desc, to, onClick, className } = this.props

    const titleComponent = to ? <Link to={to}>{title}</Link> : title

    return (
      <div className={classNames(styles.wrapper, className)}>
        {this.renderImage()}
        <div
          className={classNames(styles.title, styles.isIcon, 'avatar-title')}
        >
          <div>
            <strong
              className={classNames({ [styles.canClick]: Boolean(onClick) })}
              onClick={onClick}
            >
              {titleComponent}
            </strong>
          </div>
          <div className={styles.desc} title={desc}>
            {desc}
          </div>
        </div>
      </div>
    )
  }
}
