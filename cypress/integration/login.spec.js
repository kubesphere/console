/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

describe('The Login Page', () => {
  it('successfully loads', () => {
    cy.visit('/');

    cy.get('input[name=username]').type(Cypress.env('username'));
    cy.get('input[name=password]').type(`${Cypress.env('password')}{enter}`);

    cy.url().should('include', '/dashboard');

    cy.getCookie('token').should('exist');

    cy.get('div.src-components-Layout-LoginInfo-index__name').should(
      'contain',
      Cypress.env('username'),
    );
  });
});
