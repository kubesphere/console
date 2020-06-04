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

import { isEmpty, cloneDeep } from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { ReactComponent as BackIcon } from 'src/assets/back.svg'
import { Form } from 'components/Base'

import Ports from './Ports'
import Commands from './Commands'
import Environments from './Environments'
import ImagePullPolicy from './ImagePullPolicy'
import HealthChecker from './HealthChecker'
import ContainerSetting from './ContainerSetting'
import SecurityContext from './SecurityContext'

import styles from './index.scss'

export default class ContaineForm extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    type: PropTypes.string,
    titlePrefix: PropTypes.string,
    cluster: PropTypes.string,
    namespace: PropTypes.string,
    module: PropTypes.string,
    data: PropTypes.object,
    onSave: PropTypes.func,
    onCancel: PropTypes.func,
    configMaps: PropTypes.array,
    secrets: PropTypes.array,
  }

  static defaultProps = {
    className: '',
    type: 'Add',
    titlePrefix: '',
    cluster: '',
    namespace: '',
    module: '',
    data: {},
    onSave() {},
    onCancel() {},
    configMaps: [],
    secrets: [],
  }

  static childContextTypes = {
    forceUpdate: PropTypes.func,
  }

  getChildContext() {
    return {
      forceUpdate: () => {
        this.forceUpdate()
      },
    }
  }

  static contextTypes = {
    registerSubRoute: PropTypes.func,
    resetSubRoute: PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.formRef = React.createRef()

    this.state = {
      containerType: props.data.type || 'worker',
      formData: cloneDeep(props.data),
    }
  }

  componentDidMount() {
    this.registerForm()
  }

  get title() {
    const { type, titlePrefix } = this.props

    const title = t(`${type} Container`)

    return `${titlePrefix}${title}`
  }

  registerForm = () => {
    const { registerSubRoute } = this.context
    const { onCancel } = this.props

    registerSubRoute && registerSubRoute(this.handleSubmit, onCancel)
  }

  handleGoBack = () => {
    const { resetSubRoute } = this.context

    resetSubRoute && resetSubRoute()

    this.props.onCancel()
  }

  handleSubmit = callback => {
    const { onSave, withService } = this.props
    const form = this.formRef.current

    form &&
      form.validate(() => {
        const data = form.getData()

        if (data.args) {
          data.args = data.args.filter(item => !isEmpty(item))
        }

        if (data.command) {
          data.command = data.command.filter(item => !isEmpty(item))
        }

        if (data.env) {
          data.env = data.env.filter(({ name }) => !isEmpty(name))
        }

        if (data.ports) {
          data.ports = data.ports.filter(
            item => !(!item.name && !item.containerPort && !item.hostPort)
          )
        }

        if (!withService && data.ports) {
          data.ports.forEach(item => {
            if (item.servicePort !== undefined) {
              delete item.servicePort
            }
          })
        }

        onSave(data)
        callback && callback()
      })
  }

  handleContainerTypeChange = containerType => {
    this.setState({ containerType })
  }

  render() {
    const {
      className,
      configMaps,
      secrets,
      quota,
      limitRange,
      imageRegistries,
      cluster,
      namespace,
      withService,
    } = this.props
    const { containerType, formData } = this.state

    return (
      <div className={classNames(styles.wrapper, className)}>
        <div className="h5">
          <a className="custom-icon" onClick={this.handleGoBack}>
            <BackIcon />
          </a>
          {this.title}
        </div>
        <Form ref={this.formRef} data={formData}>
          <ContainerSetting
            data={formData}
            quota={quota}
            cluster={cluster}
            namespace={namespace}
            limitRange={limitRange}
            imageRegistries={imageRegistries}
            defaultContainerType={containerType}
            onContainerTypeChange={this.handleContainerTypeChange}
          />
          <Ports withService={containerType !== 'init' ? withService : false} />
          <ImagePullPolicy />
          {containerType !== 'init' && <HealthChecker />}
          <Commands />
          <Environments configMaps={configMaps} secrets={secrets} />
          <SecurityContext />
        </Form>
      </div>
    )
  }
}
