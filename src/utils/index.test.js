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
import { mount } from 'enzyme'
import {
  isAppsPage,
  withDryRun,
  generateId,
  formatSize,
  formatUsedTime,
  flattenObject,
  joinSelector,
  safeParseJSON,
  isSystemRole,
  to,
  capitalize,
  getQueryString,
  getFilterString,
  isValidLabel,
  updateLabels,
  mergeLabels,
  withProps,
  composeComponent,
  cpuFormat,
  memoryFormat,
  cacheFunc,
  getWebSocketProtocol,
  hasChinese,
  getResourceCreator,
  getDescription,
  getDisplayName,
  getAliasName,
  getDocsUrl,
  getBrowserLang,
  toPromise,
  getLanguageName,
  parseUrl,
  replaceToLocalOrigin,
  formatDuration,
} from './index'

it('formatSize', () => {
  expect(formatSize(1000)).toBe('1000 B')
  expect(formatSize(128012010202)).toBe('119.22 GB')
  expect(formatSize('128012010202')).toBe('128012010202')
})

it('formatUsedTime', () => {
  expect(formatUsedTime(900)).toBe('900 ms')
  expect(formatUsedTime(50000)).toBe('50.00 s')
  expect(formatUsedTime(3000000)).toBe('50.00 min')
  expect(formatUsedTime(30000000)).toBe('8.33 h')
})

it('flattenObject', () => {
  const data = {
    a: {
      b: { c: 1, d: 2 },
      e: {},
      f: [],
      g: ['x', 'y', 'z'],
      'h.i': 'j',
      l: null,
    },
  }
  expect(flattenObject(data)).toStrictEqual({
    'a.b.c': 1,
    'a.b.d': 2,
    'a.f': [],
    'a.g[0]': 'x',
    'a.g[1]': 'y',
    'a.g[2]': 'z',
    'a.e': {},
    "a['h.i']": 'j',
    'a.l': null,
  })
})

it('generateId', () => {
  expect(generateId()).toHaveLength(6)
  expect(generateId(10)).toHaveLength(10)
})

it('joinSelector', () => {
  expect(joinSelector({ app: 'redis', version: 'v1' })).toBe(
    'app=redis,version=v1'
  )
  expect(joinSelector()).toBe('')
})

it('safeParseJSON', () => {
  const correctJSON = '{"aaa":"bbb","ccc":"ddd"}'
  expect(safeParseJSON(correctJSON)).toStrictEqual(JSON.parse(correctJSON))
  const errorJSON = '{"aaa":"bbb","ccc""ddd"}'
  expect(safeParseJSON(errorJSON)).toBe(undefined)
  expect(safeParseJSON(errorJSON, {})).toStrictEqual({})
})

it('isSystemRole', () => {
  expect(isSystemRole('system:xxx')).toBe(true)
  expect(isSystemRole('xsystem:xxx')).toBe(false)
})

it('to', async () => {
  const prom1 = new Promise(resolve => {
    resolve('a')
  })
  const data1 = await to(prom1)
  expect(data1).toBe('a')

  const prom2 = new Promise((resolve, reject) => {
    reject()
  })
  const data2 = await to(prom2)
  expect(data2).toStrictEqual([])
})

it('capitalize', () => {
  expect(capitalize('aBBcd')).toBe('Abbcd')
})

it('getQueryString', () => {
  expect(getQueryString({ a: '', b: 'xxx', c: 'yyy' })).toBe('b=xxx&c=yyy')
})

it('getFilterString', () => {
  expect(getFilterString({ label: 'xxx', name: '', tag: 'yyy' })).toBe(
    'label~xxx,tag=yyy'
  )
})

it('isValidLabel', () => {
  expect(isValidLabel({ app: 'redis' })).toBe(true)
  expect(
    isValidLabel({
      [`kubesphere.io/creator${Array(260)
        .fill('a')
        .join('')}`]: 'aaa',
    })
  ).toBe(false)
  expect(
    isValidLabel({
      [Array(64)
        .fill('a')
        .join('')]: 'app',
    })
  ).toBe(false)
  expect(isValidLabel({ app: 'redis', 'aax!xax': '909`~aa' })).toBe(false)
})

it('updateLabels', () => {
  const formTemplate = { Deployment: {}, CronJob: {}, Ingress: {} }
  const value = { app: 'redis' }

  updateLabels(formTemplate, 'deployments', value)
  updateLabels(formTemplate, 'cronjobs', value)
  updateLabels(formTemplate, 'ingresses', value)

  expect(formTemplate.Deployment).toStrictEqual({
    metadata: { labels: { app: 'redis' } },
    spec: {
      selector: { matchLabels: { app: 'redis' } },
      template: { metadata: { labels: { app: 'redis' } } },
    },
  })

  expect(formTemplate.CronJob).toStrictEqual({
    metadata: { labels: { app: 'redis' } },
    spec: {
      jobTemplate: { metadata: { labels: { app: 'redis' } } },
      template: { metadata: { labels: { app: 'redis' } } },
    },
  })

  expect(formTemplate.Ingress).toStrictEqual({
    metadata: { labels: { app: 'redis' } },
  })
})

it('mergeLabels', () => {
  const formData1 = { kind: 'Deployment' }
  const labels = { app: 'redis' }
  mergeLabels(formData1, labels)
  expect(formData1).toStrictEqual({
    kind: 'Deployment',
    metadata: { labels: { app: 'redis' } },
    spec: {
      selector: { matchLabels: { app: 'redis' } },
      template: { metadata: { labels: { app: 'redis' } } },
    },
  })

  const formData2 = { kind: 'Service' }
  mergeLabels(formData2, labels)
  expect(formData2).toStrictEqual({
    kind: 'Service',
    metadata: { labels: { app: 'redis' } },
    spec: { selector: { app: 'redis' } },
  })

  const formData3 = {
    kind: 'Service',
    metadata: { labels: { app: 'redis2', name: 'xxx' } },
  }
  mergeLabels(formData3, labels)
  expect(formData3).toStrictEqual({
    kind: 'Service',
    metadata: { labels: { app: 'redis', name: 'xxx' } },
    spec: { selector: { app: 'redis' } },
  })

  const formData4 = { kind: 'Ingress' }
  mergeLabels(formData4, labels)
  expect(formData4).toStrictEqual({
    kind: 'Ingress',
    metadata: { labels: { app: 'redis' } },
  })

  const formData6 = {}
  mergeLabels(formData6, labels)
  expect(formData6).toStrictEqual(formData6)
})

it('withProps', () => {
  const Test = () => <div>xxx</div>
  const Component = withProps(Test, { name: 'app' })
  const ele = mount(<Component name2="app2" />)
  expect(ele.find(Test)).toHaveProp({
    name: 'app',
    name2: 'app2',
  })
})

it('composeComponent', () => {
  const Test1 = () => <div>xxx</div>
  const Test2 = () => <div>yyy</div>
  const Component = composeComponent(Test1, Test2)

  const ele = mount(<Component name="app" />)

  expect(ele.find(Test1)).toHaveProp({ name: 'app' })
  expect(ele.find(Test2)).toHaveProp({ name: 'app' })
})

it('cpuFormat', () => {
  expect(cpuFormat(undefined)).toBe(undefined)
  expect(cpuFormat(null)).toBe(null)
  expect(cpuFormat('2')).toBe(2)
  expect(cpuFormat('2', 'm')).toBe(2000)
  expect(cpuFormat('1981289121m', 'k')).toBe(1981.289)
})

it('memoryFormat', () => {
  expect(memoryFormat(undefined)).toBe(undefined)
  expect(memoryFormat(null)).toBe(null)
  expect(memoryFormat('2Gi')).toBe(2048)
  expect(memoryFormat('2Gi', 'Gi')).toBe(2)
  expect(memoryFormat('1981289121m', 'ki')).toBe(1934.853)
})

it('cacheFunc', () => {
  const context = {}
  const fn1 = () => {}
  const fn2 = () => {}
  let newFn = cacheFunc('createModal', fn1, context)
  expect(newFn).toStrictEqual(fn1)
  newFn = cacheFunc('createModal', fn2, context)
  expect(newFn).toStrictEqual(fn1)
})

it('get metadata info', () => {
  const data = {
    metadata: {
      annotations: {
        creator: 'system',
        desc: 'system',
        displayName: 'system-redis',
        'kubesphere.io/creator': 'admin',
        'kubesphere.io/description': 'admin',
        'kubesphere.io/alias-name': 'redis',
      },
    },
  }
  const data2 = {
    metadata: {
      annotations: {
        creator: 'system',
        desc: 'system',
        displayName: 'system-redis',
      },
    },
  }

  expect(getResourceCreator({})).toBe('')
  expect(getResourceCreator(data)).toBe('admin')
  expect(getResourceCreator(data2)).toBe('system')
  expect(getDescription({})).toBe('')
  expect(getDescription(data)).toBe('admin')
  expect(getDescription(data2)).toBe('system')
  expect(getAliasName({})).toBe('')
  expect(getAliasName(data)).toBe('redis')
  expect(getAliasName(data2)).toBe('system-redis')

  const data3 = {
    name: 'redis-xxx',
    aliasName: 'redis',
  }
  const data4 = {
    display_name: 'redis-xxx',
  }
  const data5 = {
    name: 'redis-xxx',
  }
  expect(getDisplayName({})).toBe('')
  expect(getDisplayName(data3)).toBe('redis-xxx(redis)')
  expect(getDisplayName(data4)).toBe('redis-xxx')
  expect(getDisplayName(data5)).toBe('redis-xxx')
})

it('getWebSocketProtocol', () => {
  expect(getWebSocketProtocol('https')).toBe('wss')
  expect(getWebSocketProtocol('http')).toBe('ws')
})

it('getDocsUrl', () => {
  expect(getDocsUrl('deploymentsx')).toBe('')
  expect(getDocsUrl('deployments').length > 1).toBe(true)
})

it('hasChinese', () => {
  expect(hasChinese('中文')).toBe(true)
  expect(hasChinese('en')).toBe(false)
})

it('getBrowserLang', () => {
  const languageGetter = jest.spyOn(window.navigator, 'language', 'get')

  languageGetter.mockReturnValue('en-US')
  expect(getBrowserLang()).toBe('en')
  languageGetter.mockReturnValue('zh-CN')
  expect(getBrowserLang()).toBe('zh')
  languageGetter.mockReturnValue('de')
  expect(getBrowserLang()).toBe('en')

  languageGetter.mockReturnValue(undefined)
  window.navigator.browserLanguage = 'zh-CN'
  expect(getBrowserLang()).toBe('zh')
})

it('toPromise', async () => {
  const mockFunc = jest.fn()

  const func = clb => {
    mockFunc()
    clb()
  }

  await toPromise(func)

  expect(mockFunc).toHaveBeenCalledTimes(1)
})

it('getLanguageName', () => {
  expect(getLanguageName()).toBe('')
  expect(getLanguageName('ruby')).toBe('ruby')
  expect(getLanguageName('rust')).toBe(undefined)
})

it('parseUrl', () => {
  expect(
    parseUrl(
      'https://github.com/FormidableLabs/enzyme-matchers/tree/master/packages/jest-enzyme?a=a&b=b#tohaveprop'
    )
  ).toStrictEqual({
    hash: '#tohaveprop',
    host: 'github.com',
    hostname: 'github.com',
    href:
      'https://github.com/FormidableLabs/enzyme-matchers/tree/master/packages/jest-enzyme?a=a&b=b#tohaveprop',
    origin: 'https://github.com',
    pathname:
      '/FormidableLabs/enzyme-matchers/tree/master/packages/jest-enzyme',
    port: '',
    protocol: 'https:',
    search: '?a=a&b=b',
  })

  expect(parseUrl('a231e12')).toStrictEqual({})
})

it('replaceToLocalOrigin', () => {
  expect(
    replaceToLocalOrigin('https://github.com/FormidableLabs/enzyme-matchers')
  ).toBe('http://localhost/FormidableLabs/enzyme-matchers')
})

it('withDryRun', async () => {
  const requests = [
    {
      data: { metadata: { name: 'aaa' } },
      url: 'api/v1/namespacex',
    },
    {
      data: { metadata: { name: 'bbb' } },
      url: 'api/v1/namespacex',
    },
  ]
  await withDryRun(requests)
  expect(request.post).toHaveBeenCalledTimes(4)
})

it('isAppsPage', () => {
  expect(isAppsPage()).toBe(false)
  expect(isAppsPage('/apps')).toBe(true)
  expect(isAppsPage('/apps/app-ix7aus9')).toBe(true)
  expect(isAppsPage('/app')).toBe(false)
})

it('formatDuration', () => {
  expect(formatDuration('6m')).toBe(360)
  expect(formatDuration('1h')).toBe(3600)
  expect(formatDuration('1.5d')).toBe(129600)
  expect(formatDuration('6m', 'h')).toBe(0.1)
})
