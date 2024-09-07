/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

describe('The Dashboard Page', function () {
  beforeEach('login', function () {
    cy.login('admin');
  });

  it('successfully loads', function () {
    cy.server();
    cy.route('GET', /\/nodes/).as('getNodes');

    cy.visit('/dashboard');
    cy.wait('@getNodes');

    cy.get('[data-test="dashboard-header"]').should('contain', Cypress.env('username'));
  });

  it('successfully links', function () {
    cy.server();
    cy.route('GET', /\/nodes/).as('getNodes');

    cy.visit('/dashboard');
    cy.wait('@getNodes');

    cy.get('a[href="/workspaces"]').its('length').should('be.eq', 2);

    cy.visit('/dashboard');
    cy.wait('@getNodes');

    cy.get('a[href="/accounts"]').its('length').should('be.eq', 2);

    cy.visit('/dashboard');
    cy.wait('@getNodes');

    cy.contains('Node Online Status').click();
    cy.url().should('include', '/nodes');

    cy.visit('/dashboard');
    cy.wait('@getNodes');
    cy.get('img[src="/assets/kubesphere.svg"]').click();
    cy.url().should('include', '/components');
  });

  it('usage ranking', function () {
    cy.server();
    cy.route('GET', /\/nodes/).as('getNodes');

    cy.visit('/dashboard');
    cy.wait('@getNodes');

    cy.get('[data-tab="node"]').click();
    cy.get('[data-test="ranking"] tbody.table-tbody > tr').its('length').should('be.gt', 0);

    cy.get('[data-tab="workspace"]').click();
    cy.get('[data-test="ranking"] tbody.table-tbody > tr').its('length').should('be.gt', 0);
  });
});
