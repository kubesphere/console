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

import { isArray } from 'lodash'
import React from 'react'
import { RadioGroup } from '@kube-design/components'
import { ACCESS_MODES } from 'utils/constants'

import styles from './index.scss'

const Card = ({ name, value }) => (
  <div className={styles.accessMode}>
    <p className="name">{`${name}(${value})`}</p>
    <p className="desc">{t(`ACCESS_MODE_${value}`)}</p>
  </div>
)

const AccessModes = props => {
  if (props.loading) {
    return null
  }

  let accessModes = Object.keys(ACCESS_MODES).map(key => ({
    label: <Card name={key} value={ACCESS_MODES[key]} />,
    value: key,
  }))

  if (isArray(props.supportedAccessModes)) {
    accessModes = accessModes.filter(mode =>
      props.supportedAccessModes.includes(mode.value)
    )
  }

  return (
    <div className={styles.accessModeWrapper}>
      <RadioGroup options={accessModes} {...props} />
    </div>
  )
}

export default AccessModes
