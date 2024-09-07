/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

const formData = {
  name: 'tester-random-aaxx',
  desc: 'tester-random-aaxx desc',
};

describe('The Workspace Projects Page', function () {
  before(function () {
    cy.login('admin');

    cy.request({
      method: 'GET',
      url: `/api/v1/namespaces/${formData.name}`,
      headers: { 'x-check-exist': true },
    }).then(resp => {
      if (resp.body.exist) {
        cy.request({
          method: 'DELETE',
          url: `/api/v1/namespaces/${formData.name}`,
        });
        cy.request({
          method: 'DELETE',
          url: `/api/v1/namespaces/${formData.name}/limitranges`,
        });
      }
    });
  });

  beforeEach('login', function () {
    cy.login('admin');
  });

  it('successfully loads', function () {
    cy.server();

    cy.route('GET', /\/namespaces/).as('getNamespaces');

    cy.visit('/workspaces/e2e-test/projects');

    cy.wait('@getNamespaces');

    cy.get('.ks-page-main .h3').contains('Projects');
  });

  it('list page base operation', function () {
    cy.visit('/workspaces/e2e-test/projects');

    cy.server();

    cy.route('GET', /\/namespaces/).as('getNamespaces');
    cy.route('POST', /\/namespaces/).as('createNamespace');
    cy.route('PATCH', /\/namespaces/).as('patchNamespace');
    cy.route('DELETE', /\/namespaces/).as('deleteNamespace');

    cy.wait('@getNamespaces');
    cy.get('.kubed-icon-loading').should('not.exist');

    // create
    {
      cy.get('[data-test="table-create"]').click();

      // fill create form
      cy.get('[name="metadata.name"]').type(formData.name);
      cy.get('[name="metadata.annotations[\'kubesphere.io/description\']"]').type(formData.desc);
      cy.get('[data-test="modal-next"]').click();

      // submit
      cy.get('[data-test="modal-create"]').click();

      cy.wait('@createNamespace');
    }

    // search
    {
      cy.get('[data-test="search"] input').type(`${formData.name}{enter}`);

      cy.wait('@getNamespaces');

      cy.get('.ks-table tbody.table-tbody').contains(formData.desc);
    }

    // edit
    {
      cy.get(`[data-row-key="${formData.name}"] button .kubed-icon-more`).click();
      cy.get(`[data-row-key="${formData.name}"] [data-test="table-item-edit"]`).click();

      cy.get('[name="description').clear().type(`aaa-${formData.desc}`);
      cy.get('[data-test="modal-ok"]').click();

      cy.wait('@patchNamespace');

      cy.get('.ks-table tbody.table-tbody').contains(`aaa-${formData.desc}`);
    }

    // clear search
    {
      cy.get('[data-test="search"] .kubed-icon-close').click();

      cy.wait('@getNamespaces');

      cy.get('.ks-table tbody.table-tbody > tr').its('length').should('be.gt', 0);
    }

    // delete
    {
      cy.get(`[data-row-key="${formData.name}"] button .kubed-icon-more`).click();
      cy.get(`[data-row-key="${formData.name}"] [data-test="table-item-delete"]`).click();

      cy.wait(1000);
      cy.get('input[name="confirm"]').type(formData.name);
      cy.get('[data-test="modal-ok"]').click();

      cy.wait('@deleteNamespace');

      cy.get(`[data-row-key="${formData.name}"] a`).should('not.exist');
      cy.get('.ks-table tbody.table-tbody').contains('Terminating');
    }
  });
});
