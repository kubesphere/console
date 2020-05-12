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
import classnames from 'classnames'
import Chart from '../Compose'

import styles from './index.scss'

export default class LegendsManageChart extends React.Component {
  state = {
    legendsVisibleStates: this.props.legends.reduce(
      (state, legend) => ({ ...state, [legend.ID]: true }),
      {}
    ),
  }

  handleClick = e => {
    const { id } = e.currentTarget.dataset
    const { legendsVisibleStates } = this.state

    this.setState({
      legendsVisibleStates: {
        ...legendsVisibleStates,
        [id]: !legendsVisibleStates[id],
      },
    })
  }

  render() {
    const { legends, ...restProps } = this.props
    const { legendsVisibleStates } = this.state

    return (
      <div className={styles.wrapper}>
        <Chart
          {...restProps}
          legends={legends.filter(legend => legendsVisibleStates[legend.ID])}
        />

        <div>
          {legends.map(legend => (
            <span
              className={classnames(styles.legend, {
                [styles.hidden]: !legendsVisibleStates[legend.ID],
              })}
              key={legend.ID}
              data-id={legend.ID}
              onClick={this.handleClick}
            >
              <small
                className={styles.radios}
                style={{ backgroundColor: legend.color }}
              />
              <span>{legend.name}</span>
            </span>
          ))}
        </div>
      </div>
    )
  }
}
