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

import { Radio } from '@kube-design/components'

import styles from './index.scss'

export default class Item extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
  }

  static defaultProps = {
    onChange: () => {},
    builderName: '',
    url: '',
  }

  constructor() {
    super()
    this.radio = React.createRef()
  }

  handleRadioClick = () => {
    this.radio.current.click()
  }

  render() {
    const { onChange, builderName, url, ...rest } = this.props

    return (
      <div className={styles.builderItem} onClick={this.handleRadioClick}>
        <Radio className={styles.radio} onChange={onChange} {...rest}>
          <p ref={this.radio} className={styles.title}>
            {builderName}
          </p>
        </Radio>
        <p className={styles.desc}>
          <span>{t('REPO_URL')}:</span>
          {url}
        </p>
      </div>
    )
  }
}
