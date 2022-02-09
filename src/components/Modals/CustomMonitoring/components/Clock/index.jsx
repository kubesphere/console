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
import moment from 'moment-mini'

export default class Color extends React.Component {
  state = {
    time: Date.now(),
  }

  componentDidMount() {
    this.updateTime()
  }

  updateTime() {
    this.timer = setTimeout(() => {
      this.setState({ time: Date.now() })
      this.updateTime()
    }, 1000)
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  render() {
    return (
      <>
        {t('TIME')}: {moment(this.state.time).format('YYYY-MM-DD HH:mm:ss')}
      </>
    )
  }
}
