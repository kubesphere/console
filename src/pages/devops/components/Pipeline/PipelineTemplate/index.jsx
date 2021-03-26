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
import cookie from 'utils/cookie'

import { Loading } from '@kube-design/components'
import styles from './index.scss'
import { TEMPLATE_CONFIG } from './templePipeline'

const PipelineTemplate = ({ setJsonData, templateLoading }) => {
  const lang = cookie('lang') === 'zh' ? 'zh' : 'en'

  const CARD_CONFIG = [
    {
      type: 'ci',
      image: `/assets/pipeline/ci-temple-${lang}.svg`,
      title: t('CI'),
      desc: t('CI_DESC'),
    },
    {
      type: 'cicd',
      image: `/assets/pipeline/cicd-temple-${lang}.svg`,
      title: t('CICD'),
      desc: t('CICD_DESC'),
    },
    {
      type: 'custom',
      image: '/assets/pipeline/pipeline-icon.svg',
      title: t('CUSTOM_PIPELIEN'),
      desc: t('CUSTOM_PIPELIEN_DESC'),
    },
  ]

  const getTemple = type => {
    setJsonData(type, TEMPLATE_CONFIG[type])
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{t('Choose a Pipeline Template')}</h3>
      <Loading spinning={templateLoading}>
        <div className={styles.template}>
          {CARD_CONFIG.map(data => (
            <Card key={data.type} {...data} getTemple={getTemple} />
          ))}
        </div>
      </Loading>
    </div>
  )
}
export default PipelineTemplate

const Card = ({ type, image, title, desc, getTemple }) => {
  return (
    <div className={styles.card} onClick={() => getTemple(type)}>
      <div
        className={classnames(styles.bg, {
          [styles.customIcon]: type === 'custom',
        })}
      >
        <img src={image} />
      </div>
      <div className={styles.info}>
        <h4 className={styles.subTitle}>{title}</h4>
        <p title={desc} className={styles.desc}>
          {desc}
        </p>
      </div>
    </div>
  )
}
