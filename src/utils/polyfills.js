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

/* eslint-disable no-extend-native */
/* eslint-disable no-bitwise */

if (typeof Promise === 'undefined') {
  global.Promise = require('promise-polyfill')
}

if (!Array.prototype.includes) {
  Object.defineProperty(Array.prototype, 'includes', {
    value(searchElement, fromIndex) {
      if (this == null) {
        throw new TypeError('"this" is null or not defined')
      }

      // 1. Let O be ? ToObject(this value).
      const o = Object(this)

      // 2. Let len be ? ToLength(? Get(O, "length")).
      const len = o.length >>> 0

      // 3. If len is 0, return false.
      if (len === 0) {
        return false
      }

      // 4. Let n be ? ToInteger(fromIndex).
      //    (If fromIndex is undefined, this step produces the value 0.)
      const n = fromIndex | 0

      // 5. If n ≥ 0, then
      //  a. Let k be n.
      // 6. Else n < 0,
      //  a. Let k be len + n.
      //  b. If k < 0, let k be 0.
      let k = Math.max(n >= 0 ? n : len - Math.abs(n), 0)

      function sameValueZero(x, y) {
        return (
          x === y ||
          (typeof x === 'number' &&
            typeof y === 'number' &&
            isNaN(x) &&
            isNaN(y))
        )
      }

      // 7. Repeat, while k < len
      while (k < len) {
        // a. Let elementK be the result of ? Get(O, ! ToString(k)).
        // b. If SameValueZero(searchElement, elementK) is true, return true.
        if (sameValueZero(o[k], searchElement)) {
          return true
        }
        // c. Increase k by 1.
        k++
      }

      // 8. Return false
      return false
    },
  })
}
