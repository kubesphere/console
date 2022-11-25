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
import { isEmpty, isString } from 'lodash'
import { Link } from 'react-router-dom'

import { Icon } from '@kube-design/components'
import BtnGroup from './BtnGroup'
import Label from './Label'
import Attributes from './Attributes'

import styles from './index.scss'

class BaseInfo extends React.Component {
  static propTypes = {
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    name: PropTypes.string,
    desc: PropTypes.string,
    operations: PropTypes.array,
    labels: PropTypes.object,
    attrs: PropTypes.array,
  }

  static defaultProps = {
    icon: 'appcenter',
    name: '',
    desc: '',
  }

  renderNav() {
    const { breadcrumbs } = this.props
    if (isEmpty(breadcrumbs)) {
      return null
    }

    const br = breadcrumbs[0]
    return (
      <Link to={br.url} className={styles.breadcrumbs}>
        <Icon name="chevron-left" size={20} />
        {br.label}
      </Link>
    )
  }

  renderName() {
    const { icon, name } = this.props

    return (
      <div className={styles.name} title={name} data-test="detail-title">
        {isString(icon) ? <Icon name={icon} size={28} /> : icon}
        {name}
      </div>
    )
  }

  renderDesc() {
    const { desc } = this.props
    return (
      <div className={styles.desc} data-test="detail-desc">
        {desc}
      </div>
    )
  }

  renderBtnGroup() {
    const { operations } = this.props

    if (isEmpty(operations)) return null

    return <BtnGroup options={operations} limit={2} />
  }

  renderLabels() {
    const { labels } = this.props

    if (isEmpty(labels)) return null

    return (
      <div className={styles.labels} data-test="detail-labels">
        <div className="h6">{t('LABEL_PL')}</div>
        <div className={styles.labelList}>
          {Object.entries(labels).map(([name, value]) => (
            <Label key={name} name={name} value={value} />
          ))}
        </div>
      </div>
    )
  }

  renderAttributes() {
    const { attrs } = this.props

    if (isEmpty(attrs)) return null

    return (
      <div className={styles.attrs} data-test="detail-attrs">
        <div className="h6">{t('ATTRIBUTES')}</div>
        <Attributes>
          {attrs.map(({ name, value, show = true, ...rest }) => {
            if (!show) return null

            return (
              <Attributes.Item
                key={name}
                name={name}
                value={value === undefined || value === null ? '-' : value}
                {...rest}
              />
            )
          })}
        </Attributes>
      </div>
    )
  }

  render() {
    return (
      <div className={styles.card}>
        <div className={styles.base}>
          {this.renderNav()}
          {this.renderName()}
          {this.renderDesc()}
          {this.renderBtnGroup()}
        </div>
        <div className={styles.extra}>
          {this.renderLabels()}
          {this.renderAttributes()}
        </div>
      </div>
    )
  }
}

export default BaseInfo
