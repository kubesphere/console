/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

describe('The Account Detail Page', function () {
  beforeEach('login', function () {
    cy.login('admin');
  });

  it('successfully loads', function () {
    const name = Cypress.env('username');
    cy.visit(`/accounts/${name}`);

    cy.get('[data-test="detail-title"]').contains(name);
  });

  it('failed loads', function () {
    cy.visit('/accounts/sxxaayyuixzuxi');

    cy.get('.h1').contains('Not Found');

    cy.get('.h1+p a').click();

    cy.url().should('include', 'accounts');
  });

  it('account detail base operation', function () {
    const name = Cypress.env('username');
    cy.visit(`/accounts/${name}`);

    // edit
    {
      cy.get('[data-test="detail-edit"]').click();

      cy.get('#email').clear().type('tester@yunify.com');

      cy.get('button[type="submit"]').click();

      cy.get('[data-test="detail-attrs"]').contains('tester@yunify.com');
    }
  });
});
