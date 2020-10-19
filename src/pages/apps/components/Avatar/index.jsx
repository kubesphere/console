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
import { Icon } from '@kube-design/components'

import { Image } from 'components/Base'

import styles from './index.scss'

export default class Avatar extends React.Component {
  static propTypes = {
    avatar: PropTypes.string,
    avatarType: PropTypes.string,
    avatarClass: PropTypes.string,
    icon: PropTypes.string,
    iconLetter: PropTypes.string,
    iconSize: PropTypes.number,
    title: PropTypes.string,
    desc: PropTypes.string,
    isApp: PropTypes.bool,
    to: PropTypes.string,
    onClick: PropTypes.func,
  }

  static defaultProps = {
    avatarType: 'image',
    iconSize: 20,
    isApp: false,
    onClick: null,
  }

  renderImage() {
    const {
      avatar,
      isApp,
      iconLetter,
      iconSize,
      avatarType,
      avatarClass,
    } = this.props
    const isAvatarIcon = avatarType === 'icon'

    if (isApp) {
      return (
        <label className={classNames(styles.image, avatarClass)}>
          <Image src={avatar} iconLetter={iconLetter} iconSize={iconSize} />
        </label>
      )
    }

    return (
      <img
        className={classNames(
          styles.image,
          {
            [styles.avatarIcon]: isAvatarIcon,
          },
          avatarClass
        )}
        src={avatar || '/assets/default-user.svg'}
        alt=""
      />
    )
  }

  render() {
    const {
      avatar,
      avatarType,
      icon,
      iconSize,
      title,
      desc,
      isApp,
      to,
      onClick,
      className,
    } = this.props

    const titleComponent = to ? <Link to={to}>{title}</Link> : title

    const isAvatarIcon = avatarType === 'icon'

    return (
      <div
        className={classNames(
          styles.wrapper,
          {
            [styles.appWrapper]: isApp,
          },
          className
        )}
      >
        {avatar || isApp
          ? this.renderImage()
          : icon && (
              <Icon className={styles.icon} name={icon} size={iconSize} />
            )}
        <div
          className={classNames(
            styles.title,
            {
              [styles.isIcon]: icon || isAvatarIcon,
            },
            'avatar-title'
          )}
        >
          <div>
            <strong
              className={classNames({ [styles.canClick]: Boolean(onClick) })}
              onClick={onClick}
            >
              {titleComponent}
            </strong>
          </div>
          <div className={styles.desc} title={isApp ? desc : ''}>
            {desc}
          </div>
        </div>
      </div>
    )
  }
}
