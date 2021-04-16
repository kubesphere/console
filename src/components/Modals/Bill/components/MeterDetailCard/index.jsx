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
import { get, isEmpty, isUndefined } from 'lodash'

import styles from './index.scss'
import { METER_RESOURCE_TITLE } from '../../constats'

const MeterDetailCard = ({
  className,
  title,
  isParent,
  priceConfig,
  ...meterData
} = {}) => {
  const priceUnit =
    !isEmpty(priceConfig) && priceConfig.currency === 'CNY' ? t('￥') : t('$')

  const handleSumFeeData = () => {
    const feeData = meterData.feeData
    let total = 0

    if (!isUndefined(feeData) && !isEmpty(feeData)) {
      total =
        Object.keys(feeData)
          .map(key => parseFloat(get(feeData[key], 'value', 0)) * 100)
          .reduce((pev, current) => {
            return pev + current
          }) / 100
    }

    return total.toFixed(2)
  }

  const handleFixed = value => {
    const result = handleValue(value)
    return result !== '-' ? result.toFixed(3) : result
  }

  const handleValue = value => {
    return isUndefined(value) ? '-' : value < 0 ? 0 : value
  }

  const renderList = (data, type) => {
    if (isEmpty(data)) {
      return null
    }

    return type === 'price' && isEmpty(priceConfig) ? (
      <ul className={styles.noPriceTip}>
        <li>{t('PRICE_CONFIG_DESC')}</li>
      </ul>
    ) : (
      <ul>
        {Object.keys(data).map(key => {
          const dataValue = get(data[key], 'value')
          const value =
            type === 'meter' ? handleFixed(dataValue) : handleValue(dataValue)

          if (data[key]) {
            return (
              <li key={key}>
                <div>{value}</div>
                <p>
                  <span>
                    {t(METER_RESOURCE_TITLE[key])} {t('Consumption')}
                  </span>
                  <span>({get(data[key], 'unit.label', '-')})</span>
                </p>
              </li>
            )
          }
          return null
        })}
      </ul>
    )
  }

  const renderCurrentTotal = _title => {
    const feeTotal = handleSumFeeData()

    return (
      <div>
        <h3>
          {_title} {t('Total Consumption By Creation')}
        </h3>
        {isEmpty(priceConfig) ? null : (
          <div className={styles.totalPrice}>
            <h4>{feeTotal}</h4>
            <p>{t('TOTAL_COST', { unit: priceUnit })}</p>
          </div>
        )}
      </div>
    )
  }

  const renderParentTotal = _title => {
    const feeTotal = handleSumFeeData()

    return (
      <div className={styles.parentCostContainer}>
        <div>
          <h3>{_title}</h3>
          <span> {t('Total Consumption By Creation')}</span>
        </div>
        <p>
          <span>{priceUnit}</span>
          {feeTotal}
        </p>
      </div>
    )
  }

  const { sumData = {}, feeData = {} } = meterData

  if (isParent) {
    return (
      <div className={classnames(styles.billTotal, className)}>
        {renderParentTotal(title)}
      </div>
    )
  }

  return (
    <div className={classnames(styles.billTotal, className)}>
      {renderCurrentTotal(title)}
      <div className={styles.consumContainer}>
        {isEmpty(sumData) && isEmpty(feeData) ? null : (
          <>
            {renderList(sumData, 'meter')}
            <div className={styles.line}></div>
            {renderList(feeData, 'price')}
          </>
        )}
      </div>
    </div>
  )
}

export default MeterDetailCard
