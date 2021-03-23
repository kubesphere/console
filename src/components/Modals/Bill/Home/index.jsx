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

import { Card } from 'components/Base'
import { Icon, Button } from '@kube-design/components'
import cookie from 'utils/cookie'
import styles from './index.scss'

export default function Home({ handleSelected, cardConfigRule }) {
  const isZH = cookie('lang') === 'zh'

  const renderCard = () => {
    return (
      cardConfigRule &&
      cardConfigRule.map(item => (
        <Card key={item.type} title={<Icon name={item.icon} size={48} />}>
          {renderContnet(item)}
        </Card>
      ))
    )
  }

  const renderContnet = ({ subTitle, desc, infos, type }) => (
    <>
      <h3 className={styles.subTitle}>{t(subTitle)}</h3>
      <p className={styles.desc}>{t(desc)}</p>
      <ul className={styles.infos} style={{ minHeight: isZH ? '25%' : '32%' }}>
        {infos.map((info, index) => (
          <li key={index}>{t.html(info)}</li>
        ))}
      </ul>
      <Button type="control" onClick={() => handleSelected(type)}>
        {t('View Consumption')}
      </Button>
    </>
  )
  const renderNav = () => {
    return (
      <div className={styles.nav}>
        <Button icon="chevron-left" iconType="light" />
        <Button icon="chevron-right" iconType="light" />
        <span className={styles.message}>{t('Select View Type')}</span>
      </div>
    )
  }
  return (
    <div className={styles.billHome}>
      <div className={styles.billHome__container}>
        {renderNav()}
        <div className={styles.container}>{renderCard()}</div>
      </div>
    </div>
  )
}
