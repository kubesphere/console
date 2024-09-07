/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

describe('The App Repositories Page', function () {
  beforeEach('login', function () {
    cy.login('admin');
  });

  it('successfully loads', function () {
    cy.server();

    cy.route('GET', /\/repos/).as('getRepos');

    cy.visit('/workspaces/e2e-test/repos');

    cy.wait('@getRepos');
  });

  it('list page base operation', function () {
    cy.server();

    cy.route('GET', /\/repos/).as('getRepos');
    cy.route('POST', /\/repos/).as('createRepo');
    cy.route('PATCH', /\/repos/).as('updateRepo');
    cy.route('DELETE', /\/repos/).as('deleteRepo');

    cy.visit('/workspaces/e2e-test/repos');

    cy.wait('@getRepos');

    const formData = {
      name: 'tester-random-aaxx',
      url: 'https://kubernetes-charts.storage.googleapis.com/',
      description: 'tester random',
    };

    // delete old data
    cy.request({
      method: 'GET',
      url: `/kapis/openpitrix.io/v1/repos?name=${formData.name}`,
      headers: { 'x-check-exist': true },
    }).then(resp => {
      if (resp.body.total_count > 0) {
        const repo = resp.body.repo_set[0];
        cy.request('DELETE', `/kapis/openpitrix.io/v1/repos/${repo.repo_id}`);
      }
    });

    // create
    {
      cy.get('[data-test="table-create"]').click();

      Object.keys(formData).forEach(key => {
        cy.get(`[name="${key}"]`).type(formData[key]);
      });

      // submit
      cy.get('[data-test="modal-ok"]').click();

      cy.wait('@createRepo');
    }

    // search
    {
      cy.get('[data-test="search"] > input').type(`${formData.name}{enter}`);

      // wait loading end
      cy.wait('@getRepos');

      cy.get('.ks-table tbody.table-tbody > tr').contains(formData.name);
    }

    const rowKey = Cypress.$('.ks-table tbody.table-tbody > tr:first-child').attr('data-row-key');

    // edit
    {
      cy.get(`[data-row-key="${rowKey}"] button .kubed-icon-more`).click();

      cy.get(`[data-row-key="${rowKey}" [data-test="table-item-edit"]`).click();

      cy.get('[name="name"]').clear().type(`${formData.name}aaa`);

      cy.get('[data-test="modal-ok"]').click();

      cy.wait('@updateRepo');

      cy.get('[data-test="search"] > input').clear().type(`${formData.name}aaa{enter}`);

      cy.wait('@getRepos');

      cy.get(`[data-row-key="${rowKey}"]`).contains(`${formData.name}aaa`);
    }

    // clear search
    {
      cy.get('.icon-clickable > .kubed-icon').click();

      cy.wait('@getRepos');
    }

    // index
    {
      cy.get(`[data-row-key="${rowKey}"]  button .kubed-icon-more`).click();

      cy.get(`[data-row-key="${rowKey}" [data-test="table-item-index"]`).click();
    }

    // delete
    {
      cy.get(`[data-row-key="${rowKey}"]  button .kubed-icon-more`).click();

      cy.get(`[data-row-key="${rowKey}" [data-test="table-item-delete"]`).click();

      cy.get('.confirm').type(`${formData.name}aaa`);

      cy.get('[data-test="modal-ok"]').click();

      cy.wait('@deleteRepo');
      cy.wait('@getRepos');
    }
  });
});
