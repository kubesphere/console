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
import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx'
import { get, isEmpty } from 'lodash'
import classNames from 'classnames'
import { Icon } from '@pitrix/lego-ui'

import { Button } from 'components/Base'
import { trigger } from 'utils/action'
import NetWorkStore from 'stores/network'
import styles from './index.scss'

@inject('rootStore')
@inject('projectStore')
@trigger
@observer
export default class RuleInfo extends React.Component {
  constructor(props) {
    super(props)
    this.store = new NetWorkStore(props.module)
    this.state = {
      curTab: 'inner',
    }
  }

  componentDidMount() {
    this.fetchPolicies()
  }
  renderTabs() {
    const { curTab } = this.state
    return (
      <div className={styles.tabs}>
        <div
          className={classNames(styles.tab, curTab === 'inner' && styles.on)}
          onClick={() =>
            this.setState({
              curTab: 'inner',
            })
          }
        >
          <Icon name="eip-pool" size={40} />
          <div className={styles.disc}>
            <div className={styles.dictitle}>
              {t('NETWORK_POLICY_R1_TITLE')}
            </div>
            <div>{t('NETWORK_POLICY_R1_DESC')}</div>
          </div>
        </div>
        <div
          className={classNames(styles.tab, curTab === 'outer' && styles.on)}
          onClick={() =>
            this.setState({
              curTab: 'outer',
            })
          }
        >
          <Icon name="eip" size={40} />
          <div className={styles.disc}>
            <div className={styles.dictitle}>
              {t('NETWORK_POLICY_R2_TITLE')}
            </div>
            <div>{t('NETWORK_POLICY_R2_DESC')}</div>
          </div>
        </div>
      </div>
    )
  }

  fetchPolicies = () => {
    const { cluster, namespace, workspace } = this.props

    this.store.fetchListByK8s({
      cluster,
      namespace,
      workspace,
      limit: -1,
    })
  }

  addWhiteList = () => {
    this.trigger('network.policies.add', {
      ...this.props,
      success: this.fetchPolicies,
    })
  }

  addIpBlock = () => {
    this.trigger('network.policies.addIpBlock', {
      ...this.props,
      success: this.fetchPolicies,
    })
  }

  handleDelete = ruleName => {
    this.trigger('network.policies.delete', {
      ...this.props,
      ruleName,
      success: this.fetchPolicies,
    })
  }

  renderRules = (list, direction) => (
    <>
      {list.map(item => (
        <div key={get(item, 'metadata.name')} className={styles.row}>
          <div className={styles.prow}>
            {get(
              item,
              `spec.${direction}[0].${direction === 'egress' ? 'to' : 'from'}`,
              []
            ).map(node => {
              const iconCls = get(node, 'namespace.name')
                ? 'project'
                : 'appcenter'
              const showName =
                iconCls === 'project'
                  ? get(node, 'namespace.name')
                  : get(node, 'service.name')
              return (
                <span className={styles.cell} key={showName}>
                  <Icon name={iconCls} />
                  {showName}
                </span>
              )
            })}
          </div>
          <Icon
            name="trash"
            changeable
            onClick={() => {
              this.handleDelete(get(item, 'metadata.name'))
            }}
          />
        </div>
      ))}
    </>
  )

  renderIpRules = (list, direction) => (
    <>
      {list.map(item => (
        <div key={get(item, 'metadata.name')} className={styles.row}>
          <div className={styles.prow}>
            <span className={styles.cell}>
              <Icon name="eip" />
              {get(
                item,
                `spec.${direction}[0].${
                  direction === 'egress' ? 'to' : 'from'
                }[0].ipBlock.cidr`
              )}
            </span>
            <Icon name="port" />
            {get(item, `spec.${direction}[0].ports`, []).map(rule => {
              const showName = `${rule.port}/${rule.protocol}`
              return (
                <span className={styles.port} key={showName}>
                  {showName}
                </span>
              )
            })}
          </div>
          <Icon
            name="trash"
            changeable
            onClick={() => {
              this.handleDelete(get(item, 'metadata.name'))
            }}
          />
        </div>
      ))}
    </>
  )

  renderInner() {
    const { list } = this.store
    const { curTab } = this.state
    const innerEgressData = []
    const innerIngressData = []
    const outerEgressData = []
    const outerIngressData = []

    list.data.forEach(data => {
      const item = get(toJS(data), '_originData')
      if (isEmpty(get(item, 'spec.egress[0].ports'))) {
        if (!isEmpty(get(item, 'spec.egress[0].to'))) {
          innerEgressData.push(item)
        }
      } else {
        outerEgressData.push(item)
      }

      if (isEmpty(get(item, 'spec.ingress[0].ports'))) {
        if (!isEmpty(get(item, 'spec.ingress[0].from'))) {
          innerIngressData.push(item)
        }
      } else {
        outerIngressData.push(item)
      }
    })

    return (
      <>
        <div className={classNames({ hide: curTab === 'outer' })}>
          <div className={styles.rulemenu}>
            <div>{t('NETWORK_POLICY_R1_DESC1')}</div>
            <Button onClick={this.addWhiteList} className={styles.addBtn}>
              {t('Add WhiteList')}
            </Button>
          </div>
          <div className={styles.rulebody}>
            <div
              className={classNames(styles.rulegroup, {
                hide: innerEgressData.length === 0,
              })}
            >
              <div className={styles.subtitle}>{t('Egress')}:</div>
              <div className={styles.disp}>{t('NETWORK_POLICY_R_DESC1')}</div>
              {this.renderRules(innerEgressData, 'egress')}
            </div>
            <div
              className={classNames(styles.rulegroup, {
                hide: innerIngressData.length === 0,
              })}
            >
              <div className={styles.subtitle}>{t('Ingress')}:</div>
              <div className={styles.disp}>{t('NETWORK_POLICY_R_DESC2')}</div>
              {this.renderRules(innerIngressData, 'ingress')}
            </div>
          </div>
        </div>
        <div className={classNames({ hide: curTab === 'inner' })}>
          <div className={styles.rulemenu}>
            <div>{t('NETWORK_POLICY_R2_DESC1')}</div>
            <Button onClick={this.addIpBlock} className={styles.addBtn}>
              {t('Add Rule')}
            </Button>
          </div>
          <div className={styles.rulebody}>
            <div
              className={classNames(styles.rulegroup, {
                hide: outerEgressData.length === 0,
              })}
            >
              <div className={styles.subtitle}>{t('Egress')}:</div>
              <div className={styles.disp}>{t('NETWORK_POLICY_R_DESC1')}</div>
              {this.renderIpRules(outerEgressData, 'egress')}
            </div>
            <div
              className={classNames(styles.rulegroup, {
                hide: outerIngressData.length === 0,
              })}
            >
              <div className={styles.subtitle}>{t('Ingress')}:</div>
              <div className={styles.disp}>{t('NETWORK_POLICY_R_DESC2')}</div>
              {this.renderIpRules(outerIngressData, 'ingress')}
            </div>
          </div>
        </div>
      </>
    )
  }
  render() {
    return (
      <div className={styles.wrapper}>
        {this.renderTabs()}
        {this.renderInner()}
      </div>
    )
  }
}
