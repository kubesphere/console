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
import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { computed } from 'mobx'

import { ReactSortable } from 'react-sortablejs'

import RowTitleEditor from '../components/RowTitleEditor'
import RowsSortItem from '../components/RowsSortItem'
import VerticalLayout from '../components/Layout/VerticalLayout'
import AddPanel from '../components/AddPanel'

import GraphTypeSelect from '../components/GraphTypeSelectModal'

const dropHandlerClassName = 'j-sort'
const group = 'group'
const animation = 200

@inject('monitoringStore', 'modalStore')
@observer
export default class GraphRowsEditor extends Component {
  @computed
  get modalStore() {
    return this.props.modalStore
  }

  @computed
  get monitoringStore() {
    return this.props.monitoringStore
  }

  handleRowTitleChange(row) {
    return title => {
      row.config.title = title
    }
  }

  handleRowPanelsSort(row) {
    return sortEvent => {
      const oldMonitorSort = row.monitors.map(monitor => monitor.id).join(',')
      const newMonitorSort = sortEvent
        .map(({ monitor }) => monitor.id)
        .join(',')

      if (newMonitorSort !== oldMonitorSort) {
        row.monitors = sortEvent.map(({ monitor }) => {
          monitor.belong(row)
          return monitor
        })
      }
    }
  }

  handleRowDesc(index) {
    return () => {
      const namedRows = this.props.monitoringStore.graphMonitorRows
      const length = namedRows.length
      const tmp = namedRows[index]
      namedRows[index] = namedRows[(index + 1) % length]
      namedRows[(index + 1) % length] = tmp
    }
  }

  handleRowAsc(index) {
    return () => {
      const namedRows = this.props.monitoringStore.graphMonitorRows
      const length = namedRows.length
      const tmp = namedRows[index]
      namedRows[index] = namedRows[(index + length - 1) % length]
      namedRows[(index + length - 1) % length] = tmp
    }
  }

  handleRowDelete(index) {
    return () => {
      this.props.monitoringStore.graphMonitorRows.splice(index, 1)
    }
  }

  handleMonitorDelete(row, index) {
    return () => {
      row.deleteTextMonitorByIndex(index)
    }
  }

  handleMonitorSelect(monitor) {
    return () => {
      this.props.modalStore.selectMonitor(monitor)
    }
  }

  addRow = () => {
    this.props.monitoringStore.addNewRow()
  }

  showMonitorModal = () => {
    this.props.modalStore.showNewMonitorModal()
  }

  onNewMonitorModalCancel = () => {
    this.props.modalStore.hideNewMonitorModal()
  }

  onConfirmNewGraphType = type => {
    let Monitor

    if (type === 'line' || type === 'bar') {
      Monitor = this.props.monitoringStore.generatGraphMonitor({
        lines: type === 'line',
        bars: type === 'bar',
      })
    } else if (type === 'table') {
      Monitor = this.props.monitoringStore.generatTableMonitor()
    }

    this.props.modalStore.hideNewMonitorModal()
    this.modalStore.selectMonitor(Monitor)
  }

  render() {
    const unNamedRow = this.props.monitoringStore.unNameGraphRow
    const namedRows = this.props.monitoringStore.graphMonitorRows

    return (
      <VerticalLayout
        top={
          <div>
            <ReactSortable
              handle={`.${dropHandlerClassName}`}
              list={unNamedRow.monitors.map(monitor => ({ monitor }))}
              setList={this.handleRowPanelsSort(unNamedRow)}
              animation={animation}
              group={group}
            >
              {unNamedRow.monitors.map((monitor, monitorIndex) => (
                <RowsSortItem
                  key={monitor.id}
                  title={monitor.config.title}
                  sortHandlerClassName={dropHandlerClassName}
                  onEditClick={this.handleMonitorSelect(monitor)}
                  onDeleteClick={this.handleMonitorDelete(
                    unNamedRow,
                    monitorIndex
                  )}
                />
              ))}
            </ReactSortable>

            {namedRows.map((row, index) => (
              <div key={row.config.id}>
                <RowTitleEditor
                  key={row.config.id}
                  onChange={this.handleRowTitleChange(row)}
                  title={row.config.title}
                  onDescClick={this.handleRowDesc(index)}
                  onAscClick={this.handleRowAsc(index)}
                  onDeleteClick={this.handleRowDelete(index)}
                />
                <ReactSortable
                  key={`sortTable${row.config.id}`}
                  handle={`.${dropHandlerClassName}`}
                  list={row.monitors.map(monitor => ({ monitor }))}
                  setList={this.handleRowPanelsSort(row)}
                  animation={animation}
                  group={group}
                >
                  {row.monitors.map((monitor, monitorIndex) => (
                    <RowsSortItem
                      key={monitor.config.id}
                      title={monitor.config.title}
                      sortHandlerClassName={dropHandlerClassName}
                      onEditClick={this.handleMonitorSelect(monitor)}
                      onDeleteClick={this.handleMonitorDelete(
                        row,
                        monitorIndex
                      )}
                    />
                  ))}
                </ReactSortable>
              </div>
            ))}
          </div>
        }
        bottom={
          <div>
            <AddPanel
              title={t('ADD_MONITOR_ITEM')}
              onClick={this.showMonitorModal}
            />
            <AddPanel title={t('ADD_MONITOR_ROW')} onClick={this.addRow} />
            <GraphTypeSelect
              visible={this.modalStore.shouldNewMonitorModalShow}
              onCancel={this.onNewMonitorModalCancel}
              onOk={this.onConfirmNewGraphType}
            />
          </div>
        }
      />
    )
  }
}
