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

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Icon } from '@kube-design/components'

import { Image } from 'components/Base'
import styles from './index.scss'

class Banner extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    desc: PropTypes.string,
    icon: PropTypes.string,
    onClickBack: PropTypes.func,
  }

  handleClickBack = () => {
    this.props.onClickBack ? this.props.onClickBack() : history.back()
  }

  render() {
    const { title, desc, icon } = this.props
    return (
      <div className={styles.banner}>
        <div className={styles.back} onClick={this.handleClickBack}>
          <Icon name="return" size={20} />
          <span>{t('BACK')}</span>
        </div>
        <div className={styles.intro}>
          <span className={styles.icon}>
            <Image src={icon} alt="" iconLetter={title} iconSize={48} />
          </span>
          <div className={styles.text}>
            <h3>{title}</h3>
            <p>{desc}</p>
          </div>
        </div>
        <div className={styles.rightIcon}>
          <span className={styles.image}>
            <Image src={icon} alt="" iconLetter={title} iconSize={200} />
          </span>
        </div>
      </div>
    )
  }
}

export default Banner
