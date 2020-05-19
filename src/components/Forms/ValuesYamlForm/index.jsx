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
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { map, get, set } from 'lodash'
import {
  TextArea,
  Field,
  Control,
  Label,
  Slider,
  InputNumber,
  Input,
  Toggle,
} from '@pitrix/lego-ui'
import { Form } from 'components/Base'

import styles from './index.scss'

@observer
export default class ValuesYamlForm extends React.Component {
  static propTypes = {
    json: PropTypes.object,
    yaml: PropTypes.object,
    onValuesChange: PropTypes.func,
  }

  static defaultProps = {
    onValuesChange() {},
  }

  constructor(props) {
    super(props)
    this.state = {
      editYaml: { ...props.yaml } || {},
    }
  }

  handleFormChange(editYaml) {
    this.setState({ editYaml })
    this.props.onValuesChange(editYaml)
  }

  generateMarks = (min, max) => {
    const n = 5
    const step = parseInt((max - min) / n, 10)
    const o = {}
    for (let i = 0; i < n; i++) {
      const v = min + i * step
      o[v] = v
    }
    o[max] = max
    return o
  }

  renderFormItem = (propObj, propPath) => {
    const { editYaml } = this.state
    const attrs = {
      defaultValue: get(editYaml, propPath, ''),
      disabled:
        typeof propObj.hidden === 'object'
          ? get(editYaml, propObj.hidden.value, null) ===
            propObj.hidden.condition
          : get(editYaml, propObj.hidden, false),
      onChange: v => this.handleFormChange(set(editYaml, propPath, v)),
    }
    switch (propObj.type) {
      case 'string':
        if (propObj.render === 'slider') {
          return (
            <Field style={{ alignItems: 'center' }}>
              <Control className={styles.slider}>
                <Slider
                  {...attrs}
                  hasTooltip
                  markDots
                  min={0}
                  // min={propObj.sliderMin}
                  max={propObj.sliderMax}
                  onChange={v =>
                    this.handleFormChange(
                      set(
                        editYaml,
                        propPath,
                        v < propObj.sliderMin ? propObj.sliderMin : v
                      )
                    )
                  }
                  marks={this.generateMarks(0, propObj.sliderMax)}
                  defaultValue={parseInt(get(editYaml, propPath, 0), 10)}
                  value={parseInt(get(editYaml, propPath, 0), 10)}
                  tipFormatter={value => `${value} ${propObj.sliderUnit}`}
                />
              </Control>
              <Control>
                <InputNumber
                  {...attrs}
                  isMini
                  size="small"
                  min={propObj.sliderMin}
                  max={propObj.sliderMax}
                  defaultValue={parseInt(get(editYaml, propPath, 0), 10)}
                  value={parseInt(get(editYaml, propPath, 0), 10)}
                  onChange={v => {
                    this.handleFormChange(
                      set(
                        editYaml,
                        propPath,
                        v < propObj.sliderMin
                          ? propObj.sliderMin
                          : v > propObj.sliderMax
                          ? propObj.sliderMax
                          : v
                      )
                    )
                  }}
                />
              </Control>
              <Control style={{ marginLeft: 10 }}>
                <Label>{propObj.sliderUnit}</Label>
              </Control>
            </Field>
          )
        } else if (propObj.render === 'textArea') {
          return <TextArea {...attrs} />
        }
        return <Input {...attrs} />
      case 'integer':
        return <InputNumber {...attrs} />
      case 'boolean':
        return (
          <div style={{ display: 'flex' }}>
            <Toggle
              {...attrs}
              defaultChecked={get(editYaml, propPath, false)}
            />
            <div style={{ paddingLeft: 12 }}>
              <label className={styles.subtitle}>{propObj.title}</label>
              <p style={{ color: '#79879c' }}>{propObj.description}</p>
            </div>
          </div>
        )
      case 'array':
        return <></>
      default:
        return <></>
    }
  }

  renderSchemaForm = (propObj, propKey = '', propPath = []) => {
    const { type, form } = propObj

    if (type === 'object') {
      return (
        <div key={propKey} className={form ? styles.subform : styles.group}>
          {propObj.title && (
            <div className={[styles.col, 'h6'].join(' ')}>{propObj.title}</div>
          )}
          {propObj.description && (
            <p className={styles.col}>{propObj.description}</p>
          )}
          {map(propObj.properties, (v, k) =>
            this.renderSchemaForm(v, k, [...propPath, k])
          )}
        </div>
      )
    }
    return (
      form && (
        <Form.Item
          className={
            (type === 'string' && propObj.render !== 'slider') ||
            type === 'integer'
              ? styles.colhalf
              : styles.col
          }
          key={propKey}
          // label={propObj.title}
          // desc={propObj.description}
          label={propObj.type === 'boolean' ? '' : propObj.title}
          desc={propObj.type === 'boolean' ? '' : propObj.description}
        >
          {this.renderFormItem(propObj, propPath)}
        </Form.Item>
      )
    )
  }

  render() {
    const { schema } = this.props
    return <Form>{this.renderSchemaForm(schema)}</Form>
  }
}
