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
import { Link } from 'react-router-dom'
import { Button, Icon, Columns, Column, Tooltip } from '@kube-design/components'
import { Text } from 'components/Base'

import styles from './index.scss'

const Card = ({ gateway, rule, tls = {}, prefix }) => {
  const protocol = tls.hosts && tls.hosts.includes(rule.host) ? 'https' : 'http'

  let host = rule.host
  if (gateway && gateway.ports && gateway.type === 'NodePort') {
    const _port = gateway.ports.find(item => item.name === protocol)

    if (
      _port &&
      ((protocol === 'http' && _port.nodePort !== 80) ||
        (protocol === 'https' && _port.nodePort !== 443))
    ) {
      host = `${host}:${_port.nodePort}`
    }
  }

  const description = (
    <>
      <span>{t('PROTOCOL_VALUE', { value: protocol.toUpperCase() })}</span>
      &nbsp;&nbsp;
      {protocol === 'https' && (
        <span>{t('CERTIFICATE_VALUE', { value: tls.secretName })}</span>
      )}
    </>
  )

  return (
    <div className={styles.card}>
      <span className={styles.tip}>
        {t('UNABLE_TO_ACCESS')}
        &nbsp;&nbsp;
        <Tooltip content={t.html('UNABLE_TO_ACCESS_TIP')}>
          <Icon name="question" />
        </Tooltip>
      </span>
      <Text icon="ip" title={host} description={description} />
      {rule.http.paths.map(path => (
        <div key={path.path} className={styles.path}>
          <Columns>
            <Column>
              <span>{t.html('ROUTE_PATH_VALUE', { value: path.path })}</span>
            </Column>
            <Column>
              <span>
                {t('SERVICE_COLON')}
                <strong>
                  <Link to={`${prefix}/services/${path.backend.service.name}`}>
                    {path.backend.service.name}
                  </Link>
                </strong>
              </span>
            </Column>
            <Column>
              <span>
                {t.html('ROUTE_PORT_VALUE', {
                  value: path.backend.service.port.number,
                })}
              </span>
            </Column>
            <Column>
              <a
                href={`${protocol}://${host}${path.path}`}
                target="_blank"
                rel="noreferrer noopener"
              >
                <Button className={styles.access}>{t('ACCESS_SERVICE')}</Button>
              </a>
            </Column>
          </Columns>
        </div>
      ))}
    </div>
  )
}

Card.propTypes = {
  rule: PropTypes.object,
}

export default Card
