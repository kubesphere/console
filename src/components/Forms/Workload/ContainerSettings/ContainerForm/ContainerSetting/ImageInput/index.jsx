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
import PropTypes from 'prop-types'
import { get, set, throttle, isObject, isEmpty } from 'lodash'
import classnames from 'classnames'
import moment from 'moment-mini'
import { Form, Button, Icon, Loading, Tooltip } from '@kube-design/components'

import { getDocsUrl } from 'utils'

import { PATTERN_IMAGE, PATTERN_IMAGE_TAG } from 'utils/constants'

import ContainerStore from 'stores/container'

import DropdownContent from './DropdownContent'

import styles from './index.scss'

export default class ImageSearch extends Component {
  constructor(props) {
    super(props)
    this.store = new ContainerStore()
    this.getImageDetail = throttle(this.getImageDetail, 1000)

    this.state = {
      isLoading: false,
      showPortsTips: false,
    }
  }

  static defaultProps = {
    className: '',
    type: 'add',
  }

  static contextTypes = {
    forceUpdate: PropTypes.func,
  }

  get selectedImage() {
    const { formTemplate } = this.props
    const image = get(formTemplate, 'image', '')

    return get(globals.cache, `[${image}]`)
  }

  get tag() {
    const imageName = get(this.props.formTemplate, 'image', '')
    const result = PATTERN_IMAGE_TAG.exec(imageName)
    return get(result, `[${result.length - 1}]`, ':latest').slice(1)
  }

  componentDidMount() {
    const { formTemplate } = this.props

    const image = get(formTemplate, 'image', '')
    if (!this.selectedImage && image) {
      const secret = get(formTemplate, 'pullSecret')
      this.getImageDetail({ image, secret })
    }
  }

  componentWillUnmount() {
    this.isUnMounted = true
  }

  handleEnter = params => {
    if (!globals.config.enableImageSearch) {
      return
    }
    const { logo = '', short_description = '' } = params || {}
    const { formTemplate } = this.props

    const secret = get(formTemplate, 'pullSecret')
    const image = get(formTemplate, 'image', '')

    if (this.image && image === this.image) {
      this.image = undefined
      return
    }

    this.ImageDetail = { image, secret, logo, short_description }
    this.getImageDetail(this.ImageDetail)
  }

  getImageDetailNoCert = () => {
    this.getImageDetail({ ...this.ImageDetail, insecure: true })
  }

  getImageDetail = async ({ image, secret, insecure, ...rest }) => {
    const { namespace, imageRegistries, cluster: propsCluster } = this.props

    if (!image || this.isUnMounted) {
      return
    }

    this.image = image

    this.setState({ isLoading: true })

    const secretDetail = imageRegistries.find(item => item.value === secret)
    const cluster = get(secretDetail, 'cluster') || propsCluster
    const result = await this.store.getImageDetail({
      cluster,
      namespace,
      image,
      secret,
      insecure,
    })
    const selectedImage = { ...result, ...rest, image }
    set(globals, `cache[${image}]`, selectedImage)

    if (!isEmpty(selectedImage.exposedPorts)) {
      this.setState({ showPortsTips: true })
    }

    this.setState({ isLoading: false })
  }

  handleFillPorts = () => {
    const ports = this.selectedImage.exposedPorts.map(port => {
      const protocol = port.split('/')[1]
      const containerPort = Number(port.split('/')[0])

      return {
        name: `${protocol}-${containerPort}`,
        protocol: protocol.toUpperCase(),
        containerPort,
        servicePort: containerPort,
      }
    })

    if (!isEmpty(ports)) {
      set(this.props.formTemplate, 'ports', ports)
      this.context.forceUpdate && this.context.forceUpdate()
    }
  }

  renderWaringText = () => {
    return <p>{t('IGNORE_CERT_WARN_DESC')}</p>
  }

  renderSelectedContent = () => {
    if (this.state.isLoading) {
      return (
        <Loading>
          <div className={styles.selectedContent} />
        </Loading>
      )
    }

    if (isObject(this.selectedImage)) {
      const { message, status } = this.selectedImage

      if (status === 'failed') {
        if (message && message.includes('x509')) {
          return (
            <div
              className={classnames(
                styles.selectedContent,
                styles.emptyContent
              )}
            >
              <Icon name="docker" className={styles.icon} />
              <p className={styles.desc}>
                {t('CERT_ERROR')}
                <Tooltip content={this.renderWaringText}>
                  <span
                    className={styles.textConfirm}
                    onClick={this.getImageDetailNoCert}
                  >
                    {t('IGNORE_AND_RETRY')}
                  </span>
                </Tooltip>
              </p>
            </div>
          )
        }

        return (
          <div
            className={classnames(styles.selectedContent, styles.emptyContent)}
          >
            <div>
              <Icon name="docker" className={styles.icon} />
              <p className={styles.desc}>{t('NO_IMAGE_FOUND')}</p>
            </div>
          </div>
        )
      }

      const {
        image,
        createTime,
        exposedPorts = [],
        logo,
        short_description,
      } = this.selectedImage

      const registry =
        image.indexOf('/') > -1 ? image.split('/')[0] : 'docker.io'
      const ports = exposedPorts.join('; ')
      const _message = message || short_description

      return (
        <div className={styles.selectedContent}>
          <div className={styles.selectedInfo}>
            <img
              className={styles.logo}
              src={logo || '/assets/no_img.svg'}
              alt={image}
            />
            <div className={styles.imageInfo}>
              <p className={styles.title}>{image}</p>
              <p className={styles.desc}>
                {t('IMAGE_TIME_SIZE_LAYER', {
                  time: moment(createTime).fromNow(),
                })}
              </p>
            </div>
            {this.state.showPortsTips ? (
              <Button
                className={styles.defaultPortButtons}
                onClick={this.handleFillPorts}
              >
                👉 {t('USE_DEFAULT_PORTS')}
              </Button>
            ) : null}
          </div>
          {_message ? <div className={styles.message}>{_message}</div> : null}
          <div className={styles.config}>
            <div className={styles.selectedInfo}>
              <Icon name="tag" className={styles.icon} />
              <div className={styles.imageInfo}>
                <p>{this.tag}</p>
                <p>{t('TAG')}</p>
              </div>
            </div>
            <div className={styles.selectedInfo}>
              <Icon name="port" className={styles.icon} />
              <div className={styles.imageInfo}>
                <p>{ports || t('NO_DEFAULT_PORT')}</p>
                <p>{t('PORT')}</p>
              </div>
            </div>
            <div className={styles.selectedInfo}>
              <Icon name="docker" className={styles.icon} />
              <div className={styles.imageInfo}>
                <p>{registry}</p>
                <p>{t('REGISTRY')}</p>
              </div>
            </div>
          </div>
        </div>
      )
    }
    return (
      <div className={classnames(styles.selectedContent, styles.emptyContent)}>
        <div>
          <Icon name="docker" className={styles.icon} />
          <p className={styles.desc}>{t('SET_IMAGE_DESC')}</p>
        </div>
      </div>
    )
  }

  render() {
    return (
      <>
        <Form.Item
          label={t('IMAGE')}
          desc={t.html('IMAGE_DESC', {
            link: getDocsUrl('imageregistry'),
          })}
          rules={[
            { required: true, message: t('IMAGE_EMPTY') },
            { pattern: PATTERN_IMAGE, message: t('INVALID_IMAGE') },
          ]}
        >
          <DropdownContent
            {...this.props}
            store={this.store}
            onEnter={this.handleEnter}
            name="image"
            onLoading={this.handleLoadingChange}
          />
        </Form.Item>
        {globals.config.enableImageSearch && this.renderSelectedContent()}
      </>
    )
  }
}
