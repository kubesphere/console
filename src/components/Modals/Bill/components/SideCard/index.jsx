import React from 'react'
import { observer } from 'mobx-react'
import { action, observable, toJS } from 'mobx'
import { Loading, Icon } from '@kube-design/components'
import { saveAs } from 'file-saver'
import { isEmpty, last } from 'lodash'
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
  getBillReportList = name => {
    const hasResource = this.billReportList.indexOf(name) > -1

    if (hasResource) {
      this.billReportList = this.billReportList.filter(item => item !== name)
    } else {
      this.billReportList.push(name)
    }
  }

  handleFile = async ({ fetchMeterData, params, timeRange, module }) => {
    const result = await fetchMeterData({
      module,
      meters: 'all',
      resources: this.billReportList,
      isTime: true,
      operation: 'export',
      ...params,
      ...timeRange,
    })

    const name = this.billReportList[0]
    const blob = new Blob([result], { type: 'text/plain;charset=utf-8' })
    saveAs(blob, `${name}.csv`)
  }

  handleExportBillReport = async () => {
    const {
      getMeterParamsByCrumb,
      crumbData,
      fetchMeterData,
      cluster,
      timeRange,
    } = this.props
    if (isEmpty(this.billReportList)) {
      return
    }

    const params = getMeterParamsByCrumb()
    const module = last(crumbData).type
    params.cluster = cluster

    if (module === 'cluster') {
      const request = []
      this.billReportList.forEach(item => {
        params.cluster = item
        request.push(
          fetchMeterData({
            module,
            meters: 'all',
            resources: [item],
            isTime: true,
            operation: 'export',
            ...params,
            ...timeRange,
          })
        )
      })

      const results = await Promise.all(request)

      results.forEach((result, index) => {
        const blob = new Blob([result], { type: 'text/plain;charset=utf-8' })
        saveAs(blob, `${this.billReportList[index]}.csv`)
      })
    } else {
      await this.handleFile({ fetchMeterData, params, timeRange, module })
    }
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
        style={{ bottom: isTop ? '10px' : '80px' }}
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

  render() {
    const {
      list,
      active,
      handleSelectResource,
      loading,
      clusterList = [],
    } = this.props

    return (
      <div className={styles.side}>
        <div className={styles.sideList}>
          <Loading spinning={loading} style={{ width: '100%' }}>
            <>
              {list.map(item => (
                <SideCardItem
                  key={`${item.name}-${item.type}`}
                  data={item}
                  active={active}
                  clusterList={clusterList}
                  getCurrentMeterData={handleSelectResource}
                  getChildrenData={this.getChildrenData}
                  getCheckData={this.getBillReportList}
                  loading={loading}
                  isCheck={this.billReportList.indexOf(item.name) > -1}
                />
              ))}
            </>
          </Loading>
        </div>
        {this.renderBillReportConform()}
      </div>
    )
  }
}
