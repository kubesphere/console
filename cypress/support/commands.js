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

const USERS = {
  admin: {
    username: Cypress.env('username'),
    password: Cypress.env('password'),
  },
}

Cypress.Commands.add('login', role => {
  cy.request('POST', '/login', USERS[role || 'admin'])
  cy.setCookie('lang', 'en')
})

Cypress.Commands.add('enterWorkspace', workspace => {
  cy.request({
    method: 'GET',
    url: `/kapis/tenant.kubesphere.io/v1alpha2/workspaces/workspace`,
    headers: { 'x-check-exist': true },
  }).then(resp => {
    if (!resp.body.exist) {
      cy.request('POST', `/apis/tenant.kubesphere.io/v1alpha1/workspaces`, {})
    }
  })
})
