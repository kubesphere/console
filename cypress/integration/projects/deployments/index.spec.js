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

describe('The Deployments Page', function() {
  beforeEach('login', function() {
    cy.login('admin')
  })

  it('successfully loads', function() {
    cy.server()

    cy.route('GET', /\/deployments/).as('getDeployments')

    cy.visit('/projects/e2e-test/workloads')

    cy.wait('@getDeployments')

    cy.get('.ks-page-main .h3').contains('Workloads')
  })

  it('list page base operation', function() {
    cy.visit('/projects/e2e-test/deployments')

    const formData = {
      name: 'tester-random-aaxx',
      desc: 'tester-random-aaxx desc',
    }

    cy.server()

    cy.route('GET', /\/deployments/).as('getDeployments')
    cy.route('POST', /\/deployments/).as('createDeployment')
    cy.route('PATCH', /\/deployments/).as('patchDeployment')
    cy.route('PUT', /\/deployments/).as('putDeployment')
    cy.route('DELETE', /\/deployments/).as('deleteDeployment')
    cy.route('GET', /\/registry\/blob/).as('imageSearch')

    cy.wait('@getDeployments')
    cy.get('.qicon-loading').should('not.exist')

    // create
    {
      cy.get('[data-test="table-create"]').click()

      // fill create form
      cy.get('[name="metadata.name"]').type(formData.name)
      cy.get(
        '[name="metadata.annotations[\'kubesphere.io/description\']"]'
      ).type(formData.desc)
      cy.get('[data-test="modal-next"]').click()

      cy.contains('Add Container Image').click()
      cy.get('[data-test="imageSearch"]').type('redis{enter}')
      cy.get('[data-test="form-item-ports"] input[name="name"]').type(6379)
      cy.get('[data-test="form-item-ports"] input[name="containerPort"]').type(
        6379
      )

      cy.get('[data-test="confirm-ok"]').click()
      cy.get('[data-test="modal-next"]').click()
      cy.get('[data-test="modal-next"]').click()

      cy.contains('Add metadata').click()
      cy.get('[data-test="form-item-metadata.labels"]')
        .contains('Add Label')
        .click()
      cy.get('[data-test="form-item-metadata.labels"] input[name="key"]')
        .eq(1)
        .type('app.kubernetes.io/name')
      cy.get('[data-test="form-item-metadata.labels"] input[name="value"]')
        .eq(1)
        .type('redis')

      // submit
      cy.get('[data-test="modal-create"]').click()

      cy.wait('@createDeployment')

      cy.get(`[data-row-key="${formData.name}"]`).contains(formData.desc)
      cy.get(`[data-row-key="${formData.name}"]`).contains('redis')
    }

    // search
    {
      cy.get('.autosuggest-input').click()
      cy.get('.autosuggest-item')
        .contains('Name')
        .click()
      cy.get('.autosuggest-input > input').type(`${formData.name}{enter}`)

      cy.wait('@getDeployments')
      cy.get('.qicon-loading').should('not.exist')
      cy.get(`[data-row-key="${formData.name}"]`)
      cy.url().should('include', `name=${formData.name}`)

      cy.get('.table-filter-bar > .icon > .qicon-close').click()
      cy.wait('@getDeployments')
      cy.get('.qicon-loading').should('not.exist')
      cy.url().should('not.include', 'name=nginx')
    }

    // edit
    {
      cy.get(`[data-row-key="${formData.name}"] button .qicon-more`).click()
      cy.get(
        `[data-row-key="${formData.name}"] [data-test="table-item-edit"]`
      ).click()

      cy.get('[name="metadata.annotations[\'kubesphere.io/alias-name\']"]')
        .clear()
        .type('redis_test')

      cy.get('[data-test="modal-ok"]').click()

      cy.wait('@patchDeployment')
      cy.wait('@getDeployments')
      cy.get(`[data-row-key="${formData.name}"]`).contains('redis_test')
    }

    // edit yaml
    {
      cy.get(`[data-row-key="${formData.name}"] button .qicon-more`).click()
      cy.get(
        `[data-row-key="${formData.name}"] [data-test="table-item-editYaml"]`
      ).click()

      cy.wait(1000)
      cy.get('.qicon-loading').should('not.exist')

      cy.get('[data-test="modal-ok"]').click()

      cy.wait('@putDeployment')
      cy.wait('@getDeployments')
    }

    // redeploy
    {
      cy.get(`[data-row-key="${formData.name}"] button .qicon-more`).click()
      cy.get(
        `[data-row-key="${formData.name}"] [data-test="table-item-redeploy"]`
      ).click()

      cy.get('[data-test="modal-ok"]').click()

      cy.wait('@patchDeployment')
      cy.wait('@getDeployments')
    }

    // delete
    {
      cy.get(`[data-row-key="${formData.name}"] button .qicon-more`).click()
      cy.get(
        `[data-row-key="${formData.name}"] [data-test="table-item-delete"]`
      ).click()
      cy.wait(3000)
      cy.get('[data-test="modal-ok"]').click()
    }
  })
})
