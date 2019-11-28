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

describe('The Account Detail Page', function() {
  beforeEach('login', function() {
    cy.login('admin')
  })

  it('successfully loads', function() {
    const name = Cypress.env('username')
    cy.visit(`/accounts/${name}`)

    cy.get('[data-test="detail-title"]').contains(name)
  })


  it('failed loads', function() {
    cy.visit('/accounts/sxxaayyuixzuxi')

    cy.get('.h1').contains('Not Found')

    cy.get('.h1+p a').click()

    cy.url().should('include', 'accounts')
  })

  it('account detail base operation', function() {
    const name = Cypress.env('username')
    cy.visit(`/accounts/${name}`)

    // edit
    {
      cy.get('[data-test="detail-edit"]').click()

      cy.get('#email')
        .clear()
        .type('tester@yunify.com')

      cy.get('button[type="submit"]').click()

      cy.get('[data-test="detail-attrs"]').contains(
        'tester@yunify.com'
      )
    }
  })
})
