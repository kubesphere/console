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
import PropTypes from 'prop-types'

import {
  Button,
  Icon,
  Select,
  Input,
  Tooltip,
  Popper,
} from '@kube-design/components'

import { isEmpty } from 'lodash'

import styles from './index.scss'

const MOUNT_OPTIONS = [
  { label: 'READ_AND_WRITE', value: 'false' },
  { label: 'READ_ONLY', value: 'true' },
  { label: 'NOT_MOUNT', value: 'null' },
]

export default class Item extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    container: PropTypes.string,
    value: PropTypes.object,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    name: '',
    value: {},
    supportedAccessModes: [],
    onChange() {},
  }

  state = {
    visible: false,
    subPath: this.props.value.subPath,
    defaultSubPath: this.props.value.subPath,
  }

  static getDerivedStateFromProps(props, state) {
    if (props.value.subPath !== state.defaultSubPath) {
      return {
        subPath: props.value.subPath,
        defaultSubPath: props.value.subPath,
      }
    }
    return null
  }

  getMountOptions() {
    const { supportedAccessModes } = this.props

    const hasAccessModes = mode =>
      isEmpty(supportedAccessModes) || supportedAccessModes.includes(mode.label)

    const setMountOptions = item => ({
      label: t(item.label),
      value: item.value,
    })

    return MOUNT_OPTIONS.filter(hasAccessModes).map(setMountOptions)
  }

  handleSelectChange = newValue => {
    const { value, container, onChange } = this.props

    onChange({
      ...value,
      readOnly: newValue,
      containerName: container,
      mountPath: newValue === 'null' ? '' : value.mountPath,
    })
  }

  handleMountPathChange = e => {
    const { value, container, onChange } = this.props

    onChange({ ...value, mountPath: e.target.value, containerName: container })
  }

  handleSubPathChange = e => {
    this.setState({ subPath: e.target.value })
  }

  handleSubPathSave = () => {
    const { value, container, onChange } = this.props
    const { subPath } = this.state

    onChange({
      ...value,
      subPath,
      containerName: container,
    })
    this.setState({ visible: false })
  }

  handleLogPathChange = e => {
    const { value, container, onChange } = this.props

    onChange({ ...value, logPath: e.target.value, containerName: container })
  }

  showSubPathForm = () => {
    this.setState({ visible: true })
  }

  hideSubPathForm = () => {
    this.setState({ subPath: this.props.value.subPath, visible: false })
  }

  renderLogPathTip() {
    return (
      <div>
        <p>{t.html('CONTAINER_LOG_PATH_TIP')}</p>
      </div>
    )
  }

  renderSubPathForm() {
    return (
      <div className={styles.subForm}>
        <div className={styles.formTitle}>
          <div>{t('SPECIFY_SUBPATH')}</div>
          <p>{t.html('SPECIFY_SUBPATH_TIP')}</p>
        </div>
        <div className={styles.formContent}>
          <div className={styles.subPath}>
            <div className={`control has-icons-left has-icons-right`}>
              <Icon className="is-left" name="textfield" size={20} />
              <Input
                name="subPath"
                defaultValue={this.state.subPath}
                placeholder={t('SUBPATH')}
                onChange={this.handleSubPathChange}
              />
            </div>
          </div>
        </div>
        <div className={styles.formFooter}>
          <Button onClick={this.hideSubPathForm}>{t('CANCEL')}</Button>
          <Button type="control" onClick={this.handleSubPathSave}>
            {t('OK')}
          </Button>
        </div>
      </div>
    )
  }

  renderSubPathTip() {
    return (
      <div>
        <div className="tooltip-title">{t('SPECIFY_SUBPATH')}</div>
        <p>{t.html('SPECIFY_SUBPATH_TIP')}</p>
      </div>
    )
  }

  renderSubPath() {
    const { value } = this.props
    const { visible } = this.state

    if (!value || !value.mountPath) {
      return null
    }

    if (visible) {
      return (
        <Popper
          className={styles.popper}
          trigger="click"
          visible={visible}
          placement="bottom"
          closeAfterClick={false}
          content={this.renderSubPathForm()}
          onClose={this.hideSubPathForm}
        >
          {value.subPath ? (
            <div className={styles.subPathText}>{value.subPath}</div>
          ) : (
            <Icon className="is-right" name="textfield" size={20} clickable />
          )}
        </Popper>
      )
    }

    return (
      <Tooltip content={this.renderSubPathTip()}>
        {value.subPath ? (
          <div className={styles.subPathText} onClick={this.showSubPathForm}>
            {value.subPath}
          </div>
        ) : (
          <Icon
            className="is-right"
            name="textfield"
            size={20}
            clickable
            onClick={this.showSubPathForm}
          />
        )}
      </Tooltip>
    )
  }

  render() {
    const { value, container, collectSavedLog } = this.props

    return (
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <Icon name="docker" size={20} />
          {container}
        </div>
        <Select
          name="readOnly"
          className={styles.readOnly}
          value={value.readOnly}
          options={this.getMountOptions()}
          onChange={this.handleSelectChange}
        />
        <div
          className={`control has-icons-left has-icons-right ${styles.mountPath}`}
        >
          <Icon className="is-left" name="mgmt-node" size={20} />
          <Input
            name="mountPath"
            defaultValue={value.mountPath}
            disabled={value.readOnly === 'null'}
            placeholder={t('MOUNT_PATH')}
            onChange={this.handleMountPathChange}
          />
          {this.renderSubPath()}
        </div>
        {collectSavedLog === 'true' && value.readOnly === 'false' && (
          <>
            <div
              className={`control has-icons-left has-icons-right ${styles.logPath}`}
            >
              <Icon className="is-left" name="log" size={20} />
              <Input
                name="logPath"
                defaultValue={value.logPath}
                disabled={value.readOnly === 'null'}
                placeholder={t('CONTAINER_LOG_PATH')}
                onChange={this.handleLogPathChange}
              />
            </div>
            <Tooltip content={this.renderLogPathTip()}>
              <Icon className={styles.icon} name="question" size={20} />
            </Tooltip>
          </>
        )}
      </div>
    )
  }
}
