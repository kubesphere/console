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

describe('The Login Page', () => {
  it('successfully loads', () => {
    cy.visit('/')

    cy.get('input[name=username]').type(Cypress.env('username'))
    cy.get('input[name=password]').type(`${Cypress.env('password')}{enter}`)

    cy.url().should('include', '/dashboard')

    cy.getCookie('token').should('exist')

    cy.get('div.src-components-Layout-LoginInfo-index__name').should(
      'contain',
      Cypress.env('username')
    )
  })
})
