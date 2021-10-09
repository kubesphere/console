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
import { Icon, Button } from '@kube-design/components'

import { Indicator } from 'components/Base'

import styles from './index.scss'

export default class Item extends React.Component {
  renderDetail(details) {
    return details.map((detail, index) => (
      <div key={index} className={classNames(styles.text, detail.className)}>
        <div className={styles.title}>{detail.title}</div>
        {detail.description && (
          <div className={styles.description}>{detail.description}</div>
        )}
      </div>
    ))
  }

  render() {
    const {
      icon,
      image,
      title,
      status,
      description,
      extras,
      details,
      operations,
      onDelete,
      onEdit,
      onClick,
      className,
      titleClass,
      ...rest
    } = this.props

    return (
      <div
        className={classNames(
          styles.item,
          {
            [styles.withIcon]: icon || image,
          },
          className
        )}
        onClick={onClick}
        {...rest}
      >
        <div className={styles.wrapper}>
          <div className={styles.icon}>
            {image ? (
              <img src={image} alt="" />
            ) : (
              icon && <Icon name={icon} size={40} />
            )}
            {status ? (
              <Indicator className={styles.indicator} type={status} />
            ) : null}
          </div>
          <div className={styles.texts}>
            <div className={classNames(styles.text, titleClass)}>
              <div className={styles.title}>{title}</div>
              <div className={styles.description}>{description}</div>
            </div>
            {details && this.renderDetail(details)}
          </div>
          {operations || (
            <div className="buttons">
              {onDelete && (
                <Button type="flat" icon="trash" onClick={onDelete} />
              )}
              {onEdit && <Button type="flat" icon="pen" onClick={onEdit} />}
            </div>
          )}
        </div>
        {extras}
      </div>
    )
  }
}
