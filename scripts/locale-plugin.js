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

const fs = require('fs')
const path = require('path')

class LocalePlugin {
  constructor(options = {}) {
    this.options = {
      ...options,
    }
    this._caches = {}
  }

  apply(compiler) {
    compiler.hooks.emit.tapPromise('LocalePlugin', compilation => {
      // return a Promise that resolves when we are done...
      return new Promise((resolve, reject) => {
        if (this.options.locales) {
          const dir = fs.readdirSync(path.join(__dirname, this.options.locales))
          dir.forEach(lang => {
            let hasChange = false
            const files = fs.readdirSync(
              path.join(__dirname, this.options.locales, lang)
            )
            let data = {}
            files.forEach(file => {
              const key = `${lang}/file`
              const filepath = path.join(
                __dirname,
                this.options.locales,
                lang,
                file
              )
              const fileinfo = fs.statSync(filepath)
              let filedata
              if (!this._caches[key] || this._caches[key].mtime !== fileinfo.mtime) {
                hasChange = true
                filedata = require(filepath)
                this._caches[key] = {mtime: fileinfo.mtime, filedata}
              } else {
                filedata = this._caches[key].filedata
              }
              data = { ...data, ...filedata }
            })
            if (!fs.existsSync(compiler.outputPath)) {
              fs.mkdirSync(compiler.outputPath)
            }
            console.log(hasChange);
            if (hasChange) {
              fs.writeFileSync(path.join(compiler.outputPath, `locale-${lang}.json`), JSON.stringify(data))
            }
          })
        }
        resolve()
      })
    })
  }
}

module.exports = LocalePlugin
