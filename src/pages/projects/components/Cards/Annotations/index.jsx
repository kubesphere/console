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
import { isEmpty } from 'lodash'
import { Columns, Column } from '@kube-design/components'
import { Card } from 'components/Base'

import styles from './index.scss'

export default class Annotations extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    data: PropTypes.object,
  }

  static defaultProps = {
    data: {},
  }

  render() {
    const { className, data } = this.props

    if (isEmpty(data)) return null

    return (
      <Card className={className} title={t('ANNOTATION_PL')}>
        <ul className={styles.annotations}>
          {Object.keys(data)
            .filter(key => !isEmpty(data[key]))
            .map(key => (
              <li key={key}>
                <Columns>
                  <Column className="is-narrow">
                    <p style={{ width: 317 }}>{key}</p>
                  </Column>
                  <Column>
                    <p>{data[key]}</p>
                  </Column>
                </Columns>
              </li>
            ))}
        </ul>
      </Card>
    )
  }
}
