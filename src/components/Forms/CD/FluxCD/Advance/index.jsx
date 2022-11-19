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
import {
  Form,
  Input,
  Column,
  Columns,
  Toggle,
  Tag,
  Tabs,
  Dropdown,
  Menu,
  Collapse,
  Select,
  Icon,
} from '@kube-design/components'

import { FLUXCD_APP_TYPES } from 'utils/constants'
import { ArrayInput, ObjectInput } from 'components/Inputs'
import { TypeSelect } from 'components/Base'
import { get, set } from 'lodash'
import { ArrayInput, ObjectInput } from 'components/Inputs'
import Placement from '../../Advance/Placement'
import styles from './index.scss'

const { TabPanel } = Tabs

export default class Advance extends React.Component {
  state = { appType: 'HelmRelease', tabName: 'Interval' }

  handleToggleChange = key => value => {
    const { formTemplate } = this.props
    set(formTemplate, key, value)
    this.forceUpdate()
  }

  handleTabChange = tab => {
    this.state.tabName = tab
    this.forceUpdate()
  }

  get appOptions() {
    return FLUXCD_APP_TYPES.map(({ label, value, description, icon }) => ({
      label: t(label),
      description: t(description),
      icon: t(icon),
      value,
    }))
  }

  render() {
    const { formRef, formTemplate } = this.props

    return (
      <Form data={formTemplate} ref={formRef}>
        <div className={styles.wrapper}>
          <h6>{t('TYPE')}</h6>
          <div className={styles.wrapper_item}>
            <Form.Item>
              <TypeSelect
                name="appType"
                defaultValue="HelmRelease"
                options={this.appOptions}
                onChange={type => {
                  this.state.appType = type
                  this.forceUpdate()
                }}
              />
            </Form.Item>
          </div>
        </div>
        {this.state.appType === 'HelmRelease' && (
          <div>
            <div className={styles.wrapper}>
              <h6>{t('CONFIGURATION')}</h6>
              <div className={styles.wrapper_item}>
                <Columns>
                  <Column>
                    <Form.Item
                      label={t('Chart')}
                      desc={t('The name or path of the Helm Chart')}
                      rules={[{ required: true }]}
                    >
                      <Input name="config.helmRelease.chart.chart" />
                    </Form.Item>
                  </Column>
                  <Column>
                    <Form.Item
                      label={t('Save Template')}
                      desc={t(
                        'Template is a reusable module includes Chart, ValuesFiles and so on'
                      )}
                    >
                      <Toggle
                        name="metadata.labels['gitops.kubesphere.io/save-helm-template']"
                        checked={get(
                          formTemplate,
                          "metadata.labels['gitops.kubesphere.io/save-helm-template']"
                        )}
                        onChange={this.handleToggleChange(
                          "metadata.labels['gitops.kubesphere.io/save-helm-template']"
                        )}
                      />
                    </Form.Item>
                  </Column>
                </Columns>
                <Columns>
                  <Column>
                    <Form.Item
                      label={t('ValuesFiles')}
                      desc={t(
                        'list of values files to use as the chart values'
                      )}
                    >
                      <ArrayInput name="config.helmRelease.chart.valuesFiles">
                        <Input />
                      </ArrayInput>
                    </Form.Item>
                  </Column>
                </Columns>
              </div>
            </div>
            <div className={styles.wrapper}>
              <h6>{t('DEPLOYMENTS')}</h6>
              <div className={styles.wrapper_item}>
                <h5>{t('DEPLOY_LOCATION')}</h5>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: t('PROJECT_NOT_SELECT_DESC'),
                    },
                  ]}
                >
                  <Placement
                    name="destination"
                    prefix="destination"
                    formData={formTemplate}
                    {...this.props}
                  />
                </Form.Item>
                <br />
                <Columns>
                  <Column>
                    <Form.Item
                      label={t('Values')}
                      desc={t('Values holds the values for this HelmRelease')}
                    >
                      <ArrayInput
                        name="config.helmRelease.values"
                        itemType="object"
                      >
                        <ObjectInput>
                          <Input name="k" placeholder={t('KEY')} />
                          <Input name="v" placeholder={t('VALUE')} />
                        </ObjectInput>
                      </ArrayInput>
                    </Form.Item>
                  </Column>
                </Columns>
                <Columns>
                  <Column>
                    <Form.Item
                      label={t('ValuesFrom')}
                      desc={
                        'ValuesFrom holds references to resources containing Helm values for this HelmRelease'
                      }
                    >
                      <ArrayInput
                        name="config.helmRelease.valuesFrom"
                        itemType="object"
                      >
                        <ObjectInput>
                          <Select
                            name="kind"
                            defaultValue="ConfigMap"
                            optionRenderer={option => (
                              <span className="option-with-icon">
                                <Icon
                                  name={option.icon}
                                  style={{
                                    marginRight: 6,
                                    verticalAlign: 'middle',
                                  }}
                                  type="light"
                                />
                                <span>{option.label}</span>
                              </span>
                            )}
                            valueRenderer={option => (
                              <span className="option-with-icon">
                                <Icon
                                  name={option.icon}
                                  style={{
                                    marginRight: 6,
                                    verticalAlign: 'middle',
                                  }}
                                />
                                <span>{option.value}</span>
                              </span>
                            )}
                            options={[
                              {
                                label: 'ConfigMap',
                                value: 'ConfigMap',
                                icon: 'hammer',
                              },
                              {
                                label: 'Secret',
                                value: 'Secret',
                                icon: 'key',
                              },
                            ]}
                          />
                          <Input name="name" placeholder={t('NAME')} />
                          <Input
                            name="valuesKey"
                            placeholder={t('ValuesKey')}
                          />
                        </ObjectInput>
                      </ArrayInput>
                    </Form.Item>
                  </Column>
                </Columns>
                <Collapse accordion>
                  <Collapse.CollapseItem
                    label={t('ADVANCED_SETTINGS')}
                    key="advance"
                  >
                    <Tabs
                      type="button"
                      activeName={this.state.tabName}
                      onChange={this.handleTabChange}
                      defaultActiveName={'Interval'}
                    >
                      <TabPanel label={t('SYNC_INTERVAL')} name="Interval">
                        <Form.Item
                          desc={t(
                            'Interval at which to reconcile the Helm release'
                          )}
                        >
                          <Input
                            name="config.helmRelease.interval"
                            defaultValue="10m"
                          />
                        </Form.Item>
                      </TabPanel>
                      <TabPanel label={t('RELEASE_NAME')} name="ReleaseName">
                        <Form.Item
                          desc={t('ReleaseName used for the Helm release')}
                        >
                          <Input name="config.helmRelease.releaseName" />
                        </Form.Item>
                      </TabPanel>
                      <TabPanel
                        label={t('StorageNamespace')}
                        name="StorageNamespace"
                      >
                        <Form.Item
                          desc={t('StorageNamespace used for the Helm storage')}
                        >
                          <Input
                            name="config.helmRelease.storageNamespace"
                            defaultValue="flux-system"
                          />
                        </Form.Item>
                      </TabPanel>
                      <TabPanel label={t('INSTALL')} name="Install">
                        <Form.Item
                          desc={t(
                            'Install holds the configuration for Helm install actions for this HelmRelease'
                          )}
                        >
                          <Input name="config.helmRelease.install" />
                        </Form.Item>
                      </TabPanel>
                      <TabPanel label={t('UPDATE')} name="Upgrade">
                        <Form.Item
                          desc={t(
                            'Upgrade holds the configuration for Helm upgrade actions for this HelmRelease'
                          )}
                        >
                          <Input name="config.helmRelease.upgrade" />
                        </Form.Item>
                      </TabPanel>
                      <TabPanel label={t('TEST')} name="Test">
                        <Form.Item
                          desc={t(
                            'Test holds the configuration for Helm test actions for this HelmRelease'
                          )}
                        >
                          <Input name="config.helmRelease.test" />
                        </Form.Item>
                      </TabPanel>
                      <TabPanel label={t('ROLL_BACK')} name="Rollback">
                        <Form.Item
                          desc={t(
                            'Rollback holds the configuration for Helm rollback actions for this HelmRelease'
                          )}
                        >
                          <Input name="config.helmRelease.rollback" />
                        </Form.Item>
                      </TabPanel>
                    </Tabs>
                  </Collapse.CollapseItem>
                </Collapse>
              </div>
            </div>
          </div>
        )}
        {this.state.appType === 'Kustomization' && (
          <div>
            <div className={styles.wrapper}>
              <h6>{t('CONFIGURATION')}</h6>
              <div className={styles.wrapper_item}>
                <Columns>
                  <Column>
                    <Form.Item
                      label={t('PATH')}
                      desc={t(
                        'Path to the directory containing the kustomization.yaml file'
                      )}
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Input name="config.kustomization.path" />
                    </Form.Item>
                  </Column>
                  <Column>
                    <Form.Item
                      label={t('SYNC_INTERVAL')}
                      desc={t(
                        'The interval at which to reconcile the Kustomization'
                      )}
                    >
                      <Input
                        name="config.kustomization.interval"
                        defaultValue="10m"
                      />
                    </Form.Item>
                  </Column>
                </Columns>
              </div>
            </div>
            <div className={styles.wrapper}>
              <h6>{t('DEPLOY_LOCATION')}</h6>
              <div className={styles.wrapper_item}>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: t('PROJECT_NOT_SELECT_DESC'),
                    },
                  ]}
                >
                  <Placement
                    name="destination"
                    prefix="destination"
                    formData={formTemplate}
                    {...this.props}
                  />
                </Form.Item>
              </div>
            </div>
          </div>
        )}
      </Form>
    )
  }
}
