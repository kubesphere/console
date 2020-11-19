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

export default class History {
  data = []

  maxLength = 50

  cursor = 0

  constructor(length) {
    if (!isNaN(length)) {
      this.maxLength = length
    }
  }

  push(value) {
    if (this.data.length >= this.maxLength) {
      this.data.shift()
    }
    this.data.push(value)
    this.cursor = 0
  }

  undo() {
    if (this.cursor < this.data.length - 1) {
      this.cursor += 1
    }

    return this.data[this.data.length - 1 - this.cursor]
  }

  redo() {
    if (this.cursor > 0) {
      this.cursor -= 1
    }

    return this.data[this.data.length - 1 - this.cursor]
  }
}
