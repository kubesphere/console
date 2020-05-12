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

import { isFunction } from 'lodash'

export const hasClass = (el, className) => {
  if (el.classList) {
    return el.classList.contains(className)
  }

  return new RegExp(`(^| )${className}( |$)`, 'gi').test(el.className)
}

export const addClass = (el, className) => {
  if (!hasClass(el, className)) {
    if (el.classList) {
      el.classList.add(className)
    } else {
      el.className += ` ${className}`
    }
  }
}

export const removeClass = (el, className) => {
  if (el.classList) el.classList.remove(className)
  else
    el.className = el.className.replace(
      new RegExp(`(^|\\b)${className.split(' ').join('|')}(\\b|$)`, 'gi'),
      ' '
    )
}

export const findParent = (el, className) => {
  if (!el || !el.parentNode) {
    return null
  }

  if (hasClass(el.parentNode, className)) {
    return el.parentNode
  }

  return findParent(el.parentNode, className)
}

export function createCenterWindowOpt({ width = 800, height = 500, ...reset }) {
  const {
    width: screenWidth,
    height: screenHeight,
    availWidth,
    availHeight,
  } = window.screen

  const viewportWidth = availWidth || screenWidth
  const viewportHeight = availHeight || screenHeight

  const left = (viewportWidth - width) / 2
  const top = (viewportHeight - height) / 2

  const options = {
    left: left > 0 ? left : 0,
    top: top > 0 ? top : 0,
    width,
    height,
    ...reset,
  }

  return Object.entries(options).reduce(
    (windowOpts, [key, value]) => `${windowOpts},${key}=${value}`,
    ''
  )
}

export function getScrollTop() {
  return window.pageYOffset !== undefined
    ? window.pageYOffset
    : (document.documentElement || document.body.parentNode || document.body)
        .scrollTop
}

export const addFullScreenChangeEvents = callBack => {
  if (!isFunction(callBack)) {
    return
  }
  document.addEventListener('fullscreenchange', callBack)
  document.addEventListener('mozfullscreenchange', callBack)
  document.addEventListener('webkitfullscreenchange', callBack)
  document.addEventListener('msfullscreenchange', callBack)
}

export const removeFullScreenChangeEvents = callBack => {
  if (!isFunction(callBack)) {
    return
  }
  document.removeEventListener('fullscreenchange', callBack)
  document.removeEventListener('mozfullscreenchange', callBack)
  document.removeEventListener('webkitfullscreenchange', callBack)
  document.removeEventListener('msfullscreenchange', callBack)
}

export const exitFullScreen = () => {
  const eFS =
    document.exitFullscreen ||
    document.msExitFullscreen ||
    document.mozCancelFullScreen ||
    document.webkitExitFullscreen
  eFS.call(document)
}

export const enterFullScreen = container => {
  const rFS =
    container.requestFullscreen ||
    container.webkitRequestFullscreen ||
    container.mozRequestFullScreen
  rFS.call(container)
}

export const copyToClipboard = str => {
  const el = document.createElement('textarea')
  el.value = str
  el.setAttribute('readonly', '')
  el.style.position = 'absolute'
  el.style.left = '-9999px'
  document.body.appendChild(el)
  const selected =
    document.getSelection().rangeCount > 0
      ? document.getSelection().getRangeAt(0)
      : false
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
  if (selected) {
    document.getSelection().removeAllRanges()
    document.getSelection().addRange(selected)
  }
}
