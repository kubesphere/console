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
import classNames from 'classnames'
import { Modal, Form, Panel } from 'components/Base'
import ServiceStore from 'stores/service'
import { generateId } from 'utils'

import {
  RadioGroup,
  RadioButton,
  Select,
  List,
  Checkbox,
} from '@pitrix/lego-ui'
import styles from './index.scss'

@inject('projectStore')
@observer
export default class NetworkPoliciesModal extends React.Component {
  constructor(props) {
    super(props)
    this.projectStore = props.projectStore
    this.serviceStore = new ServiceStore()
    this.state = {
      tabName: 'projects',
      specType: 'egress',
      specNameSpaces: [],
      specServices: [],
      specCurNameSpace: props.namespace,
    }
  }

  componentDidMount() {
    const { namespace, cluster } = this.props
    const params = {
      cluster,
      limit: -1,
    }
    this.projectStore.fetchList({
      ...params,
    })
    this.serviceStore.fetchList({
      namespace,
      ...params,
    })
  }

  handleTabChange = tabName => {
    this.setState({
      tabName,
    })
  }

  handleNameSpaceChange = ns => {
    const { cluster } = this.props
    this.setState({
      specCurNameSpace: ns,
    })
    this.serviceStore.fetchList({
      namespace: ns,
      cluster,
      limit: -1,
    })
  }

  handleNameSpaceChecked = (item, checked) => {
    const { specNameSpaces } = this.state
    const hasIt = specNameSpaces.filter(ns => ns.name === item.name).length > 0
    if (checked && !hasIt) {
      specNameSpaces.push({ name: item.name })
      this.setState({
        specNameSpaces,
      })
    } else if (!checked && hasIt) {
      this.setState({
        specNameSpaces: specNameSpaces.filter(el => el.name !== item.name),
      })
    }
  }

  handleServiceChange = (item, checked) => {
    const { specServices, specCurNameSpace } = this.state
    const hasIt =
      specServices.filter(
        ns => ns.name === item.name && ns.namespace === specCurNameSpace
      ).length > 0

    if (checked && !hasIt) {
      specServices.push({
        name: item.name,
        namespace: specCurNameSpace,
      })
      this.setState({
        specServices,
      })
    } else if (!checked && hasIt) {
      this.setState({
        specServices: specServices.filter(
          el => !(el.name === item.name && el.namespace === specCurNameSpace)
        ),
      })
    }
  }

  handleSave = () => {
    const { specType, specNameSpaces, specServices } = this.state
    const { formTemplate } = this.props
    const rules = specNameSpaces
      .map(ns => ({ namespace: ns }))
      .concat(specServices.map(s => ({ service: s })))
    if (rules.length) {
      const direction = specType === 'egress' ? 'to' : 'from'
      set(formTemplate, `spec.${specType}[0].${direction}`, rules)
      set(formTemplate, 'metadata.name', `policy-${direction}-${generateId()}`)
    }
    this.props.onOk(formTemplate)
  }

  render() {
    const projectList = this.projectStore.list
    const serviceList = this.serviceStore.list
    const { ...rest } = this.props
    const { tabName, specType, specServices, specCurNameSpace } = this.state

    return (
      <Modal.Form
        width={600}
        icon="add"
        title={t('Add Allowlist')}
        closable={true}
        {...rest}
        onOk={this.handleSave}
      >
        <Form.Item label={t('Direction')} desc={t('NETWORK_POLICY_D_DESC')}>
          <Select
            defaultValue={specType}
            onChange={v => this.setState({ specType: v })}
            options={[
              { value: 'egress', label: t('NETWORK_POLICY_D_OP1') },
              { value: 'ingress', label: t('NETWORK_POLICY_D_OP2') },
            ]}
          />
        </Form.Item>

        <Form.Item label={`${t('Type')}:`}>
          <RadioGroup
            name="type"
            wrapClassName="radio-default"
            buttonWidth={155}
            defaultValue={tabName}
            onChange={this.handleTabChange}
            size="small"
          >
            <RadioButton value="projects">{t('Project')}</RadioButton>
            <RadioButton value="services">{t('Service')}</RadioButton>
          </RadioGroup>
        </Form.Item>
        <Panel
          className={classNames(
            tabName === 'projects' ? 'block' : 'hide',
            styles.panel_p
          )}
        >
          <List
            className={styles.list}
            itemRenderer={item => (
              <Checkbox
                value={item.name}
                onChange={(e, checked) => {
                  this.handleNameSpaceChecked(item, checked)
                }}
              >
                {item.name}
              </Checkbox>
            )}
            items={projectList.data.map(item => item)}
          />
        </Panel>
        <Panel
          className={classNames(
            tabName === 'services' ? 'block' : 'hide',
            styles.panel_s
          )}
        >
          <div className={styles.sheader}>
            <Select
              value={specCurNameSpace}
              onChange={this.handleNameSpaceChange}
              options={projectList.data.map(p => ({
                value: p.name,
                label: p.name,
              }))}
            />
          </div>
          <div className={styles.sbody}>
            <List
              className={styles.list}
              itemRenderer={item => (
                <Checkbox
                  value={item.name}
                  checked={
                    specServices.filter(
                      el =>
                        el.name === item.name &&
                        el.namespace === specCurNameSpace
                    ).length > 0
                  }
                  onChange={(e, checked) => {
                    this.handleServiceChange(item, checked)
                  }}
                >
                  {item.name}
                </Checkbox>
              )}
              items={serviceList.data.map(item => item)}
            />
          </div>
        </Panel>
      </Modal.Form>
    )
  }
}
