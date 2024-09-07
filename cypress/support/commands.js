/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

const USERS = {
  admin: {
    username: Cypress.env('username'),
    password: Cypress.env('password'),
  },
};

Cypress.Commands.add('login', role => {
  cy.request('POST', '/login', USERS[role || 'admin']);
  cy.setCookie('lang', 'en');
});

Cypress.Commands.add('enterWorkspace', workspace => {
  cy.request({
    method: 'GET',
    url: `/kapis/tenant.kubesphere.io/v1beta1/workspaces/workspace`,
    headers: { 'x-check-exist': true },
  }).then(resp => {
    if (!resp.body.exist) {
      cy.request('POST', `/apis/tenant.kubesphere.io/v1alpha1/workspaces`, {});
    }
  });
});
