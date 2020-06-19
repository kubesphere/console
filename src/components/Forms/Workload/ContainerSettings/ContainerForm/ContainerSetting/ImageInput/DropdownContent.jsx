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
import { get, set, isEmpty } from 'lodash'
import classnames from 'classnames'
import { Icon, Loading } from '@pitrix/lego-ui'
import { Search } from 'components/Base'
import Select from './Select'
import Input from './Input'

import styles from './index.scss'

export default class DropdownContent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dockerList: [],
      visible: false,
      isLoading: false,
    }
    this.store = props.store
    this.dropContentRef = React.createRef()
  }

  static defaultProps = {
    imageRegistries: [],
    className: '',
    value: '',
    onChange: () => {},
  }

  get secretValue() {
    const { formTemplate } = this.props
    return get(formTemplate, 'pullSecret', '')
  }

  get registryUrl() {
    const { imageRegistries } = this.props
    if (!isEmpty(imageRegistries) && this.secretValue) {
      const selectedSecret = imageRegistries.find(
        item => item.value === this.secretValue
      )

      let url = get(selectedSecret, 'url', '')
      if (url) {
        // remove url scheme
        url = url.replace(/^(http(s)?:\/\/)?(.*)$/, '$3')
        return url
      }
    }

    return ''
  }

  get imageName() {
    const { value } = this.props

    if (value.startsWith(this.registryUrl)) {
      const reg = new RegExp(`${this.registryUrl}(/)?`)
      return value.replace(reg, '')
    }
    return value
  }

  get secretsOptions() {
    const { imageRegistries } = this.props

    const options = imageRegistries.map(item => ({
      label: `${item.url} (${item.value})`,
      value: item.value,
      url: item.url,
    }))
    return [{ label: `DockerHub`, value: '', url: '' }, ...options]
  }

  componentDidMount() {
    this.fetchDockerList()
  }

  componentWillUnmount() {
    this.isUnMounted = true
    document.removeEventListener('click', this.handleDOMClick)
  }

  handleDOMClick = e => {
    if (
      this.dropContentRef &&
      this.dropContentRef.current &&
      !this.dropContentRef.current.contains(e.target)
    ) {
      this.hideContent()
    }
  }

  showContent = () => {
    this.setState({ visible: true }, () => {
      document.addEventListener('click', this.handleDOMClick)
    })
  }

  hideContent = () => {
    this.setState({ visible: false }, () => {
      document.removeEventListener('click', this.handleDOMClick)
    })
  }

  handleDetailRedirect = e => {
    const { image } = e.currentTarget.dataset

    window.open(`https://hub.docker.com/_/${image}`)
  }

  handleSecretChange = value => {
    const { formTemplate } = this.props
    set(formTemplate, 'pullSecret', value)
    this.props.onChange(this.registryUrl)
  }

  handleInputChange = (e, value) => {
    let image = value
    if (this.registryUrl) {
      image = `${this.registryUrl}/${value}`.replace(/\/+/g, '/')
    }
    image = image.replace(/\s+/g, '')
    this.props.onChange(image)
  }

  handleKeyUp = e => {
    if (e.keyCode === 13) {
      this.handleConfirm()
    }
  }

  handleConfirm = () => {
    if (this.imageName) {
      this.props.onEnter()
    }
  }

  handleImageSelected = async e => {
    const { image, logo, short_description } = e.currentTarget.dataset
    this.props.onChange(image)
    this.hideContent()
    this.props.onEnter({ logo, short_description })
  }

  handleSearch = keyword => {
    this.fetchDockerList(keyword)
  }

  fetchDockerList = async keyword => {
    this.setState({ isLoading: true })
    const result = await this.store
      .getDockerImagesLists({
        q: keyword,
        image_filter: keyword ? undefined : 'official',
        page_size: 50,
        type: 'image',
      })
      .finally(() => {
        !this.isUnMounted && this.setState({ isLoading: false })
      })
    !this.isUnMounted &&
      this.setState({ dockerList: get(result, 'summaries', []) })
  }

  renderContent = () => (
    <div
      className={classnames(styles.dropContent, {
        [styles.dropContent_hide]: !this.state.visible,
      })}
      ref={this.dropContentRef}
    >
      <div className={styles.header}>
        <Search
          className={styles.search}
          onSearch={this.handleSearch}
          placeholder={t('SEARCH_IMAGE_PLACEHOLDER')}
        />
        {this.state.isLoading && <Loading className="float-left" size={28} />}
      </div>
      {this.renderDockerList()}
    </div>
  )

  renderDockerList() {
    if (isEmpty(this.state.dockerList)) {
      return (
        <ul className={styles.listContent}>
          <div
            className={classnames(styles.selectedContent, styles.emptyContent)}
          >
            <Icon name="docker" className={styles.icon} />
            <p className={styles.desc}>{t('Not found this image')}</p>
          </div>
        </ul>
      )
    }

    return (
      <ul className={styles.listContent}>
        {this.state.dockerList.map(image => (
          <li className={styles.ImageItem} key={image.name}>
            <img
              src={get(image, 'logo_url.large') || '/assets/no_img.svg'}
              alt={image.name}
            />
            <div className={styles.info}>
              <p
                onClick={this.handleImageSelected}
                className={styles.clickable}
                data-image={image.slug}
                data-logo={get(image, 'logo_url.large', '')}
                data-short_description={image.short_description}
              >
                {image.name}
              </p>
              <p>{image.short_description}</p>
            </div>
            <div className={styles.starContainer}>
              <Icon className={styles.star} name="star" />
              {image.star_count}
            </div>
            <div className={styles.actions}>
              <span
                className={styles.clickable}
                onClick={this.handleDetailRedirect}
                data-image={image.slug}
              >
                <Icon name="paper" size={16} changeable />
              </span>
              <span
                className={styles.clickable}
                onClick={this.handleImageSelected}
                data-image={image.slug}
                data-logo={get(image, 'logo_url.large', '')}
                data-short_description={image.short_description}
              >
                <Icon name="check" size={16} changeable />
              </span>
            </div>
          </li>
        ))}
      </ul>
    )
  }

  render() {
    return (
      <>
        <Input
          className={styles.imageInput}
          onChange={this.handleInputChange}
          value={this.imageName}
          autoComplete="off"
          placeholder={
            this.secretValue ? 'nginx:latest' : t('IMAGE_PLACEHOLDER')
          }
          onBlur={this.handleConfirm}
          onKeyUp={this.handleKeyUp}
        >
          <Select
            value={this.secretValue}
            className={styles.secretSelect}
            options={this.secretsOptions}
            onChange={this.handleSecretChange}
            disabled={this.secretsOptions.length <= 1}
          />
        </Input>
        {this.secretValue || !globals.config.enableImageSearch ? null : (
          <Icon
            name="templet"
            changeable
            className={styles.dropDownIcon}
            onClick={this.showContent}
          />
        )}
        {this.renderContent()}
      </>
    )
  }
}
