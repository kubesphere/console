import React from 'react'
import { observer } from 'mobx-react'
import { action, observable, toJS } from 'mobx'
import { Loading, Icon } from '@kube-design/components'
import { saveAs } from 'file-saver'
import { clone, isEmpty, isUndefined, last, get } from 'lodash'
import { getRetentionDay } from 'utils/meter'
import SideCardItem from './item'
import styles from './index.scss'

@observer
export default class SideContainer extends React.Component {
  @observable
  billReportList = []

  componentDidUpdate(prevProps) {
    if (this.props.active.name !== prevProps.active.name) {
      this.cancelExportBillReport()
    }
  }

  @action
  getBillReportList = ({ name, type }) => {
    const hasResource = !isUndefined(
      this.billReportList.find(item => item.name === name)
    )

    if (hasResource) {
      this.billReportList = this.billReportList.filter(
        item => item.name !== name
      )
    } else {
      this.billReportList.push({ name, type })
    }
  }

  handleExportBillReport = async () => {
    const {
      getMeterParamsByCrumb,
      crumbData,
      fetchMeterData,
      cluster,
      timeRange,
      priceConfigList,
    } = this.props
    if (isEmpty(this.billReportList)) {
      return
    }

    const params = getMeterParamsByCrumb()
    const { type: module, start, name } = last(crumbData)

    if (module !== 'cluster') {
      params.cluster = cluster
    }

    if (module === 'applications' || module === 'openpitrixs') {
      delete params[module]
    }

    const request = []

    this.billReportList.forEach(item => {
      const _params = clone(params)
      _params[item.type] = item.name

      let defaultTime = { start }

      if (item.type === 'cluster') {
        const priceConfig = priceConfigList.find(
          _item => _item.cluster === item.name
        )

        const _start = getRetentionDay(get(priceConfig, 'retention_day', '7d'))
        defaultTime = { start: _start }
      }

      if (item.name === name && module === item.type) {
        defaultTime = { ...timeRange }
      }

      request.push(
        fetchMeterData({
          module: item.type,
          meters: 'all',
          resources: [item.name],
          isTime: true,
          operation: 'export',
          ..._params,
          ...defaultTime,
        })
      )
    })

    const results = await Promise.all(request)
    results.forEach((result, index) => {
      const blob = new Blob([result], { type: 'text/plain;charset=utf-8' })
      saveAs(blob, `${this.billReportList[index].name}.csv`)
    })
    this.billReportList = []
  }

  @action
  getChildrenData = params => {
    this.billReportList = []
    this.props.getChildrenData(params)
  }

  @action
  cancelExportBillReport = () => {
    this.billReportList = []
  }

  renderBillReportConform = () => {
    const { active, priceConfig } = this.props
    const isTop =
      active.type === 'cluster' ||
      active.type === 'workspaces' ||
      isEmpty(priceConfig)

    return !isEmpty(toJS(this.billReportList)) ? (
      <div
        className={styles.exportContainer}
        style={{ bottom: isTop ? '10px' : '70px' }}
      >
        <div className={styles.text}>{t('Export Bill')}</div>
        <div
          className={styles.button}
          onClick={this.cancelExportBillReport}
          data-test="confirm-cancel"
        >
          <Icon name="close" type="light" />
        </div>
        <div
          className={styles.button}
          onClick={this.handleExportBillReport}
          data-test="confirm-ok"
        >
          <Icon name="check" type="light" />
        </div>
      </div>
    ) : null
  }

  renderSideCardItem = () => {
    const {
      list,
      active,
      handleSelectResource,
      loading,
      clusterList = [],
    } = this.props

    return list.map(item => (
      <SideCardItem
        key={`${item.name}-${item.type}`}
        data={item}
        active={active}
        clusterList={clusterList}
        getCurrentMeterData={handleSelectResource}
        getChildrenData={this.getChildrenData}
        getCheckData={this.getBillReportList}
        loading={loading}
        isCheck={
          !isUndefined(
            this.billReportList.find(_item => _item.name === item.name)
          )
        }
      />
    ))
  }

  render() {
    const { loading } = this.props

    return (
      <div className={styles.side}>
        <Loading spinning={loading}>{this.renderSideCardItem()}</Loading>
        {this.renderBillReportConform()}
      </div>
    )
  }
}
