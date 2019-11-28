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

describe('The Workspace Overview Page', function() {
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

    cy.contains(Cypress.env('username'))
  })

  it('detail page', function() {
    cy.server()

    cy.route('GET', /\/workspaces/).as('getWorkspace')
    cy.route('GET', /\/namespaces/).as('getWorkspaceProjects')

    cy.visit(`/workspaces/e2e-test/members/${Cypress.env('username')}`)

    cy.wait('@getWorkspace')
    cy.wait('@getWorkspaceProjects')
  })

  it('list page base operations', function() {
    const currentUser = Cypress.env('username')

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
      cy.get(`[data-user="${currentUser}"]`)

      cy.get('[data-test="search"] input').type(`${currentUser}{enter}`)
      cy.wait('@getUsers')
      cy.get(`[data-user="admin"]`).should('not.exist')

      cy.get('[data-test="search"] .qicon-close').click()
      cy.wait('@getUsers')
      cy.get(`[data-user="admin"]`)

      cy.get(`[data-user="admin"] button`).click()
      cy.get('.menu-item')
        .contains('workspace-regular')
        .click()
      cy.wait('@getWorkspaceMembers')
      cy.get(`[data-user="admin"] button[disabled]`)
      cy.get('[data-test="modal-close"]').click()

      cy.get('[data-row-key="admin"]').contains('workspace-regular')
    }

    // modify role
    {
      cy.get('[data-row-key="admin"] button .qicon-more').click()
      cy.get(`[data-row-key="admin"] [data-test="table-item-modify"]`).click()

      cy.get('.select-control').click()
      cy.get('.select-menu-outer')
        .contains('workspace-viewer')
        .click()

      cy.get('[data-test="modal-ok"]').click()

      cy.wait('@getWorkspaceMembers')
      cy.get('[data-row-key="admin"]').contains('workspace-viewer')
    }

    // delete member
    {
      cy.get('[data-row-key="admin"] button .qicon-more').click()
      cy.get(`[data-row-key="admin"] [data-test="table-item-delete"]`).click()

      cy.get('input[name="confirm"]').type('admin')
      cy.get('[data-test="modal-ok"]').click()
      cy.wait('@getWorkspaceMembers')
      cy.get('[data-row-key="admin"]').should('not.exist')
    }
  })
})
