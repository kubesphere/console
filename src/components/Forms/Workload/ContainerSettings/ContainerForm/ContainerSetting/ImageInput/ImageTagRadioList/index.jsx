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
import React, { useCallback } from 'react'
import { RadioGroup, Radio } from '@kube-design/components'
import { ScrollLoad } from 'components/Base'
import { toJS } from 'mobx'
import Item from './ImageTagRadio'
import styles from './index.scss'

const ImageTagRadioList = ({
  selectedImageTag,
  onSelectImageTag,
  getImageList,
  tagList,
}) => {
  const handleSelectImage = useCallback(value => {
    onSelectImageTag(value)
  }, [])

  const { data, page, total, isLoading } = tagList || {}

  return (
    <div className={styles.content}>
      <RadioGroup
        wrapClassName={
          total === 1 ? styles.radioOnlyOneListContent : styles.radioListContent
        }
        onChange={handleSelectImage}
        value={selectedImageTag}
      >
        <ScrollLoad
          className={styles.radioList}
          data={toJS(data)}
          page={page}
          total={total}
          loading={isLoading}
          noMount={true}
          onFetch={getImageList}
        >
          {data.map(tag => (
            <Radio value={tag} key={tag}>
              <Item tag={tag} selectedImageTag={selectedImageTag} />
            </Radio>
          ))}
        </ScrollLoad>
      </RadioGroup>
    </div>
  )
}

export default ImageTagRadioList
