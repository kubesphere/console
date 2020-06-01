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
import { Provider, observer } from 'mobx-react'

/**
 * All containers dependent CustomMonitoringStore and modalStore
 */
import SwitchButton from './containers/SwitchButton'
import Title from './containers/Title'
import RefreshIntervalSelector from './containers/RefreshIntervalSelector'
import TimeRangeSelect from './containers/TimeRangeSelect'
import TextContainer from './containers/TextContainer'
import MonitorView from './containers/MonitorView'
import GraphOverview from './containers/GraphOverview'
import ThemeSwitchButton from './containers/ThemeSwitchButton'

import Clock from './components/Clock'
import Modal from './components/Modal/Theme'
import Layout from './components/Layout'

import ModalStore from './store'

/**
 * @TODO find a good dir to save
 * A container modal to handle custom monitoring template
 */
@observer
export default class CustomMonitoringModal extends React.Component {
  /**
   * store remote data
   */
  store = this.props.store

  /**
   * store temporary data
   */
  modalStore = new ModalStore()

  /**
   * check store saved status
   */
  handleCancel = () => {
    this.props.onCancel()
  }

  render() {
    const hasSelectedMonitor = this.modalStore.selectedMonitor
    const isEditing = this.store.isEditing

    const shouldMonitorDeatilShow = hasSelectedMonitor && isEditing

    return (
      <Provider monitoringStore={this.store} modalStore={this.modalStore}>
        <Modal
          theme={this.modalStore.theme}
          onCancel={this.handleCancel}
          title={<Title />}
          description={<Clock />}
          operations={
            <>
              <ThemeSwitchButton />
              <TimeRangeSelect />
              <RefreshIntervalSelector />
              <SwitchButton
                onSaveClick={this.props.onSave}
                isSubmitting={this.props.isSubmitting}
              />
            </>
          }
        >
          <Layout
            sidebar={<TextContainer />}
            content={
              <>
                {shouldMonitorDeatilShow && <MonitorView />}
                <GraphOverview hidden={shouldMonitorDeatilShow} />
              </>
            }
          />
        </Modal>
      </Provider>
    )
  }
}
