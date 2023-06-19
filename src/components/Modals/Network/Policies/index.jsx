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

import {
  Checkbox,
  Form,
  Icon,
  RadioButton,
  RadioGroup,
  Tooltip,
} from '@kube-design/components'
import classNames from 'classnames'
import { Modal, Panel } from 'components/Base'
import { set } from 'lodash'
import { observable, toJS } from 'mobx'
import { inject, observer } from 'mobx-react'
import React from 'react'
import ServiceStore from 'stores/service'
import { generateId, showNameAndAlias } from 'utils'
import { ProjectSelect } from '../../../Inputs'

import styles from './index.scss'

@inject('projectStore')
@observer
export default class NetworkPoliciesModal extends React.Component {
  @observable tabName = 'projects'

  @observable specType = ''

  @observable specNameSpaces = []

  @observable specCurNameSpace = ''

  @observable specServices = []

  constructor(props) {
    super(props)
    this.projectStore = props.projectStore
    this.serviceStore = new ServiceStore()
    this.specCurNameSpace = props.namespace
    this.psRef = React.createRef()
  }

  componentDidMount() {
    const { namespace, cluster } = this.props
    const params = {
      cluster,
      limit: -1,
    }

    this.projectStore.fetchList({
      ...params,
      labelSelector: this.ProjectLabelSelector,
    })

    this.serviceStore.fetchList({
      namespace,
      ...params,
    })
  }

  get ProjectLabelSelector() {
    const { workspace } = this.props
    return `!kubesphere.io/kubefed-host-namespace,!kubesphere.io/devopsproject,kubesphere.io/workspace=${workspace}`
  }

  handleTabChange = tabName => {
    this.tabName = tabName
    this.specNameSpaces = []
    this.specCurNameSpace = this.props.namespace
    this.specServices = []
  }

  handleNameSpaceChange = ns => {
    const { cluster } = this.props
    this.specCurNameSpace = ns
    this.serviceStore.fetchList({
      namespace: ns,
      cluster,
      limit: -1,
    })
  }

  handleNameSpaceChecked = (item, checked) => {
    const { specNameSpaces, tabName } = this
    const hasIt = specNameSpaces.filter(ns => ns.name === item.name).length > 0
    if (checked && !hasIt) {
      specNameSpaces.push({ name: item.name })
      this.specNameSpaces = toJS(specNameSpaces)
    } else if (!checked && hasIt) {
      this.specNameSpaces = specNameSpaces.filter(el => el.name !== item.name)
    }

    this.psRef.current.handleValueChange('type', null, tabName)
  }

  handleServiceChange = (item, checked) => {
    const { specCurNameSpace, specServices, tabName } = this
    const hasIt =
      specServices.filter(
        ns => ns.name === item.name && ns.namespace === specCurNameSpace
      ).length > 0

    if (checked && !hasIt) {
      specServices.push({
        name: item.name,
        namespace: specCurNameSpace,
      })
      this.specServices = toJS(specServices)
    } else if (!checked && hasIt) {
      this.specServices = specServices.filter(
        el => !(el.name === item.name && el.namespace === specCurNameSpace)
      )
    }
    this.psRef.current.handleValueChange('type', null, tabName)
  }

  handleSave = () => {
    const { tabName, specType, specNameSpaces, specServices } = this
    const { formTemplate } = this.props
    const rules =
      tabName === 'projects'
        ? specNameSpaces.map(ns => ({ namespace: ns }))
        : specServices.map(s => ({ service: s }))
    if (rules.length) {
      const direction = specType === 'egress' ? 'to' : 'from'
      set(formTemplate, `spec.${specType}[0].${direction}`, rules)
      set(formTemplate, 'metadata.name', `policy-${direction}-${generateId()}`)
    }
    this.props.onOk(formTemplate)
  }

  psValidator = (rule, value, callback) => {
    const { tabName, specNameSpaces, specServices } = this
    const rules =
      tabName === 'projects'
        ? specNameSpaces.map(ns => ({ namespace: ns }))
        : specServices.map(s => ({ service: s }))
    if (rules.length === 0) {
      callback({
        message: t('EMPTY_RESOURCE_DESC'),
      })
    } else {
      callback()
    }
  }

  render() {
    const projectList = this.projectStore.list
    const serviceList = this.serviceStore.list
    const { ...rest } = this.props
    const {
      specNameSpaces,
      specType,
      tabName,
      specCurNameSpace,
      specServices,
    } = this
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
          desc={t('INTERNAL_TRAFFIC_DIRECTION_DESC')}
          rules={[{ required: true, message: t('SELECT_RULE_DIRECTION_TIP') }]}
        >
          <RadioGroup
            name="direction"
            defaultValue={specType}
            wrapClassName={styles.dirCheck}
            onChange={v => {
              this.specType = v
            }}
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
        <Form.Item
          label={t('TYPE')}
          rules={[{ validator: this.psValidator }]}
          ref={this.psRef}
        >
          <RadioGroup
            name="type"
            mode="button"
            buttonWidth={155}
            defaultValue={tabName}
            onChange={this.handleTabChange}
            size="small"
            rules={[{ required: true }]}
          >
            <RadioButton value="projects">{t('PROJECT')}</RadioButton>
            <RadioButton value="services">{t('SERVICE')}</RadioButton>
          </RadioGroup>
        </Form.Item>
        <Panel
          className={classNames(
            tabName === 'projects' ? 'block' : 'hide',
            styles.panel_p
          )}
        >
          <ul className={styles.list}>
            {projectList.data.map(item => (
              <li key={item.name}>
                <Checkbox
                  value={item.name}
                  checked={
                    specNameSpaces.filter(ns => ns.name === item.name).length >
                    0
                  }
                  disabled={item.isFedManaged}
                  onChange={checked => {
                    this.handleNameSpaceChecked(item, checked)
                  }}
                >
                  {showNameAndAlias(item)}
                </Checkbox>
                {item.isFedManaged && (
                  <Tooltip content={t('FED_HOST_NAMESPACE_TIP')}>
                    <Icon className={styles.tip} name="question" />
                  </Tooltip>
                )}
              </li>
            ))}
          </ul>
        </Panel>
        <Panel
          className={classNames(
            tabName === 'services' ? 'block' : 'hide',
            styles.panel_s
          )}
        >
          <div className={styles.sheader}>
            <ProjectSelect
              cluster={this.props.cluster}
              defaultValue={specCurNameSpace}
              onChange={this.handleNameSpaceChange}
              tipMessage={t('FED_HOST_NAMESPACE_TIP')}
              labelSelector={this.ProjectLabelSelector}
            />
          </div>
          <div className={styles.sbody}>
            <ul className={styles.list}>
              {serviceList.data.map(item => (
                <li key={item.name}>
                  <Checkbox
                    value={item.name}
                    checked={
                      specServices.filter(
                        el =>
                          el.name === item.name &&
                          el.namespace === specCurNameSpace
                      ).length > 0
                    }
                    onChange={checked => {
                      this.handleServiceChange(item, checked)
                    }}
                  >
                    {item.name}
                  </Checkbox>
                </li>
              ))}
            </ul>
          </div>
        </Panel>
      </Modal.Form>
    )
  }
}
