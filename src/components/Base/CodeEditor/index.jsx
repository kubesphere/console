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

import React, { lazy, Suspense, PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Loading } from '@kube-design/components'

import styles from './index.scss'

const AceEditor = lazy(() =>
  import(/* webpackChunkName: "react-ace" */ './AceEditor')
)

class CodeEditor extends PureComponent {
  static propTypes = {
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    mode: PropTypes.string,
    options: PropTypes.object,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    value: {},
    mode: 'yaml',
    options: {},
    onChange() {},
  }

  render() {
    const { className, mode, options, value, onChange } = this.props

    return (
      <Suspense fallback={<Loading className="ks-page-loading" />}>
        <AceEditor
          {...options}
          className={classnames(styles.editor, className)}
          value={value}
          mode={mode}
          onChange={onChange}
        />
      </Suspense>
    )
  }
}

export default CodeEditor
