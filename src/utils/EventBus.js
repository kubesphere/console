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

export default class EventBus {
  constructor() {
    this.listeners = new Map()
    this.errors = new Map()
  }

  on(eventName, listener) {
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, new Set())
    }
    this.listeners.get(eventName).add(listener)
  }

  off(eventName, listener) {
    if (!this.listeners.has(eventName)) {
      return
    }
    this.listeners.get(eventName).delete(listener)
  }

  emit(eventName, ...args) {
    if (!this.listeners.has(eventName)) {
      return
    }
    for (const listener of this.listeners.get(eventName)) {
      try {
        listener(...args)
      } catch (error) {
        this.handleError(eventName, error)
      }
    }
  }

  hasEvent(eventName) {
    return this.listeners.has(eventName)
  }

  hasListener(eventName, listener) {
    if (!this.listeners.has(eventName)) {
      return false
    }
    return this.listeners.get(eventName).has(listener)
  }

  onError(eventName, handler) {
    this.errors.set(eventName, handler)
  }

  handleError(eventName, error) {
    if (!this.errors.has(eventName)) {
      console.error(`Error in event "${eventName}":`, error)
      return
    }
    this.errors.get(eventName)(error)
  }
}

export const eventBus = new EventBus()
