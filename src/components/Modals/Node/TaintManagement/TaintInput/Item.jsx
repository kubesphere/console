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

import { Button, Icon, Input, Select, Tooltip } from '@kube-design/components'
import { ObjectInput } from 'components/Inputs'

import styles from './index.scss'

const Item = ({ onSelect, onDelete, disabled, ...params }) => {
  const effects = [
    { label: t('NOSCHEDULE'), value: 'NoSchedule' },
    { label: t('PREFER_NOSCHEDULE'), value: 'PreferNoSchedule' },
    { label: t('NOEXECUTE'), value: 'NoExecute' },
  ]

  return (
    <div className={styles.item}>
      <ObjectInput className={styles.inputs} {...params}>
        <Input name="key" placeholder={t('KEY')} />
        <Input name="value" placeholder={t('VALUE')} />
        <Select name="effect" options={effects} defaultValue="NoSchedule" />
      </ObjectInput>
      <div className={styles.tips}>
        <Tooltip
          content={
            <div dangerouslySetInnerHTML={{ __html: t('TAINTS_TIPS') }} />
          }
        >
          <Icon name="question" size={16} />
        </Tooltip>
      </div>
      <div className={styles.actions}>
        {onSelect && (
          <Tooltip content={t('TAINT_SELECT_TIPS')}>
            <Button
              type="flat"
              icon="add"
              className={styles.select}
              disabled={disabled}
              onClick={onSelect}
            />
          </Tooltip>
        )}
        {onDelete && (
          <Tooltip content={t('TAINT_DELETE_TIP')}>
            <Button
              type="flat"
              icon="trash"
              className={styles.delete}
              onClick={onDelete}
            />
          </Tooltip>
        )}
      </div>
    </div>
  )
}

export default Item
