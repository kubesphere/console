/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

describe('The Cluster Roles Page', function () {
  beforeEach('login', function () {
    cy.login('admin');
  });

  it('successfully loads', function () {
    cy.server();

    cy.route('GET', /\/clusterroles/).as('getRoles');

    cy.visit('/roles');

    cy.wait('@getRoles');

    cy.get('.ks-table tbody.table-tbody > tr').its('length').should('be.gt', 0);

    cy.get('.ks-table tbody.table-tbody > tr').first().find('a').click();
    cy.url().should('include', 'authorizations');
  });

  it('list page base operation', function () {
    cy.server();

    cy.route('GET', /\/clusterroles/).as('getRoles');
    cy.route('POST', /\/clusterroles/).as('createRole');
    cy.route('PATCH', /\/clusterroles/).as('updateRole');
    cy.route('DELETE', /\/clusterroles/).as('deleteRole');

    cy.visit('/roles');

    cy.wait('@getRoles');

    const formData = {
      name: 'tester-random-aaxx',
      desc: 'tester random',
      priorities: [
        {
          name: 'workspaces',
          value: ['manage'],
        },
        {
          name: 'monitoring',
          value: ['view'],
        },
        {
          name: 'alerting',
          value: ['view', 'create', 'delete'],
        },
      ],
    };

    // delete old data
    cy.request({
      method: 'GET',
      url: `/apis/rbac.authorization.k8s.io/v1/clusterroles/${formData.name}`,
      headers: { 'x-check-exist': true },
    }).then(resp => {
      if (resp.body.exist) {
        cy.request('DELETE', `/apis/rbac.authorization.k8s.io/v1/clusterroles/${formData.name}`);
      }
    });

    // create
    {
      cy.get('[data-test="table-create"]').click();

      // fill create form
      cy.get('[name="metadata.name"]').type(formData.name);
      cy.get('[name="metadata.annotations[\'kubesphere.io/description\']"]').type(formData.desc);

      // next
      cy.get('[data-test="modal-next"]').click();

      formData.priorities.forEach(item => {
        item.value.forEach(subItem => {
          cy.get(`input[name="${item.name}"][value="${subItem}"]`).parent().click();
        });
      });

      // submit
      cy.get('[data-test="modal-create"]').click();

      cy.wait('@createRole');
      cy.wait('@getRoles');
    }

    // search
    {
      cy.get('.autosuggest-input > input').type(`${formData.name}{enter}`);

      // wait loading end
      cy.wait('@getRoles');

      cy.get('.ks-table tbody.table-tbody').contains(formData.desc);
    }

    // edit
    {
      cy.get(`[data-row-key="${formData.name}"] button .kubed-icon-more`).click();
      cy.get(`[data-row-key="${formData.name}"] [data-test="table-item-edit"]`).click();

      cy.get('[name="metadata.annotations[\'kubesphere.io/description\']"]')
        .clear()
        .type(`aaa ${formData.desc}`);

      cy.get('[data-test="modal-next"]').click();

      cy.get('input[name="logging"][value="view"]').parent().click();

      cy.get('[data-test="modal-create"]').click();

      cy.wait('@updateRole');

      cy.get('.ks-table tbody.table-tbody').contains(`aaa ${formData.desc}`);
    }

    // delete
    {
      cy.get(`[data-row-key="${formData.name}"] button .kubed-icon-more`).click();
      cy.get(`[data-row-key="${formData.name}"] [data-test="table-item-delete"]`).click();

      cy.get('[data-test="modal-ok"]').click();

      cy.wait('@deleteRole');

      cy.get('.ks-table tbody.table-tbody')
        .contains(`aaa ${formData.desc}`)
        .should('not.be.visible');
    }

    // clear search
    {
      cy.get('.icon-clickable > .kubed-icon').click();

      cy.wait('@getRoles');

      cy.get('.ks-table tbody.table-tbody > tr').its('length').should('be.gt', 0);
    }
  });
});
