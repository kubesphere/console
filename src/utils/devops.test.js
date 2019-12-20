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

import { getLanguageIcon, groovyToJS } from './devops'

it('getLanguageIcon', () => {
  expect(getLanguageIcon('rust', 'none')).toBe('none')
  expect(getLanguageIcon('nodejs', 'none')).toBe('nodejs')
})

it('groovyToJS', () => {
  const result = groovyToJS(
    // eslint-disable-next-line no-template-curly-in-string
    "${[usernamePassword(credentialsId : 'admin' ,passwordVariable : 'password' ,usernameVariable : 'username' ,)]}"
  )
  expect(Object.keys(result)).toHaveLength(3)

  const result1 = groovyToJS(
    "[$class: 'SubversionSCM', locations: [[cancelProcessOnExternalsFail: true,  credentialsId: 'admin', depthOption: 'infinity', ignoreExternalsOption: true, local: '.', remote: 'http://git.kubesphere.io/']], quietOperation: true, workspaceUpdater: [$class: 'UpdateUpdater']]"
  )
  expect(Object.keys(result1)).toHaveLength(10)
  expect(result1.remote).toBe('http://git.kubesphere.io/')
  expect(JSON.stringify(groovyToJS(''))).toBe('{}')
})
