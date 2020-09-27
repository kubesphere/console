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

describe('The Workspace DevOps Page', function() {
  beforeEach('login', function() {
    cy.login('admin')
  })

  it('successfully loads', function() {
    cy.server()

    cy.route('GET', /\/devops/).as('getDevOps')

    cy.visit('/workspaces/e2e-test/devops')

    cy.wait('@getDevOps')

    cy.get('.ks-page-main .h3').contains('DevOps Projects')
  })

  it('list page base operation', function() {
    cy.visit('/workspaces/e2e-test/devops')

    const formData = {
      name: 'tester-random-aaxx',
      desc: 'tester-random-aaxx desc',
    }

    cy.server()

    cy.route('GET', /\/devops/).as('getDevOps')
    cy.route('POST', /\/devops/).as('createDevOps')
    cy.route('PATCH', /\/devops/).as('patchDevOps')
    cy.route('DELETE', /\/devops/).as('deleteDevOps')

    cy.wait('@getDevOps')
    cy.get('.kubed-icon-loading').should('not.exist')

    // create
    {
      cy.get('[data-test="table-create"]').click()

      // fill create form
      cy.get('[name="name"]').type(formData.name)
      cy.get('[name="description"]').type(formData.desc)

      // submit
      cy.get('[data-test="modal-create"]').click()

      cy.wait('@createDevOps')
      cy.get('.kubed-icon-loading').should('not.exist')
    }

    // search
    {
      cy.get('[data-test="search"] input').type(`${formData.name}{enter}`)

      cy.wait('@getDevOps')
      cy.get('.kubed-icon-loading').should('not.exist')

      cy.get('.ks-table tbody.table-tbody').contains(formData.desc)
    }

    const rowKey = Cypress.$(
      '.ks-table tbody.table-tbody > tr:first-child'
    ).attr('data-row-key')
    // edit
    {
      cy.get(`[data-row-key="${rowKey}"] button .kubed-icon-more`).click()
      cy.get(`[data-row-key="${rowKey}"] [data-test="table-item-edit"]`).click()

      cy.get('[name="description')
        .clear()
        .type(`aaa-${formData.desc}`)
      cy.get('[data-test="modal-ok"]').click()

      cy.wait('@patchDevOps')
      cy.get('.kubed-icon-loading').should('not.exist')

      cy.get('.ks-table tbody.table-tbody').contains(`aaa-${formData.desc}`)
    }

    // clear search
    {
      cy.get('[data-test="search"] .kubed-icon-close').click()

      cy.wait('@getDevOps')
      cy.get('.kubed-icon-loading').should('not.exist')

      cy.get('.ks-table tbody.table-tbody > tr')
        .its('length')
        .should('be.gt', 0)
    }

    // delete
    {
      cy.get(`[data-row-key="${rowKey}"] button .kubed-icon-more`).click()
      cy.get(
        `[data-row-key="${rowKey}"] [data-test="table-item-delete"]`
      ).click()

      cy.get('input[name="confirm"]').type(formData.name)
      cy.get('[data-test="modal-ok"]').click()

      cy.wait('@deleteDevOps')
      cy.get('.kubed-icon-loading').should('not.exist')

      cy.get(`[data-row-key="${rowKey}"]`).should('not.exist')
    }
  })
})
