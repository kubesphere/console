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

import { get, findKey } from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { Icon, Columns, Column, Tooltip } from '@pitrix/lego-ui'
import { Button } from 'components/Base'
import { MODULE_KIND_MAP, ICON_TYPES } from 'utils/constants'
import { getServicePort } from 'utils/service'

import styles from './index.scss'

export default class Item extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      workload: PropTypes.object,
      service: PropTypes.object,
    }),
    propsKey: PropTypes.string,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
  }

  static defaultProps = {
    data: { workload: {}, service: {} },
    propsKey: '',
    onEdit() {},
    onDelete() {},
  }

  handleEdit = () => {
    this.props.onEdit(this.props.propsKey)
  }

  handleDelete = () => {
    this.props.onDelete(this.props.propsKey)
  }

  renderPorts = () => {
    const { data } = this.props

    const ports = get(data, 'service.spec.ports', [])

    return (
      <div className={styles.tip}>
        {ports.map((item, index) => (
          <p key={index}>{getServicePort(item)}</p>
        ))}
      </div>
    )
  }

  render() {
    const { data } = this.props
    const workloadKind = get(data, 'workload.kind')
    const type =
      findKey(MODULE_KIND_MAP, o => o === workloadKind) || 'deployments'

    const ports = get(data, 'service.spec.ports', [])

    return (
      <div className={styles.item}>
        <Columns className="is-gapless">
          <Column className="is-narrow">
            <Icon name={ICON_TYPES[type]} size={40} />
          </Column>
          <Column>
            <div className={styles.block}>
              <div className="h6">
                {get(data, 'service.metadata.name', '-')}
              </div>
              <p>
                {t('Workload Type')}: {t(workloadKind)}
              </p>
            </div>
          </Column>
          <Column>
            <div className={styles.block}>
              <p>
                {t('Component Version')}:{' '}
                {get(data, 'workload.metadata.labels.version')}
              </p>
              <p>
                {t('Replicas Number')}: {get(data, 'workload.spec.replicas', 0)}
              </p>
            </div>
          </Column>
          <Column>
            <div className={styles.block}>
              <div className="flexbox">
                <span>
                  {t('Ports')}
                  :&nbsp;&nbsp;
                </span>
                <span>
                  {ports.slice(0, 2).map((item, index) => (
                    <span className="display-block" key={index}>
                      {getServicePort(item)}
                    </span>
                  ))}
                </span>
                {ports.length > 2 && (
                  <Tooltip content={this.renderPorts()}>
                    <Icon name="more" className={styles.more} clickable />
                  </Tooltip>
                )}
              </div>
            </div>
          </Column>
        </Columns>
        <div className={styles.operations}>
          <Button type="flat" icon="trash" onClick={this.handleDelete} />
          <Button type="flat" icon="pen" onClick={this.handleEdit} />
        </div>
      </div>
    )
  }
}
