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
import { safeBtoa, safeAtob } from 'utils/base64'

const decodeData = {
  zh: '用户名',
  en: 'username',
  enSymbol: 'user-name',
}

const encodeData = {
  zh: '55So5oi35ZCN',
  en: 'dXNlcm5hbWU=',
  enSymbol: 'dXNlci1uYW1l',
}

const errorData = { name: 'name' }

describe('Encode string to base 64 ', function() {
  it('encode Chinese', function() {
    const result = safeBtoa(decodeData.zh)
    expect(result).toBe(encodeData.zh)
  })

  it('encode English', function() {
    const result = safeBtoa(decodeData.en)
    expect(result).toBe(encodeData.en)
  })

  it('encode English with symbol', function() {
    const result = safeBtoa(decodeData.enSymbol)
    expect(result).toBe(encodeData.enSymbol)
  })
})

describe('Decode string to base 64 ', function() {
  it('decode Chinese', function() {
    const result = safeAtob(encodeData.zh)
    expect(result).toBe(decodeData.zh)
  })

  it('decode English', function() {
    const result = safeAtob(encodeData.en)
    expect(result).toBe(decodeData.en)
  })

  it('decode English with symbol', function() {
    const result = safeAtob(encodeData.enSymbol)
    expect(result).toBe(decodeData.enSymbol)
  })
})

describe('Encode object to base 64 ', function() {
  it('encode object', function() {
    const result = safeBtoa(errorData)
    expect(result).toBe('')
  })
})
