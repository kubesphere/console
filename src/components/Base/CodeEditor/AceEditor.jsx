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
import AceEditor from 'react-ace'

import 'ace-builds/src-noconflict/mode-yaml'
import 'ace-builds/src-noconflict/mode-groovy'
import 'ace-builds/src-noconflict/theme-chaos'
import 'ace-builds/src-noconflict/keybinding-vscode'
import 'ace-builds/src-noconflict/ext-searchbox'

import './custom.css'

export default class AceEditorWrapper extends React.Component {
  render() {
    return (
      <AceEditor
        theme="chaos"
        width="auto"
        height="100%"
        tabSize={2}
        editorProps={{ $blockScrolling: true }}
        showPrintMargin={false}
        keyboardHandler="vscode"
        wrapEnabled
        {...this.props}
      />
    )
  }
}
