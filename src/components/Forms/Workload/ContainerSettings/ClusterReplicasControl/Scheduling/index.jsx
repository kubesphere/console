import React, { Component } from 'react'
import { get, set } from 'lodash'
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import { Input, Form } from '@kube-design/components'
import PropTypes from 'prop-types'

import SchedulePlacement from './SchedulePlacement'
import styles from './index.scss'

const initialSeconds = 5
@observer
export default class Scheduling extends Component {
  static propsTypes = {
    scheduleTemplate: PropTypes.object,
    clusters: PropTypes.array,
  }

  static defaultProps = {
    clusters: [],
    scheduleTemplate: {
      weight: 1,
    },
    seconds: initialSeconds,
    showConfirm: false,
  }

  getScheduleValue = name => {
    const clusters = get(this.props.scheduleTemplate, `spec.clusters`, {})
    return clusters[name].weight
  }

  handleClusterChange = (data, name) => {
    const { scheduleTemplate } = this.props
    set(scheduleTemplate, `spec.clusters.${name}.weight`, data)
  }

  totalChange = value => {
    const { scheduleTemplate } = this.props
    if (/^\+?[1-9][0-9]*$/.test(value)) {
      set(scheduleTemplate, `spec.totalReplicas`, Number(value))
    }
  }

  totalValidator = (rule, value, callback) => {
    if (!value) {
      return callback()
    }
    if (/^\+?[1-9][0-9]*$/.test(value)) {
      callback()
    } else {
      callback({ message: t('ENTER_POSITIVE_INTEGER_DESC'), field: rule.field })
    }
  }

  render() {
    const { clusters } = this.props
    return (
      <div>
        <Form.Item
          label={t('TOTAL_REPLICAS')}
          className={styles.InputItem}
          rules={[
            { required: true, message: t('TOTAL_REPLICAS_EMPTY_DESC') },
            { validator: this.totalValidator },
          ]}
        >
          <Input name="totalReplicas" onChange={this.totalChange}></Input>
        </Form.Item>
        <div className={styles.wrapper}>
          <div className={styles.clusterBox}>
            {toJS(clusters).map(cluster => (
              <SchedulePlacement
                key={cluster.name}
                cluster={cluster.name}
                weight={this.getScheduleValue(cluster.name)}
                handleClusterChange={this.handleClusterChange}
              ></SchedulePlacement>
            ))}
          </div>
        </div>
      </div>
    )
  }
}
