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
import { set } from 'lodash'
import { Select, Input, Icon } from '@pitrix/lego-ui'
import { Modal, Button, Form } from 'components/Base'
import ServiceStore from 'stores/service'
import { generateId } from 'utils'

import styles from './index.scss'

@inject('projectStore')
@observer
export default class NetworkPoliciesIpBlockModal extends React.Component {
  constructor(props) {
    super(props)
    this.projectStore = props.projectStore
    this.serviceStore = new ServiceStore()
    this.state = {
      specType: 'egress',
      specNameSpaces: [],
      specServices: [],
      specCurNameSpace: props.namespace,
      protocols: [
        { value: 'TCP', label: 'TCP' },
        { value: 'UDP', label: 'UDP' },
        { value: 'SCTP', label: 'SCTP' },
      ],
      cidr: { ip: { value: '' }, mask: { value: '' } },
      portRules: [
        {
          port: { value: '' },
          protocol: 'TCP',
        },
      ],
    }
  }

  setCIDR = o => {
    const { cidr } = this.state
    const cidrObj = { ...cidr, ...o }
    this.setState({ cidr: cidrObj })
  }

  addPortRule = () => {
    const { portRules } = this.state
    portRules.push({
      port: { value: '' },
      protocol: 'TCP',
    })
    this.setState(portRules)
  }

  delPortRule = idx => {
    const { portRules } = this.state
    if (portRules.length > 1) {
      portRules.splice(idx, 1)
      this.setState(portRules)
    }
  }

  modifyRule = (idx, o) => {
    const { portRules } = this.state
    const curPort = portRules[idx]
    portRules[idx] = { ...curPort, ...o }
    this.setState(portRules)
  }

  validFormData = () => {
    const { cidr, portRules } = this.state
    const { ip, mask } = cidr
    const ipReg = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/
    const numReg = /^[1-9][0-9]*$/
    cidr.ip.valid = ipReg.test(ip.value)
    cidr.mask.valid = numReg.test(mask.value)
    let validated = cidr.ip.valid && cidr.mask.valid

    portRules.forEach(rule => {
      rule.port.valid = numReg.test(rule.port.value)
      validated = rule.port.valid
    })
    this.setState({
      cidr,
      portRules,
    })

    return validated
  }

  handleSave = () => {
    const { specType, cidr, portRules } = this.state
    if (this.validFormData()) {
      const { formTemplate } = this.props
      const ports = portRules.map(rule => ({
        port: +rule.port.value,
        protocol: rule.protocol,
      }))
      const ipBlock = {
        ipBlock: {
          cidr: `${cidr.ip.value}/${cidr.mask.value}`,
        },
      }

      const direction = specType === 'egress' ? 'to' : 'from'
      set(formTemplate, `spec.${specType}[0].ports`, ports)
      set(formTemplate, `spec.${specType}[0].${direction}[0]`, ipBlock)
      set(formTemplate, 'metadata.name', `policy-${direction}-${generateId()}`)
      this.props.onOk(formTemplate)
    }
  }

  render() {
    const { ...rest } = this.props
    const { specType, protocols, portRules, cidr } = this.state

    return (
      <Modal.Form
        width={600}
        icon="add"
        title={t('Add Rule')}
        closable={true}
        {...rest}
        onOk={this.handleSave}
      >
        <Form.Item label={t('Direction')} desc={t('NETWORK_POLICY_D_DESC')}>
          <Select
            name="direction"
            defaultValue={specType}
            onChange={v => this.setState({ specType: v })}
            options={[
              { value: 'egress', label: t('NETWORK_POLICY_D_OP1') },
              { value: 'ingress', label: t('NETWORK_POLICY_D_OP2') },
            ]}
          />
        </Form.Item>
        <Form.Item
          label={t('CIDR:')}
          desc={t('将根据流量的方向以及~~~ 缺少描述')}
        >
          <div className={styles.cidr}>
            <Input
              name="cidr-ip"
              className={cidr.ip.valid === false ? styles.error : ''}
              defaultValue={cidr.ip.value}
              placeholder="eg: 10.0.0.0"
              onChange={(e, v) => this.setCIDR({ ip: { value: v } })}
            />
            <span>/</span>
            <Input
              name="cidr-mask"
              className={cidr.mask.valid === false ? styles.error : ''}
              defaultValue={cidr.mask.value}
              placeholder="24"
              onChange={(e, v) => this.setCIDR({ mask: { value: v } })}
            />
          </div>
        </Form.Item>
        <div className={styles.title}>{t('Port')}</div>
        {portRules.map(({ port, protocol }, idx) => (
          <div className={styles.rulerow} key={`${idx}`}>
            <div>
              <Select
                name="proto"
                value={protocol}
                options={protocols}
                onChange={v => this.modifyRule(idx, { protocol: v })}
              />
              <Form.Item>
                <Input
                  placeholder={`${t('Port')} eg: 80`}
                  className={port.valid === false ? styles.error : ''}
                  value={port.value}
                  onChange={v => this.modifyRule(idx, { port: { value: v } })}
                />
              </Form.Item>
            </div>
            <div>
              <Icon
                changeable
                clickable
                name="trash"
                onClick={() => {
                  this.delPortRule(idx)
                }}
              />
            </div>
          </div>
        ))}

        <div className={styles.addBtn}>
          <Button onClick={this.addPortRule}>{t('Add Rule')}</Button>
        </div>
      </Modal.Form>
    )
  }
}
