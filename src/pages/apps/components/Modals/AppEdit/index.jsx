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
import { observer } from 'mobx-react'
import { get, set, pick, debounce, cloneDeep } from 'lodash'
import { Columns, Column } from '@kube-design/components'
import { Modal } from 'components/Base'

import AppBaseEdit from 'apps/components/Forms/AppBaseEdit'
import ScreenshotsEdit from 'apps/components/Cards/ScreenshotsEdit'
import ReadmeEdit from 'apps/components/Cards/ReadmeEdit'

import CategoryStore from 'stores/openpitrix/category'
import FileStore from 'stores/openpitrix/file'

import styles from './index.scss'

@observer
export default class AppEdit extends Component {
  static propTypes = {
    store: PropTypes.object,
    detail: PropTypes.object,
    visible: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
  }

  static defaultProps = {
    store: {},
    detail: {},
    visible: false,
    onOk() {},
    onCancel() {},
  }

  constructor(props) {
    super(props)

    this.store = this.props.store
    this.categoryStore = new CategoryStore()
    this.fileStore = new FileStore()

    this.formRef = React.createRef()

    this.state = {
      detail: cloneDeep(toJS(this.props.detail)),
      oldScreenshots: get(this.props.detail, 'screenshots'),
    }
  }

  componentDidMount() {
    this.categoryStore.fetchList({ noLimit: true })
  }

  handleAppChange = debounce((value, name) => {
    const { detail } = this.state
    const newDetail = cloneDeep(detail)
    set(newDetail, name, value)
    this.setState({
      detail: newDetail,
    })
  }, 200)

  handleOk = async () => {
    const formData = pick(this.state.detail, [
      'app_id',
      'name',
      'abstraction',
      'description',
      'home',
      'category_id',
      'readme',
      'workspace',
    ])

    const form = this.formRef.current
    form && form.validate(() => this.props.onOk(formData))
  }

  onCancel = () => {
    const screenshots = this.state.oldScreenshots
    this.handleAppChange(screenshots, 'screenshots')
    this.props.onCancel()
  }

  render() {
    const { visible, isSubmitting, onCancel, ...rest } = this.props
    const categories = toJS(get(this.categoryStore, 'list.data', []))
    const { detail } = this.state

    return (
      <Modal
        {...rest}
        className={styles.modal}
        bodyClassName={styles.body}
        onOk={this.handleOk}
        onCancel={this.onCancel}
        visible={visible}
        isSubmitting={isSubmitting}
        fullScreen
      >
        <Columns className="height-full is-gapless">
          <Column className="is-narrow">
            <AppBaseEdit
              store={this.store}
              formData={detail}
              categories={categories}
              fileStore={this.fileStore}
              formRef={this.formRef}
              handleChange={this.handleAppChange}
            />
          </Column>
          <Column>
            <ScreenshotsEdit
              handleChange={this.handleAppChange}
              store={this.store}
              detail={detail}
              fileStore={this.fileStore}
            />
            <ReadmeEdit
              handleChange={this.handleAppChange}
              store={this.store}
              detail={detail}
            />
          </Column>
        </Columns>
      </Modal>
    )
  }
}
