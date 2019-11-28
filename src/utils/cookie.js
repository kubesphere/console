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

/* eslint-disable consistent-return */
const cookie = (win, n, v, op) => {
  if (typeof win === 'string') {
    op = v
    v = n
    n = win
    win = window
  }

  if (typeof v !== 'undefined') {
    let date
    let expires = ''
    op = op || {}
    if (op.expires) {
      if (op.expires.constructor === Date) {
        date = op.expires
      } else {
        date = new Date()
        date.setTime(date.getTime() + op.expires * 24 * 60 * 60 * 1000)
      }
      expires = `; expires=${date.toGMTString()}`
    }
    const path = op.path ? `; path=${op.path}` : ''
    const domain = op.domain ? `; domain=${op.domain}` : ''
    const secure = op.secure ? '; secure' : ''
    win.document.cookie = [
      n,
      '=',
      encodeURIComponent(v),
      expires,
      path,
      domain,
      secure,
    ].join('')
  } else {
    v = win.document.cookie.match(new RegExp(`(?:\\s|^)${n}\\=([^;]*)`))
    return v ? decodeURIComponent(v[1]) : null
  }
}

export default cookie
