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

export default (file, acceptedFiles) => {
  if (file && acceptedFiles) {
    const acceptedFilesArray = Array.isArray(acceptedFiles)
      ? acceptedFiles
      : acceptedFiles.split(',')
    const fileName = file.name || ''
    const mimeType = file.type || ''
    const baseMimeType = mimeType.replace(/\/.*$/, '')

    return acceptedFilesArray.some(type => {
      const validType = type.trim()
      const endsWith = (str, suffix) =>
        str.indexOf(suffix, str.length - suffix.length) !== -1
      if (validType.charAt(0) === '.') {
        return endsWith(fileName.toLowerCase(), validType.toLowerCase())
      }
      if (/\/\*$/.test(validType)) {
        // This is something like a image/* mime type
        return baseMimeType === validType.replace(/\/.*$/, '')
      }
      return mimeType === validType
    })
  }
  return true
}
