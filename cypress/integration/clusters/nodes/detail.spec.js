/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

describe('The Node Detail Page', function () {
  beforeEach('login', function () {
    cy.login('admin');

    cy.request({
      method: 'GET',
      url: `/kapis/resources.kubesphere.io/v1alpha2/nodes`,
    }).then(resp => {
      if (resp.body.items && resp.body.items.length > 0) {
        this.nodeName = resp.body.items[0].metadata.name;
      }
    });
  });

  it('successfully loads', function () {
    const name = this.nodeName;
    cy.visit(`/infrastructure/nodes/${name}/status`);
    cy.get('[data-test="detail-title"]').contains(name);
  });
});
