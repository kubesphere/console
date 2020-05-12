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
import { get } from 'lodash'
import { ReactSortable } from 'react-sortablejs'
import { Icon, Loading } from '@pitrix/lego-ui'
import classNames from 'classnames'

import ErrorContainer from '../ErrorContainer'
import styles from './index.scss'

const ANIMATION_DURATION = 200

export default function TextPanelList({
  textPanels,
  isEditing,
  onAdd,
  onDelete,
  onEdit,
  onSort,
  monitors,
}) {
  function handleEdit(e) {
    const index = get(e, 'currentTarget.dataset.index')
    onEdit(index)
  }

  function handleDelete(e) {
    const index = get(e, 'currentTarget.dataset.index')
    onDelete(index)
  }

  return (
    <div>
      <ReactSortable
        list={monitors}
        setList={onSort}
        className={styles.wrapper}
        disabled={!isEditing}
        key={isEditing}
        animation={ANIMATION_DURATION}
      >
        {textPanels.map(
          ({ title, isLoading, value, id, errorMessage }, index) => (
            <div
              key={id}
              className={classNames({ [styles.editting]: isEditing })}
            >
              <ErrorContainer errorMessage={errorMessage}>
                <div className={styles.innner}>
                  {isEditing && (
                    <div className={styles.tools}>
                      <span data-index={index} onClick={handleEdit}>
                        <Icon name={'pen'} size={22} />
                      </span>
                      <span data-index={index} onClick={handleDelete}>
                        <Icon name={'trash'} size={22} />
                      </span>
                    </div>
                  )}

                  <div className={styles.content}>
                    <h3>{value}</h3>
                    <p>{title}</p>
                    {isLoading && (
                      <span className={styles.loadingTip}>
                        <Loading size={10} />
                      </span>
                    )}
                  </div>
                </div>
              </ErrorContainer>
            </div>
          )
        )}
      </ReactSortable>
      {isEditing && (
        <div className={styles.wrapper}>
          <div onClick={onAdd} className={styles.addButton}>
            <Icon name={'add'} size={22} />
          </div>
        </div>
      )}
    </div>
  )
}
