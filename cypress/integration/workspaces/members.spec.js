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

const testUser = 'e2e-regular'
const workspace = 'e2e-test'

describe('The Workspace Overview Page', function() {
  before(function() {
    cy.login('admin')
    cy.request({
      method: 'GET',
      url: `/apis/iam.kubesphere.io/v1alpha2/workspaces/${workspace}/members/${testUser}`,
      headers: { 'x-check-exist': true },
    }).then(resp => {
      if (resp.body.exist) {
        cy.request({
          method: 'DELETE',
          url: `/apis/iam.kubesphere.io/v1alpha2/workspaces/${workspace}/members/${testUser}`,
        })
      }
    })
  })

  beforeEach('login', function() {
    cy.login('admin')
  })

  it('successfully loads', function() {
    cy.server()

    cy.route('GET', /\/workspaces/).as('getWorkspace')
    cy.route('GET', /\/members/).as('getWorkspaceMembers')

    cy.visit('/workspaces/e2e-test/members')

    cy.wait('@getWorkspace')
    cy.wait('@getWorkspaceMembers')

    cy.contains('admin')
  })

  it('detail page', function() {
    cy.server()

    cy.route('GET', /\/workspaces/).as('getWorkspace')
    cy.route('GET', /\/namespaces/).as('getWorkspaceProjects')

    cy.visit(`/workspaces/e2e-test/members/admin`)

    cy.wait('@getWorkspace')
    cy.wait('@getWorkspaceProjects')
  })

  it('list page base operations', function() {

    cy.server()

    cy.route('GET', /\/users/).as('getUsers')
    cy.route('GET', /\/members/).as('getWorkspaceMembers')

    cy.visit('/workspaces/e2e-test/members')
    cy.wait('@getWorkspaceMembers')

    // invite member
    {
      cy.get('button')
        .contains('Invite Member')
        .click()

      cy.wait('@getUsers')

      cy.get(`[data-user="admin"]`)

      cy.get('[data-test="search"] input').type(`${testUser}{enter}`)
      cy.wait('@getUsers')

      cy.get('[data-test="search"] .kubed-icon-close').click()
      cy.wait('@getUsers')

      cy.get(`[data-user="${testUser}"] button`).click()
      cy.get(`[data-user="${testUser}"] .menu-item`)
        .contains('workspace-regular')
        .click()
      cy.wait('@getWorkspaceMembers')
      cy.get(`[data-user="${testUser}"] button[disabled]`)
      cy.get('[data-test="modal-close"]').click()

      cy.get(`[data-row-key="${testUser}"]`).contains('workspace-regular')
    }

    // modify role
    {
      cy.get(`[data-row-key="${testUser}"] button .kubed-icon-more`).click()
      cy.get(
        `[data-row-key="${testUser}"] [data-test="table-item-modify"]`
      ).click()

      cy.get('.select-control').click()
      cy.get('.select-options')
        .contains('workspace-viewer')
        .click()

      cy.get('[data-test="modal-ok"]').click()

      cy.wait('@getWorkspaceMembers')
      cy.get(`[data-row-key="${testUser}"]`).contains('workspace-viewer')
    }

    // delete member
    {
      cy.get(`[data-row-key="${testUser}"] button .kubed-icon-more`).click()
      cy.get(
        `[data-row-key="${testUser}"] [data-test="table-item-delete"]`
      ).click()

      cy.get('input[name="confirm"]').type(testUser)
      cy.get('[data-test="modal-ok"]').click()
      cy.wait('@getWorkspaceMembers')
      cy.get(`[data-row-key="${testUser}"]`).should('not.exist')
    }
  })
})
