/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

describe('The Workspaces Page', function () {
  beforeEach('login', function () {
    cy.login('admin');
  });

  it('successfully loads', function () {
    cy.server();

    cy.route('GET', /\/workspaces/).as('getWorkspaces');

    cy.visit('/workspaces');

    cy.wait('@getWorkspaces');

    cy.get('[data-test="workspace-item"]').its('length').should('be.gt', 0);

    cy.get('[data-test="workspace-item"]').first().find('a').click();
    cy.url().should('include', 'overview');
  });

  it('list page base operation', function () {
    cy.server();

    cy.route('GET', /\/workspaces/).as('getWorkspaces');
    cy.route('POST', /\/workspaces/).as('createWorkspace');

    cy.visit('/workspaces');

    cy.wait('@getWorkspaces');

    const formData = {
      name: 'tester-random-aaxx',
      desc: 'tester random',
    };

    // delete old data
    cy.request({
      method: 'GET',
      url: `/kapis/tenant.kubesphere.io/v1alpha2/workspaces/${formData.name}`,
      headers: { 'x-check-exist': true },
    }).then(resp => {
      if (resp.body.exist) {
        cy.request('DELETE', `/apis/tenant.kubesphere.io/v1alpha1/workspaces/${formData.name}`);
      }
    });

    // create
    {
      cy.get('[data-test="workspace-create"]').click();

      // fill create form
      cy.get('[name="metadata.name"]').type(formData.name);
      cy.get('[name="metadata.annotations[\'kubesphere.io/description\']"]').type(formData.desc);

      // submit
      cy.get('[data-test="modal-ok"]').click();

      cy.wait('@createWorkspace');

      cy.url().should('include', 'overview');
    }

    // search
    {
      cy.visit('/workspaces');
      cy.wait('@getWorkspaces');

      cy.get('[data-test="search"] > input').type(`${formData.name}{enter}`);

      // wait loading end
      cy.wait('@getWorkspaces');

      cy.get('[data-test="workspace-item"]').first().contains(formData.name);
    }

    // clear search
    {
      cy.get('.icon-clickable > .kubed-icon').click();

      cy.wait('@getWorkspaces');

      cy.get('[data-test="workspace-item"]').its('length').should('be.gt', 0);
    }
  });
});
