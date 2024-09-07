/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

const formData = {
  name: 'tester-random-list-aaxx',
  desc: 'tester-random-list-aaxx desc',
};

describe('The Deployments Page', function () {
  before(function () {
    cy.login('admin');

    cy.request({
      method: 'GET',
      url: `/apis/apps/v1/namespaces/e2e-test/deployments/${formData.name}`,
      headers: { 'x-check-exist': true },
    }).then(resp => {
      if (resp.body.exist) {
        cy.request({
          method: 'DELETE',
          url: `/apis/apps/v1/namespaces/e2e-test/deployments/${formData.name}`,
        });
      }
    });
  });

  beforeEach('login', function () {
    cy.login('admin');
  });

  it('successfully loads', function () {
    cy.server();

    cy.route('GET', /\/deployments/).as('getDeployments');

    cy.visit('/projects/e2e-test/workloads');

    cy.wait('@getDeployments');

    cy.get('.ks-page-main .h3').contains('Workloads');
  });

  it('list page base operation', function () {
    test_init();
    test_create();
    test_searchByName();
    // test_searchByApplication()
    test_editBaseInfo();
    test_editYaml();
    test_redeploy();
    test_deleteItem();

    function test_init() {
      cy.server();

      cy.route('GET', /\/deployments/).as('getDeployments');
      cy.route('POST', /\/deployments/).as('createDeployment');
      cy.route('PATCH', /\/deployments/).as('patchDeployment');
      cy.route('PUT', /\/deployments/).as('putDeployment');
      cy.route('DELETE', /\/deployments/).as('deleteDeployment');
      cy.route('GET', /\/registry\/blob/).as('imageSearch');

      cy.visit('/projects/e2e-test/deployments');
      cy.wait('@getDeployments');
      cy.get('.kubed-icon-loading').should('not.exist');
    }

    function test_create() {
      cy.get('[data-test="table-create"]').click();

      // fill create form
      cy.get('[name="metadata.name"]').type(formData.name);
      cy.get('[name="metadata.annotations[\'kubesphere.io/description\']"]').type(formData.desc);
      cy.get('[data-test="modal-next"]').click();

      cy.contains('Add Container Image').click();
      cy.get('[data-test="imageSearch"]').type('redis{enter}');
      cy.get('[data-test="form-item-ports"] input[name="name"]').type(6379);
      cy.get('[data-test="form-item-ports"] input[name="containerPort"]').type(6379);

      cy.wait('@imageSearch');

      cy.get('.src-components-Modals-Create-Form-index__confirm [data-test="confirm-ok"]').click();
      cy.get('[data-test="modal-next"]').click();
      cy.get('[data-test="modal-next"]').click();

      cy.contains('Add metadata').click();
      cy.get('[data-test="form-item-metadata.labels"]').contains('Add Label').click();
      cy.get('[data-test="form-item-metadata.labels"] input[name="key"]')
        .eq(1)
        .type('app.kubernetes.io/name');
      cy.get('[data-test="form-item-metadata.labels"] input[name="value"]').eq(1).type('redis');

      // submit
      cy.get('[data-test="modal-create"]').click();

      cy.wait('@createDeployment');

      cy.get(`[data-row-key="${formData.name}"]`).contains(formData.desc);
      cy.get(`[data-row-key="${formData.name}"]`).contains('redis');
    }

    function test_searchByName() {
      cy.get('.autosuggest-input').click();
      cy.get('.autosuggest-item').contains('Name').click();
      cy.get('.autosuggest-input > input').type(`${formData.name}{enter}`);

      cy.wait('@getDeployments');
      cy.get('.kubed-icon-loading').should('not.exist');
      cy.get(`[data-row-key="${formData.name}"]`);
      cy.url().should('include', `name=${formData.name}`);

      clearSearch();
    }

    function test_searchByApplication() {
      cy.get('.autosuggest-input').click();
      cy.get('.autosuggest-item').contains('Application').click();
      cy.get('.autosuggest-input > input').type(`redis{enter}`);
      cy.wait('@getDeployments');
      cy.get('.kubed-icon-loading').should('not.exist');
      cy.get(`[data-row-key="${formData.name}"]`);
      cy.url().should('include', `app=${formData.name}`);

      clearSearch();
    }

    function clearSearch() {
      cy.get('.table-filter-bar > .icon > .kubed-icon-close').click();
      cy.wait('@getDeployments');
      cy.get('.kubed-icon-loading').should('not.exist');
      cy.url().should('not.include', `name=${formData.name}`);
    }

    function test_editBaseInfo() {
      cy.get(`[data-row-key="${formData.name}"] button .kubed-icon-more`).click();
      cy.get(`[data-row-key="${formData.name}"] [data-test="table-item-edit"]`).click();

      cy.get('[name="metadata.annotations[\'kubesphere.io/alias-name\']"]')
        .clear()
        .type('redis_test');

      cy.get('[data-test="modal-ok"]').click();

      cy.wait('@patchDeployment');
      cy.wait('@getDeployments');
      cy.get(`[data-row-key="${formData.name}"]`).contains('redis_test');
    }

    function test_editYaml() {
      cy.get(`[data-row-key="${formData.name}"] button .kubed-icon-more`).click();
      cy.get(`[data-row-key="${formData.name}"] [data-test="table-item-editYaml"]`).click();

      cy.wait(1000);
      cy.get('.kubed-icon-loading').should('not.exist');

      cy.get('[data-test="modal-ok"]').click();

      cy.wait('@putDeployment');
      cy.wait('@getDeployments');
    }

    function test_redeploy() {
      cy.get(`[data-row-key="${formData.name}"] button .kubed-icon-more`).click();
      cy.get(`[data-row-key="${formData.name}"] [data-test="table-item-redeploy"]`).click();

      cy.get('[data-test="modal-ok"]').click();

      cy.wait('@patchDeployment');
      cy.wait('@getDeployments');
    }

    function test_deleteItem() {
      cy.get(`[data-row-key="${formData.name}"] button .kubed-icon-more`).click();
      cy.get(`[data-row-key="${formData.name}"] [data-test="table-item-delete"]`).click();
      cy.wait(3000);
      cy.get('[data-test="modal-ok"]').click();
    }
  });
});
