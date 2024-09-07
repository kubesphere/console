/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

describe('The StorageClass Detail Page', function () {
  beforeEach('login', function () {
    cy.login('admin');
  });

  it('successfully loads', function () {
    const name = 'local';
    cy.visit(`/infrastructure/storageclasses/${name}`);
    cy.get('[data-test="detail-title"]').contains(name);
  });
});
