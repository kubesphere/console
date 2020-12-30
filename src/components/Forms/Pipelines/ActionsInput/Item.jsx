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
import PropTypes from 'prop-types'
import { get, debounce, set } from 'lodash'
import { Button, Form, Columns, Column, Select } from '@kube-design/components'

import styles from './index.scss'

export default class Item extends React.Component {
  static propTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func,
    onDelete: PropTypes.func,
  }

  static defaultProps = {
    value: {},
    onChange() {},
    onDelete() {},
  }

  triggerChange = debounce(value => {
    this.props.onChange(value)
  }, 500)

  handleChange = name => value => {
    const key = name.split('.')
    if (key.length > 1) {
      let _value = get(this.props.value, key[0])
      if (!_value) {
        _value = { [key[1]]: value }
      } else {
        set(_value, key[1], value)
      }
      this.triggerChange({
        ...this.props.value,
        [key[0]]: _value,
      })
      return
    }
    this.triggerChange({
      ...this.props.value,
      [name]: value,
    })
  }

  renderFormItems(type) {
    let content = null

    switch (type) {
      case 'discover_branches':
        content = this.renderBranchesFormItems()
        break
      case 'discover_pr_from_origin':
        content = this.renderPrOriginFormItems()
        break
      case 'discover_pr_from_forks':
        content = this.renderPrForkFormItems()
        break
      default:
        content = this.renderTagBranchesFormItems()
        break
    }

    return content
  }

  renderTagBranchesFormItems() {
    const { value } = this.props

    return (
      <div>
        <Form.Item label={t('Strategy')}>
          <Select
            name="discover_tags"
            defaultValue={value.discover_tags}
            onChange={this.handleChange('discover_tags')}
            options={[
              {
                label: t('Enable Discover Tag Branches'),
                value: true,
              },
              {
                label: t('Disable Discover Tag Branches'),
                value: false,
              },
            ]}
          />
        </Form.Item>
      </div>
    )
  }

  renderBranchesFormItems() {
    const { value } = this.props
    return (
      <div>
        <Form.Item label={t('Strategy')}>
          <Select
            name="discover_branches"
            defaultValue={value.discover_branches}
            onChange={this.handleChange('discover_branches')}
            options={[
              {
                label: t('Exclude branches that are also filed as PRs'),
                value: 1,
              },
              {
                label: t('Only branches that are also filed as PRs'),
                value: 2,
              },
              { label: t('All branches'), value: 3 },
            ]}
          />
        </Form.Item>
      </div>
    )
  }

  renderPrOriginFormItems() {
    const { value } = this.props
    return (
      <div>
        <Form.Item label={t('Pull Strategy')}>
          <Select
            name="discover_pr_from_origin"
            defaultValue={value.discover_pr_from_origin}
            onChange={this.handleChange('discover_pr_from_origin')}
            options={[
              {
                label: t('OPTIONS_PR_PARAMS_1'),
                value: 1,
              },
              {
                label: t('OPTIONS_PR_PARAMS_2'),
                value: 2,
              },
              {
                label: t('OPTIONS_PR_PARAMS_3'),
                value: 3,
              },
            ]}
          />
        </Form.Item>
      </div>
    )
  }

  renderPrForkFormItems() {
    const { value } = this.props

    return (
      <div>
        <Columns>
          <Column>
            <Form.Item label={t('Pull Strategy')}>
              <Select
                name="discover_pr_from_forks.strategy"
                defaultValue={
                  value.discover_pr_from_forks &&
                  value.discover_pr_from_forks.strategy
                }
                onChange={this.handleChange('discover_pr_from_forks.strategy')}
                options={[
                  {
                    label: t('OPTIONS_PR_PARAMS_1'),
                    value: 1,
                  },
                  {
                    label: t('OPTIONS_PR_PARAMS_2'),
                    value: 2,
                  },
                  {
                    label: t('OPTIONS_PR_PARAMS_3'),
                    value: 3,
                  },
                ]}
              />
            </Form.Item>
          </Column>
          <Column>
            <Form.Item label={t('Trusted User')}>
              <Select
                name="discover_pr_from_forks.trust"
                defaultValue={
                  value.discover_pr_from_forks &&
                  value.discover_pr_from_forks.trust
                }
                onChange={this.handleChange('discover_pr_from_forks.trust')}
                options={[
                  {
                    label: t('Contributors'),
                    value: 1,
                  },
                  {
                    label: t('Everyone'),
                    value: 2,
                  },
                  {
                    label: t('From users with Admin or Write permission'),
                    value: 3,
                  },
                  {
                    label: t('Nobody'),
                    value: 4,
                  },
                ]}
              />
            </Form.Item>
          </Column>
        </Columns>
      </div>
    )
  }

  render() {
    const { value, onDelete, menuData } = this.props
    const type = Object.keys(value)[0]

    return (
      <div className={styles.itemWrapper}>
        <div className={styles.itemTitle}>
          <p>
            <strong>{t(menuData[type])}</strong>
          </p>
          <Button
            className={styles.delete}
            type="flat"
            icon="trash"
            onClick={onDelete}
          />
        </div>
        {type && this.renderFormItems(type)}
      </div>
    )
  }
}
