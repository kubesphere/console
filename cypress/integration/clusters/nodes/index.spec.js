/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

describe('The Nodes Page', function () {
  beforeEach('login', function () {
    cy.login('admin');
  });

  it('successfully loads', function () {
    cy.server();

    cy.route('GET', /\/nodes/).as('getNodes');

    cy.visit('/infrastructure/nodes');

    cy.wait('@getNodes');

    cy.get('.ks-table tbody.table-tbody > tr').its('length').should('be.gt', 0);

    cy.get('.ks-table tbody.table-tbody > tr').first().find('a').click();
    cy.url().should('include', 'status');
  });
});
