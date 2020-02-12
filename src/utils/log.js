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

import { isString } from 'lodash'

const RESERVED_WORDS_IN_EXP = /[|\\{}()[\]^$+*?.]/g

export function mark(
  originText = '',
  queryText = '',
  markLabel = 'hightLighted'
) {
  if (!isString(originText)) {
    return originText
  }
  if (!queryText) {
    return [originText]
  }

  const regexpString = queryText.replace(RESERVED_WORDS_IN_EXP, '\\$&')
  const reg = new RegExp(regexpString, 'ig')

  return markStrAsArray(originText, reg, markLabel)
}

export function markAll(originText = '', queryList = [], handler = mark) {
  if (!queryList.length) {
    return [originText]
  }

  return queryList.reduce(
    (markedResult, query) =>
      markedResult.reduce(
        (pre, result) => pre.concat(handler(result, query)),
        []
      ),
    [originText]
  )
}

const CN_REGEX = /[\u4e00-\u9fa5]/

export function esMark(
  originText = '',
  queryText = '',
  markLabel = 'hightLighted'
) {
  if (!isString(originText)) {
    return originText
  }

  const words = queryText.match(/\w+|[\u4e00-\u9fa5]/g) || []

  const regexpString = words.reduce((pre, cur) => {
    const lastString = pre.slice(-1)
    const isChineseWord = CN_REGEX.test(cur)
    const foreStringIsChinese = CN_REGEX.test(lastString)

    return `${pre}[^\\w\\u4e00-\\u9fa5]{${
      isChineseWord || foreStringIsChinese ? 0 : 1
    },}${cur}`
  }, '')

  if (!regexpString) {
    return [originText]
  }

  const reg = new RegExp(regexpString, 'ig')

  return markStrAsArray(originText, reg, markLabel)
}

export function markStrAsArray(originText, reg, markLabel = 'hightLighted') {
  const markedText = [originText]

  let lastMatchIndex = 0

  originText.replace(reg, (match, index) => {
    const lastIndex = markedText.length - 1
    const uncheckedText = markedText[lastIndex]
    const uncheckedMatchIndex = index - lastMatchIndex

    const textBeforeMatch = uncheckedText.slice(0, uncheckedMatchIndex)
    const textAfterMatch = uncheckedText.slice(
      uncheckedMatchIndex + match.length
    )

    markedText[lastIndex] = textBeforeMatch
    markedText.push({ [markLabel]: match }, textAfterMatch)
    lastMatchIndex += index + match.length
  })

  return markedText
}
