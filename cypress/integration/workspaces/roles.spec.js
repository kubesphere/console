/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

describe('The Workspace Overview Page', function () {
  beforeEach('login', function () {
    cy.login('admin');
  });

  it('successfully loads', function () {
    cy.server();

    cy.route('GET', /\/workspaces/).as('getWorkspace');
    cy.route('GET', /\/roles/).as('getWorkspaceRoles');

    cy.visit('/workspaces/e2e-test/roles');

    cy.wait('@getWorkspace');
    cy.wait('@getWorkspaceRoles');

    cy.contains('workspace-admin');
    cy.contains('workspace-regular');
    cy.contains('workspace-viewer');
  });

  it('detail page', function () {
    cy.server();

    cy.route('GET', /\/workspaces/).as('getWorkspace');
    cy.route('GET', /\/rules/).as('getWorkspaceRoleRules');
    cy.route('GET', /\/members/).as('getWorkspaceRoleMembers');

    cy.visit('/workspaces/e2e-test/roles/workspace-admin');

    cy.wait('@getWorkspace');
    cy.wait('@getWorkspaceRoleRules');

    cy.get('[data-test="rule-list"] > li').should('have.length', 7);

    cy.visit('/workspaces/e2e-test/roles/workspace-admin/users');
    cy.wait('@getWorkspaceRoleMembers');
    cy.contains(Cypress.env('username'));
  });
});
