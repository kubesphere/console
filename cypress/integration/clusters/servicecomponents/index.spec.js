/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

describe('The StorageClasses Page', function () {
  beforeEach('login', function () {
    cy.login('admin');
  });

  it('successfully loads', function () {
    cy.server();

    cy.route('GET', /\/components/).as('getComponents');

    cy.visit('/components');

    cy.wait('@getComponents');

    cy.get('[data-test="service-component"]').its('length').should('be.gt', 0);

    cy.contains('Kubernetes').click();

    cy.get('[data-test="service-component"]').its('length').should('be.gt', 0);
  });
});
