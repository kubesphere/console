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
import { computed } from 'mobx'

import { Form, TypeSelect } from 'components/Base'
import { MONITOR_GRAPH_COLORS } from 'utils/constants'

import EditMonitorFormLayou from '../components/EditMonitorFormLayout'
import { GraphTextInput, ThemeSelector } from '../components/FormInput'

import Graph from '../components/Graph/Compose'
import GraphDescription from '../components/Graph/GraphDescription'
import ErrorContainer from '../components/ErrorContainer'
import FormGroupCard from '../components/FormGroupCard'
import GraphForm from '../components/Form/Graph'

@inject('monitoringStore')
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
      label: metadata.metric,
      desc: metadata.help,
      type: metadata.type,
    }))
  }

  render() {
    const { title, lines, bars, stack, description } = this.monitor.config
    const { errorMessage } = this.monitor

    const { from, to } = this.props.monitoringStore.timeRange
    const legends = this.monitor.legends
    const timeRange = {
      start: from.valueOf(),
      end: to.valueOf(),
    }

    return (
      <EditMonitorFormLayou
        preview={
          <ErrorContainer errorMessage={errorMessage}>
            <GraphDescription title={title} description={description}>
              <Graph
                line={lines}
                bar={bars}
                stacked={stack}
                description={description}
                timeRange={timeRange}
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
            <FormGroupCard label={t('GRAPH_TYPES')}>
              <Form.Item>
                <TypeSelect
                  name="stack"
                  defaultValue={false}
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
              </Form.Item>
            </FormGroupCard>
            <FormGroupCard label={t('GRAPH_COLORS')}>
              <Form.Item>
                <ThemeSelector
                  name={'colors'}
                  options={MONITOR_GRAPH_COLORS.map(colorOpt => ({
                    label: t(colorOpt.nameI18nKey),
                    value: colorOpt.colors,
                  }))}
                />
              </Form.Item>
            </FormGroupCard>
          </>
        }
        main={<GraphForm supportMetrics={this.supportMetrics} />}
      />
    )
  }
}
