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
    cy.route('GET', /\/roles/).as('getWorkspaceRoles')

    cy.visit('/workspaces/e2e-test/roles')

    cy.wait('@getWorkspace')
    cy.wait('@getWorkspaceRoles')

    cy.contains('workspace-admin')
    cy.contains('workspace-regular')
    cy.contains('workspace-viewer')
  })

  it('detail page', function() {
    cy.server()

    cy.route('GET', /\/workspaces/).as('getWorkspace')
    cy.route('GET', /\/rules/).as('getWorkspaceRoleRules')
    cy.route('GET', /\/members/).as('getWorkspaceRoleMembers')

    cy.visit('/workspaces/e2e-test/roles/workspace-admin')

    cy.wait('@getWorkspace')
    cy.wait('@getWorkspaceRoleRules')

    cy.get('[data-test="rule-list"] > li').should('have.length', 7)

    cy.visit('/workspaces/e2e-test/roles/workspace-admin/users')
    cy.wait('@getWorkspaceRoleMembers')
    cy.contains(Cypress.env('username'))
  })
})
