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
import {
  isEmpty,
  set,
  intersectionBy,
  unionBy,
  remove,
  debounce,
  get,
} from 'lodash'

import { cacheFunc } from 'utils'

import { Alert } from '@kube-design/components'
import { Modal } from 'components/Base'
import TaintInput from './TaintInput'

import styles from './index.scss'

export default class TaintManagementModal extends React.Component {
  static propTypes = {
    visible: PropTypes.bool,
    nodes: PropTypes.array,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
  }

  static defaultProps = {
    visible: false,
    nodes: [],
    onOk() {},
    onCancel() {},
  }

  constructor(props) {
    super(props)

    this.state = {
      nodes: props.nodes,
      commonTaints: this.getCommonTaints(props),
    }
  }

  get commonTaintsKeys() {
    const { commonTaints } = this.state
    return commonTaints.map(taint => taint.key)
  }

  componentDidUpdate(prevProps) {
    if (this.props.visible !== prevProps.visible) {
      this.setState({
        nodes: this.props.nodes,
        commonTaints: this.getCommonTaints(this.props),
      })
    }
  }

  getTaints = node => node.taints || [{}]

  getCommonTaints = props => {
    const { nodes } = props

    if (isEmpty(nodes) || nodes.length === 1) {
      return [{}]
    }

    const result = nodes.reduce((prev, cur) => ({
      taints: intersectionBy(this.getTaints(prev), this.getTaints(cur), 'key'),
    }))

    return isEmpty(result.taints) ? [{}] : this.getTaints(result)
  }

  getDifferentTaints = node => {
    const taints = this.getTaints(node)
    const result = taints.filter(
      taint =>
        (isEmpty(taint.key) && isEmpty(taint.value)) ||
        !this.commonTaintsKeys.includes(taint.key)
    )

    return isEmpty(result) ? [{}] : result
  }

  handleSubmit = () => {
    const { nodes, commonTaints } = this.state

    const result = nodes.map(node => {
      const taints = this.getTaints(node)
      set(
        node,
        'taints',
        [...taints, ...commonTaints].filter(taint => taint.key)
      )

      return node
    })

    let isSubmit = true

    result.forEach(node => {
      const nodeTains = get(node, 'taints', [])
      const isSomeTains = {}
      nodeTains.forEach(item => {
        if (isSomeTains[item.key]) {
          isSubmit = false
        } else {
          isSomeTains[item.key] = 1
        }
      })
    })

    if (isSubmit) {
      this.props.onOk(result)
    }
  }

  handleChangeAll = debounce((values, deleteValue = {}) => {
    this.setState(({ nodes }) => {
      const _nodes = [...nodes]

      _nodes.forEach(node => {
        const taints = this.getTaints(node)

        if (deleteValue.key) {
          remove(taints, taint => taint.key === deleteValue.key)
        }

        remove(taints, taint => this.commonTaintsKeys.includes(taint.key))
      })

      return {
        nodes: _nodes,
        commonTaints: isEmpty(values) ? [{}] : values,
      }
    })
  }, 100)

  handleChange = (node, index) =>
    cacheFunc(
      `_change_${index}`,
      taints => {
        this.setState(({ nodes }) => {
          const _nodes = [...nodes]
          set(_nodes, `[${index}].taints`, taints)

          return {
            nodes: _nodes,
          }
        })
      },
      this
    )

  handleSelect = index =>
    cacheFunc(
      `_select_${index}`,
      value => {
        if (value.key) {
          this.setState(({ nodes, commonTaints }) => {
            nodes.forEach(node => {
              const taints = node.taints || []
              node.taints = unionBy(taints, [value], 'key').filter(
                taint => taint.key
              )
            })

            commonTaints.push(value)

            return {
              nodes,
              commonTaints: commonTaints.filter(taint => taint.key),
            }
          })
        }
      },
      this
    )

  renderCommonTaints() {
    const { nodes, commonTaints } = this.state

    if (isEmpty(nodes) || nodes.length === 1) {
      return null
    }

    return (
      <div className={styles.node}>
        <div className={styles.subTitle}>{t('Common Taints')}</div>
        <TaintInput value={commonTaints} onChange={this.handleChangeAll} />
      </div>
    )
  }

  renderNodeTaints() {
    const { nodes, commonTaints } = this.state

    const noCommonTaints = isEmpty(nodes) || nodes.length === 1

    return nodes.map((node, index) => {
      const taints = this.getDifferentTaints(node)

      return (
        <div key={node.name} className={styles.node}>
          <div className={styles.subTitle}>{`${t('Node')}: ${node.name}`}</div>
          <TaintInput
            common={commonTaints}
            value={taints}
            onSelect={noCommonTaints ? null : this.handleSelect(index)}
            onChange={this.handleChange(node, index)}
          />
        </div>
      )
    })
  }

  render() {
    const { detail, onOk, ...rest } = this.props

    return (
      <Modal.Form
        width={1162}
        bodyClassName={styles.body}
        title={t('Taint Management')}
        icon="wrench"
        okText={t('Save')}
        onOk={this.handleSubmit}
        {...rest}
      >
        <div className={styles.wrapper}>
          <div className={styles.title}>{t('Taint')}</div>
          <Alert type="info" message={t('TAINTS_MSG')} />
          <div className={styles.content}>
            {this.renderCommonTaints()}
            {this.renderNodeTaints()}
          </div>
        </div>
      </Modal.Form>
    )
  }
}
