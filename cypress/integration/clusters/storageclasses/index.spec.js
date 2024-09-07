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

    cy.route('GET', /\/storageclasses/).as('getStorageClasses');

    cy.visit('/infrastructure/storageclasses');

    cy.wait('@getStorageClasses');

    cy.get('.ks-table tbody.table-tbody > tr').its('length').should('be.gt', 0);

    cy.get('.ks-table tbody.table-tbody > tr').first().find('a').click();
    cy.url().should('include', 'volumes');
  });

  it('list page base operation', function () {
    cy.server();

    cy.route('GET', /\/storageclasses/).as('getStorageClasses');
    cy.route('POST', /\/storageclasses/).as('createStorageClass');
    cy.route('PATCH', /\/storageclasses/).as('updateStorageClass');
    cy.route('DELETE', /\/storageclasses/).as('deleteStorageClass');

    cy.visit('/infrastructure/storageclasses');

    cy.wait('@getStorageClasses');

    const formData = {
      name: 'tester-random-aaxx',
      desc: 'tester random',
      provisioner: 'csi-qingcloud',
      parameters: {
        type: 0,
        maxSize: 100,
        minSize: 10,
        stepSize: 10,
      },
    };

    // delete old data
    cy.request({
      method: 'GET',
      url: `/apis/storage.k8s.io/v1/storageclasses/${formData.name}`,
      headers: { 'x-check-exist': true },
    }).then(resp => {
      if (resp.body.exist) {
        cy.request('DELETE', `/apis/storage.k8s.io/v1/storageclasses/${formData.name}`);
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

      cy.get('[data-value="disk.csi.qingcloud.com"]').click();
      cy.get('[data-test="modal-next"]').click();

      Object.keys(formData.parameters).forEach(key => {
        cy.get(`[name="parameters.${key}"]`).type(formData.parameters[key]);
      });

      // submit
      cy.get('[data-test="modal-create"]').click();

      cy.wait('@createStorageClass');
    }

    // search
    {
      cy.get('.autosuggest-input > input').type(`${formData.name}{enter}`);

      // wait loading end
      cy.wait('@getStorageClasses');

      cy.get('.ks-table tbody.table-tbody').contains(formData.name);
    }

    // delete
    {
      cy.get(`[data-row-key="${formData.name}"] .checkbox`).click();
      cy.get('[data-test="table-delete"]').click();

      cy.get('.input').type(formData.name);

      cy.get('[data-test="modal-ok"]').click();

      cy.wait('@deleteStorageClass');

      cy.get('.ks-table tbody.table-tbody').contains(formData.name).should('not.be.visible');
    }

    // clear search
    {
      cy.get('.icon-clickable > .kubed-icon').click();

      cy.wait('@getStorageClasses');

      cy.get('.ks-table tbody.table-tbody > tr').its('length').should('be.gt', 0);
    }
  });
});
