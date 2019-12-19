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

export const getLocalStorageItem = key => {
  const item = localStorage.getItem(key)
  try {
    const { expires, value } = JSON.parse(item)

    if (Date.now() > expires) {
      localStorage.removeItem(key)
      return null
    }

    return value
  } catch (e) {
    return item
  }
}

export const setLocalStorageItem = (key, value, maxAge = 86400) => {
  try {
    localStorage.setItem(
      key,
      JSON.stringify({
        expires: Date.now() + maxAge,
        value,
      })
    )
  } catch (e) {}
}
