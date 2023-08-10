/*
 * This file is part of KubeSphere Console.
 * Copyright (C) 2023 The KubeSphere Console Authors.
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
import { Icon } from '@kube-design/components'
import classNames from 'classnames'

import styles from './index.scss'

const ImageTagRadio = ({ tag, selectedImageTag }) => {
  return (
    <div
      className={classNames(styles.imageTagDetailItem, {
        [styles.checked]: tag === selectedImageTag,
      })}
    >
      <Icon
        name="tag"
        className={styles.icon}
        size={20}
        type={tag === selectedImageTag ? 'light' : 'dark'}
      />
      <p className={styles.tagName}>{tag}</p>
    </div>
  )
}

export default ImageTagRadio
