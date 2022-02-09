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
import { set, isEmpty } from 'lodash'
import {
  Button,
  Form,
  Select,
  Input,
  Icon,
  RadioGroup,
  RadioButton,
} from '@kube-design/components'
import { Modal } from 'components/Base'
import ServiceStore from 'stores/service'
import { generateId } from 'utils'
import { PATTERN_IP, PATTERN_IP_MASK } from 'utils/constants'

import styles from './index.scss'

@inject('projectStore')
@observer
export default class NetworkPoliciesIpBlockModal extends React.Component {
  constructor(props) {
    super(props)
    this.projectStore = props.projectStore
    this.serviceStore = new ServiceStore()
    this.state = {
      specType: '',
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

  validCIDR = evt => {
    const cidr = { ...this.state.cidr }
    const { ip, mask } = cidr

    if (!evt || ip.value !== '') {
      ip.valid = PATTERN_IP.test(ip.value)
    }
    if (!evt || mask.value !== '') {
      mask.valid = PATTERN_IP_MASK.test(mask.value)
    }
    this.setState({ cidr })
    return !!ip.valid && !!mask.valid
  }

  isValidPort = function(v) {
    return v !== '' && /^(?![0])(\d{0,5})$/.test(v) && v < 65536
  }

  validPort = () => {
    const portRules = this.state.portRules.slice()
    let validated = true
    portRules.forEach(rule => {
      rule.port.valid =
        isEmpty(rule.port.value) || this.isValidPort(rule.port.value)
      if (!rule.port.valid) {
        validated = false
      }
    })
    this.setState({ portRules })
    return validated
  }

  validSpecType = () => {
    const { specType } = this.state
    if (specType === '') {
      this.setState({ specType: false })
    }
    return specType !== ''
  }

  validFormData = () =>
    this.validSpecType() && this.validCIDR() && this.validPort()

  handleSave = () => {
    const { specType, cidr, portRules } = this.state
    if (this.validFormData()) {
      const { formTemplate } = this.props
      const ports = portRules
        .filter(rule => !isEmpty(rule.port.value))
        .map(rule => ({
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
    let portInvalid = false

    return (
      <Modal.Form
        width={600}
        icon="add"
        title={t('ADD_ALLOWLIST_ENTRY')}
        closable={true}
        {...rest}
        onOk={this.handleSave}
      >
        <Form.Item
          label={t('TRAFFIC_DIRECTION')}
          desc={
            specType ? (
              t('EXTERNAL_TRAFFIC_DIRECTION_DESC')
            ) : (
              <span className={styles.errColor}>
                {t('SELECT_RULE_DIRECTION_TIP')}
              </span>
            )
          }
        >
          <RadioGroup
            size="large"
            name="direction"
            defaultValue={specType}
            wrapClassName={styles.dirCheck}
            onChange={v => this.setState({ specType: v })}
          >
            <RadioButton value="egress">
              <Icon name="upload" size={32} />
              <div>{t('EGRESS')}</div>
            </RadioButton>
            <RadioButton value="ingress">
              <Icon name="download" size={32} />
              <div>{t('INGRESS')}</div>
            </RadioButton>
          </RadioGroup>
        </Form.Item>
        <Form.Item label={t('NETWORK_SEGMENT')}>
          <>
            <div className={styles.cidr}>
              <Input
                name="cidr-ip"
                className={cidr.ip.valid === false ? styles.error : ''}
                defaultValue={cidr.ip.value}
                placeholder={t('NETWORK_SEGMENT_EXAMPLE')}
                onChange={(e, v) => this.setCIDR({ ip: { value: v } })}
                onBlur={this.validCIDR}
              />
              <span>/</span>
              <Input
                name="cidr-mask"
                className={cidr.mask.valid === false ? styles.error : ''}
                defaultValue={cidr.mask.value}
                placeholder="24"
                onChange={(e, v) => this.setCIDR({ mask: { value: v } })}
                onBlur={this.validCIDR}
              />
            </div>
            <div
              className={
                styles[
                  cidr.ip.valid === false || cidr.mask.valid === false
                    ? 'errColor'
                    : 'cidr_desc'
                ]
              }
            >
              {cidr.ip.valid === false || cidr.mask.valid === false
                ? t('ENTER_VALID_SEGMENT_DESC')
                : t('NETWORK_SEGMENT_DESC')}
            </div>
          </>
        </Form.Item>
        <div className={styles.title}>{t('PORT_PL')}</div>
        {portRules.map(({ port, protocol }, idx) => {
          if (port.valid === false) {
            portInvalid = true
          }
          return (
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
                    placeholder={t('PORT_EXAMPLE')}
                    className={port.valid === false ? styles.error : ''}
                    value={port.value}
                    onBlur={this.validPort}
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
          )
        })}

        <div className={styles.addBtn}>
          <Button onClick={this.addPortRule}>{t('ADD')}</Button>
        </div>
        {portInvalid && (
          <div className={styles.errColor}>
            {t('ENTER_VALID_PORT_NUMBER_DESC')}
          </div>
        )}
      </Modal.Form>
    )
  }
}
