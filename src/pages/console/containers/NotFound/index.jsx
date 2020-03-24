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

import styles from './index.scss'

export default class NotFound extends React.Component {
  state = {
    time: 10,
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState(({ time }) => ({
        time: Math.max(time - 1, 0),
      }))
    }, 1100)
  }

  componentDidUpdate() {
    if (this.state.time === 0) {
      if (this.interval) {
        clearInterval(this.interval)
      }

      location.href = '/'
    }
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval)
    }
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <img className={styles.image} src="/assets/empty-card.svg" alt="" />
        <div className={styles.text}>
          <div className="h1">Not Found</div>
          <p>
            {t.html('NOT_FOUND_DESC', {
              time: this.state.time,
              link: '/',
            })}
          </p>
        </div>
      </div>
    )
  }
}
