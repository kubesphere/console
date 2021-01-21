/*
 * This file is part of KubeSphere Console.
 * Copyright (C) 2019 The KubeSphere Console Authors.
 * * KubeSphere Console is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
* KubeSphere Console is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
  You should have received a copy of the GNU Affero General Public License
 * along with KubeSphere Console.  If not, see <https://www.gnu.org/licenses/>.
 */

import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { computed, toJS } from 'mobx'

import { Form } from '@kube-design/components'
import { TypeSelect } from 'components/Base'
import { MONITOR_GRAPH_COLORS } from 'utils/constants'

import EditMonitorFormLayou from '../components/EditMonitorFormLayout'
import { GraphTextInput, ThemeSelector } from '../components/FormInput'

import FormItemContainer from '../components/Form/ItemContianer'
import Graph from '../components/Graph/Compose'
import GraphDescription from '../components/Graph/GraphDescription'
import ErrorContainer from '../components/ErrorContainer'
import FormGroupCard from '../components/FormGroupCard'
import GraphForm from '../components/Form/Graph'

@inject('monitoringStore', 'labelStore')
@observer
export default class GraphMonitorForm extends Component {
  @computed
  get monitor() {
    return this.props.monitor
  }

  componentDidMount() {
    this.props.monitoringStore.fetchMetadata()
  }

  @computed
  get supportMetrics() {
    return this.props.monitoringStore.targetsMetadata.map(metadata => ({
      value: metadata.metric,
      desc: metadata.help,
      type: metadata.type,
    }))
  }

  get timeRange() {
    return this.monitor.timeRange
  }

  handleLabelSearch = metric => {
    const { cluster, namespace } = this.props.monitoringStore
    const { from, to } = this.props.monitoringStore.getTimeRange()

    this.props.labelStore.fetchLabelSets({
      cluster,
      namespace,
      metric,
      start: Math.floor(from.valueOf() / 1000),
      end: Math.floor(to.valueOf() / 1000),
    })
  }

  render() {
    const { title, lines, bars, stack, description } = this.monitor.config
    const { errorMessage } = this.monitor

    const legends = this.monitor.legends

    const labelsets = toJS(this.props.labelStore.labelsets)

    return (
      <EditMonitorFormLayou
        preview={
          <ErrorContainer errorMessage={errorMessage}>
            <GraphDescription title={title} description={description}>
              <Graph
                line={lines}
                bar={bars}
                stacked={stack}
                timeRange={this.timeRange}
                valueFormatter={this.monitor.valueFormatter}
                legends={legends}
                data={this.monitor.graphData}
              />
            </GraphDescription>
          </ErrorContainer>
        }
        sidebar={
          <>
            <GraphTextInput type={this.monitor.config.lines ? 'line' : 'bar'} />
            <FormGroupCard className="margin-t12" label={t('GRAPH_TYPES')}>
              <Form.Item>
                <FormItemContainer name={'stack'} debounce={100}>
                  {({ onChange, value }) => (
                    <TypeSelect
                      defaultValue={false}
                      value={value}
                      onChange={onChange}
                      options={[
                        {
                          value: true,
                          label: t('STACKED_GRAPH_TYPE'),
                          icon: 'barchart',
                          description: t('STACKED_GRAPH_TYPE_DESC'),
                        },
                        {
                          value: false,
                          label: t('SINGLE_GRAPH_TYPE_NAME'),
                          icon: 'barchart',
                          description: t('SINGLE_GRAPH_TYPE'),
                        },
                      ]}
                    />
                  )}
                </FormItemContainer>
              </Form.Item>
            </FormGroupCard>
            <FormGroupCard label={t('GRAPH_COLORS')}>
              <Form.Item>
                <FormItemContainer
                  name={'colors'}
                  defaultValue={0}
                  debounce={100}
                >
                  {({ onChange, value }) => (
                    <ThemeSelector
                      onChange={onChange}
                      value={value}
                      options={MONITOR_GRAPH_COLORS.map(colorOpt => ({
                        label: t(colorOpt.nameI18nKey),
                        value: colorOpt.colors,
                      }))}
                    />
                  )}
                </FormItemContainer>
              </Form.Item>
            </FormGroupCard>
          </>
        }
        main={
          <GraphForm
            supportMetrics={this.supportMetrics}
            labelsets={labelsets}
            onLabelSearch={this.handleLabelSearch}
          />
        }
      />
    )
  }
}
