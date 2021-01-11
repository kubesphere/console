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
  }

  apply(compiler) {
    compiler.hooks.emit.tapPromise('LocalePlugin', compilation => {
      // return a Promise that resolves when we are done...
      return new Promise((resolve, reject) => {
        if (this.options.locales) {
          const dir = fs.readdirSync(path.join(__dirname, this.options.locales))
          dir.forEach(lang => {
            const files = fs.readdirSync(
              path.join(__dirname, this.options.locales, lang)
            )
            let data = {}
            files.forEach(file => {
              const filedata = require(path.join(
                __dirname,
                this.options.locales,
                lang,
                file
              ))
              data = { ...data, ...filedata }
            })
            if (!fs.existsSync(compiler.outputPath)) {
              fs.mkdirSync(compiler.outputPath)
            }
            fs.writeFileSync(path.join(compiler.outputPath, `locale-${lang}.json`), JSON.stringify(data))
          })
        }
        resolve()
      })
    })
  }
}

module.exports = LocalePlugin
