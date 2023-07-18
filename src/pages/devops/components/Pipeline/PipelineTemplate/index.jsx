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

import Loading from '@kube-design/components/lib/components/Loading'
import classnames from 'classnames'
import { pick } from 'lodash'
import React, { useEffect, useRef, useState } from 'react'
import PipelineStore from 'stores/devops/pipelines'
import styles from './index.scss'

const PipelineTemplate = ({ handleTemplateChange, formTemplate, params }) => {
  const CUSTOM_TEMPLATE = {
    type: 'custom',
    image: '/assets/pipeline/custom.svg',
    title: t('CUSTOM_PIPELIEN'),
    desc: t('CUSTOM_PIPELIEN_DESC'),
  }

  const store = new PipelineStore()

  const [templist, setTemplist] = useState([])
  const [selected, setSelect] = useState(formTemplate.template)
  const [loading, setLoading] = useState(false)

  const getPipelineTemplateList = async p => {
    return await store.getPipelineTemplateList(p)
  }

  useEffect(() => {
    setLoading(true)
    getPipelineTemplateList(pick(params, 'cluster'))
      .then(data => {
        data.push(CUSTOM_TEMPLATE)
        setTemplist(data)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const getTemple = (type, parameters) => {
    setSelect(type)
    handleTemplateChange && handleTemplateChange(type, parameters)
  }

  return (
    <div className={styles.container}>
      <Loading spinning={loading}>
        <div className={styles.template}>
          {templist &&
            templist.map(data => (
              <Card
                key={data.type}
                isSelected={selected === data.type}
                {...data}
                getTemple={getTemple}
              />
            ))}
        </div>
      </Loading>
    </div>
  )
}

export default PipelineTemplate

const Card = ({
  type,
  image,
  title,
  desc,
  parameters,
  getTemple,
  isSelected,
}) => {
  const imgRef = useRef()

  const handleImg = () => {
    imgRef.current.src = '/assets/pipeline/custom.svg'
  }

  return (
    <div
      className={classnames(styles.card, {
        [styles.cardSelected]: isSelected,
      })}
      onClick={() => getTemple(type, parameters)}
    >
      <div className={classnames(styles.bg)}>
        <img src={image} ref={imgRef} onError={handleImg} />
      </div>
      <div className={styles.info}>
        <div className={styles.subtitle}>{title}</div>
        <p
          title={desc}
          className={styles.desc}
          style={{ '-webkit-box-orient': 'vertical' }}
        >
          {desc}
        </p>
      </div>
    </div>
  )
}
