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
import { toJS } from 'mobx'
import { get, debounce, isObject, throttle, set } from 'lodash'
import moment from 'moment-mini'
import classnames from 'classnames'

import { Form, Icon, Loading, Tooltip } from '@kube-design/components'
import { getDocsUrl } from 'utils'
import { PATTERN_IMAGE, PATTERN_IMAGE_TAG } from 'utils/constants'
import ContainerStore from 'stores/container'
import DropdownContent from './DropdownContent'
import ImageTagRadioList from './ImageTagRadioList'

import styles from './index.scss'

export default class ImageSearch extends Component {
  constructor(props) {
    super(props)
    this.store = new ContainerStore()

    this.state = {
      isLoading: false,
      selectedLoading: false,
      selectedImage: undefined,
      selectedImageTag: undefined,
    }
  }

  static defaultProps = {
    className: '',
    type: 'add',
  }

  static contextTypes = {
    forceUpdate: PropTypes.func,
    setImageDetail: PropTypes.func,
  }

  get secret() {
    const { imageRegistries, formTemplate } = this.props
    const defaultsecrect = imageRegistries.find(item => item.isDefault)

    return get(formTemplate, 'pullSecret', defaultsecrect?.value || '')
  }

  componentDidMount() {
    const { formTemplate, imageRegistries } = this.props
    const image = get(formTemplate, 'image', '')
    const secretUrl =
      imageRegistries.find(item => item.value === this.secret)?.url ?? ''
    const convertUrl = secretUrl.replace(/^(http(s)?:\/\/)?(.*)$/, '$3')

    if (image && image !== convertUrl) {
      this.getImageDetail({ image, secret: this.secret })
    }
  }

  componentWillUnmount() {
    this.isUnMounted = true
  }

  getTag = image => {
    const result = PATTERN_IMAGE_TAG.exec(image)
    const tag = get(result, `[${result.length - 1}]`, ':latest').slice(1)
    return { imageName: image.replace(`:${tag}`, ''), tag }
  }

  getImageParam = () => {
    const { namespace, imageRegistries, cluster: propsCluster } = this.props
    const secretDetail = imageRegistries.find(
      item => item.value === this.secret
    )
    const cluster = get(secretDetail, 'cluster') || propsCluster

    return {
      namespace,
      cluster,
    }
  }

  handleEnter = debounce(
    params => {
      if (!globals.config.enableImageSearch) {
        return
      }

      const { logo = '', short_description = '' } = params || {}
      const { formTemplate } = this.props
      const image = get(formTemplate, 'image', '')
      const tagList = toJS(this.store.tagList.data)

      if (this.image === image && tagList.length > 0) {
        return
      }

      this.ImageDetail = { image, secret: this.secret, logo, short_description }
      this.getImageDetail(this.ImageDetail)
    },
    800,
    { leading: true, trailing: false }
  )

  getImageDetailNoCert = () => {
    this.getImageDetail({ ...this.ImageDetail, insecure: true })
  }

  getImage = async ({ image, insecure, tag }) => {
    const pamram = this.getImageParam()
    this.setState({ selectedLoading: true })
    const imageDetail = await this.store.getImageDetail({
      image: `${image}:${tag || 'lastest'}`,
      secret: this.secret,
      insecure,
      ...pamram,
    })

    this.setState({ selectedLoading: false })
    return imageDetail
  }

  getImageList = async ({ imageName, insecure, page, ...params }) => {
    const resourceParams = this.getImageParam()
    const currentImage = imageName || this.image

    const resTagList = await this.store.getImageTagList({
      repository: currentImage,
      insecure,
      page,
      secret: this.secret,
      ...params,
      ...resourceParams,
    })

    if (params.more) {
      // update page
      this.setState({ imageTagList: resTagList })
    }

    return resTagList
  }

  getImageDetail = debounce(
    async ({ image, insecure, secret }) => {
      if (!image || this.isUnMounted) {
        return
      }

      this.image = image
      this.setState({ isLoading: true })

      const params = this.getImageParam()
      const { imageName, tag } = this.getTag(image)

      let imageDetail

      if (tag && tag !== 'latest') {
        imageDetail = await this.store.getImageDetail({
          image: `${imageName}:${tag}`,
          insecure,
          ...params,
          secret,
        })

        this.store.updateTagList({
          data: [tag],
          total: 1,
          limit: Number(params.limit) || 10,
          page: Number(params.page) || 1,
          isLoading: false,
        })

        this.setState(
          {
            isLoading: false,
            selectedImageTag: tag,
            selectedImage: {
              ...imageDetail,
              image: `${imageName}:${tag}`,
            },
          },
          () => {
            set(
              this.props.formTemplate,
              'image',
              this.state.selectedImage.image
            )
            this.context.setImageDetail &&
              this.context.setImageDetail(this.state.selectedImage)
          }
        )
      } else {
        await this.getImageList({
          imageName,
          page: 1,
          ...params,
        })

        this.setState({
          selectedImage: undefined,
          selectedImageTag: '',
          isLoading: false,
        })
      }
    },
    800,
    {
      leading: true,
      trailing: false,
    }
  )

  renderWaringText = () => {
    return <p>{t('IGNORE_CERT_WARN_DESC')}</p>
  }

  onSelectImageTag = throttle(
    async tag => {
      this.setState({ selectedImageTag: tag })
      const currentImage = this.image
      const { imageName } = this.getTag(currentImage)
      const newImage = `${imageName}:${tag}`

      const imageDetail = await this.getImage({
        image: imageName,
        tag,
      })

      set(this.props.formTemplate, 'image', newImage)

      this.setState(
        {
          selectedImage: {
            ...imageDetail,
            image: newImage,
          },
        },
        () => {
          this.context.setImageDetail &&
            this.context.setImageDetail(this.state.selectedImage)
        }
      )
    },
    300,
    { leading: false, trailing: true }
  )

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

    const { selectedImage, selectedImageTag, selectedLoading } = this.state

    const tagList = toJS(this.store.tagList)

    if (isObject(selectedImage)) {
      const { message, status } = selectedImage

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
      } = selectedImage

      const registry =
        image.indexOf('/') > -1 ? image.split('/')[0] : 'docker.io'
      const ports = exposedPorts.join('; ')
      const _message = message || short_description

      return (
        <>
          <div className={styles.selectedContent}>
            <Loading spinning={selectedLoading}>
              <div className={styles.selectedImageInfo}>
                <div className={styles.selectedInfo}>
                  <img
                    className={styles.logo}
                    src={logo || '/assets/no_img.svg'}
                    alt={image}
                  />
                  <div className={styles.imageInfo}>
                    <p>{image}</p>
                    <p>
                      {t('IMAGE_TIME_SIZE_LAYER', {
                        time: moment(createTime).fromNow(),
                      })}
                    </p>
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
            </Loading>
            {_message ? <div className={styles.message}>{_message}</div> : null}
            <ImageTagRadioList
              onSelectImageTag={this.onSelectImageTag}
              selectedImageTag={selectedImageTag}
              tagList={tagList}
              getImageList={this.getImageList}
            />
          </div>
        </>
      )
    }

    if (tagList.data.length > 0) {
      return (
        <ImageTagRadioList
          onSelectImageTag={this.onSelectImageTag}
          selectedImageTag={selectedImageTag}
          tagList={toJS(this.store.tagList)}
          getImageList={this.getImageList}
        />
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
