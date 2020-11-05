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
import { get } from 'lodash'

import { Icon } from '@kube-design/components'
import { Modal } from 'components/Base'

import NavItem from './item'

import styles from './index.scss'

class GlobalNav extends React.Component {
  static propTypes = {
    navs: PropTypes.array.isRequired,
    visible: PropTypes.bool,
    onCancel: PropTypes.func,
  }

  static defaultProps = {
    navs: [],
    visible: false,
    onCancel() {},
  }

  state = {
    hoverNav: get(this.props, 'navs[0].name', ''),
  }

  handleHover = e => {
    this.setState({ hoverNav: e.currentTarget.dataset.name })
  }

  render() {
    const { visible, navs, onCancel } = this.props
    const { hoverNav } = this.state

    return (
      <Modal
        visible={visible}
        className={styles.modal}
        bodyClassName={styles.body}
        width="100%"
        onCancel={onCancel}
        hideHeader
        hideFooter
      >
        <div>
          <div className={styles.navs} onClick={onCancel}>
            {navs.map(nav => (
              <NavItem
                key={nav.name}
                data={nav}
                isHover={hoverNav === nav.name}
                onHover={this.handleHover}
              />
            ))}
          </div>
          <Icon
            className={styles.close}
            name="close"
            size="medium"
            type="light"
            clickable
            onClick={onCancel}
          />
        </div>
      </Modal>
    )
  }
}

export default GlobalNav
