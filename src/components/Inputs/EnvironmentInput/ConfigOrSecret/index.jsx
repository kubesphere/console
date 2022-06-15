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

import React, { Component } from 'react'
import {
  Button,
  Alert,
  RadioGroup,
  RadioButton,
  Select,
  Icon,
  Checkbox,
} from '@kube-design/components'
import { cloneDeep } from 'lodash'
import classNames from 'classnames'
import styles from './index.scss'

export default class AddConfigOrSecret extends Component {
  state = {
    tab: 'configMaps',
    chooseAll: false,
    name: '',
    list: [],
  }

  get tabs() {
    return [
      {
        label: t('CONFIGMAP_PL'),
        value: 'configMaps',
      },
      {
        label: t('SECRET_PL'),
        value: 'secrets',
      },
    ]
  }

  get options() {
    const { configMaps, secrets } = this.props
    const { tab } = this.state

    return tab === 'configMaps'
      ? configMaps.map(config => ({
          label: config.name,
          value: config.name,
        }))
      : secrets.map(secret => ({
          label: secret.name,
          value: secret.name,
        }))
  }

  get style() {
    const { showModal, getParentPosition } = this.props
    const modalPosition = getParentPosition()
    return showModal
      ? {
          top: modalPosition.y,
          left: `calc(${modalPosition.x}px - 12px)`,
        }
      : {}
  }

  settingKeys = () => {
    const { configMaps, secrets } = this.props
    const { tab, name } = this.state
    let list = []

    if (name !== '') {
      const data =
        tab === 'configMaps'
          ? configMaps.find(config => config.name === name)
          : secrets.find(secret => secret.name === name)

      list = Object.keys(data.data || {}).map(key => ({
        label: key,
        value: key,
        checked: false,
      }))
    }
    this.setState({
      list,
    })
  }

  handleRadioChange = radio => {
    this.setState({
      tab: radio,
      name: '',
      list: [],
    })
  }

  handleAllChoose = () => {
    const { list, allChoose } = this.state
    const newList = cloneDeep(list)
    this.setState({
      allChoose: !allChoose,
      list: newList.map(item => ({ ...item, checked: !allChoose })),
    })
  }

  handleTypeChange = name => {
    this.setState(
      {
        name,
        list: [],
      },
      () => {
        this.settingKeys()
      }
    )
  }

  handleKeyChecked = position => {
    const { list } = this.state
    const newList = cloneDeep(list)
    newList[position].checked = !newList[position].checked
    this.setState({
      list: newList,
    })
  }

  handleCancel = () => {
    const { onCancel } = this.props
    this.setState(
      {
        name: '',
        list: [],
      },
      () => {
        onCancel()
      }
    )
  }

  handleOk = () => {
    const { onOK } = this.props
    const { tab, name, list } = this.state
    const keyType = tab === 'configMaps' ? 'configMapKeyRef' : 'secretKeyRef'
    const data = list
      .filter(item => item.checked)
      .map(item => ({
        name: item.value,
        valueFrom: {
          [keyType]: {
            name,
            key: item.value,
          },
        },
      }))
    onOK(data)
  }

  render() {
    const { className } = this.props
    const { tab, allChoose, name, list } = this.state

    return (
      <div
        className={classNames(className, styles.contentBox)}
        style={this.style}
      >
        <div className={styles.content}>
          <span className={styles.title}>{t('BATCH_REFERENCE')}</span>
          <Alert
            className={styles.tip}
            message={t('BATCH_REFERENCE_DESC')}
          ></Alert>

          <RadioGroup
            defaultValue={tab}
            buttonWidth={120}
            wrapClassName={styles.tabs}
            onChange={this.handleRadioChange}
          >
            {this.tabs.map(option => (
              <RadioButton key={option.value} value={option.value}>
                {option.label}
              </RadioButton>
            ))}
          </RadioGroup>

          <div className={styles.subTitle}>
            <span>{tab === 'configMaps' ? t('CONFIGMAP') : t('SECRET')}</span>
          </div>

          <Select
            className={styles.select}
            prefixIcon={<Icon name={tab === 'configMaps' ? 'hammer' : 'key'} />}
            options={this.options}
            onChange={this.handleTypeChange}
            value={name}
          />

          <div className={styles.subTitle}>
            <span>{t('KEY_PL')}</span>
            {list.length > 0 && (
              <span className={styles.allChoose} onClick={this.handleAllChoose}>
                {allChoose ? t('DESELECT_ALL') : t('SELECT_ALL')}
              </span>
            )}
          </div>

          <div className={styles.table}>
            <div
              className={classNames(styles.innerBox, {
                [styles.scroll]: list.length > 4,
              })}
            >
              {list.map((item, index) => (
                <Checkbox
                  className={classNames(styles.tableItem, {
                    [styles.checked]: item.checked,
                  })}
                  checked={item.checked}
                  onChange={() => this.handleKeyChecked(index)}
                >
                  {item.label}
                </Checkbox>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.options}>
          <Button onClick={this.handleCancel}>{t('CANCEL')}</Button>
          <Button type="control" onClick={this.handleOk}>
            {t('OK')}
          </Button>
        </div>
      </div>
    )
  }
}
