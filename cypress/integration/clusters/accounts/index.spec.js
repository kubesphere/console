/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

describe('The Accounts Page', function () {
  beforeEach('login', function () {
    cy.login('admin');
  });

  it('successfully loads', function () {
    cy.server();

    cy.route('GET', /\/users/).as('getAccounts');

    cy.visit('/accounts');

    cy.wait('@getAccounts');

    cy.get('.ks-table tbody.table-tbody > tr').its('length').should('be.gt', 2);

    cy.get('.ks-table tbody.table-tbody > tr').first().find('a').click();
    cy.url().should('include', 'login_history');
  });

  it('list batch delete', function () {
    cy.server();

    cy.route('GET', /\/users/, 'fixture:accounts.json').as('getAccounts');
    cy.route('DELETE', /\/users/, {}).as('deleteAccount');

    cy.visit('/accounts');

    cy.wait('@getAccounts');

    cy.get('[data-row-key="ahao"] .checkbox').click();
    cy.get('[data-row-key="ben"] .checkbox').click();

    cy.get('[data-test="table-delete"]').click();

    cy.get('.input').type('ahao, ben');

    cy.get('[data-test="modal-ok"]').click();

    cy.wait('@deleteAccount');
  });

  it('list page base operation', function () {
    cy.visit('/accounts');

    const account = {
      name: 'tester-random-aaxx',
      email: 'tester-random-aaxx@test.com',
      password: 'Zhu88jie',
    };

    // delete old data
    cy.request({
      method: 'GET',
      url: `/apis/iam.kubesphere.io/v1alpha2/users/${account.name}`,
      headers: { 'x-check-exist': true },
    }).then(resp => {
      if (resp.body.exist) {
        cy.request('DELETE', `/apis/iam.kubesphere.io/v1alpha2/users/${account.name}`);
      }
    });

    cy.server();

    cy.route('GET', /\/users/).as('getAccounts');
    cy.route('POST', /\/users/).as('createAccount');
    cy.route('PUT', /\/users/).as('updateAccount');
    cy.route('DELETE', /\/users/).as('deleteAccount');

    // create
    {
      cy.get('[data-test="table-create"]').click();

      // fill create form
      cy.get('#username').type(account.name);
      cy.get('#email').type(account.email);
      cy.get('.select-control').click();
      cy.get('.select-option.is-focused').click();
      cy.get('#password').type(account.password);

      // submit
      cy.get('button[type="submit"]').click();

      cy.wait('@createAccount');
    }

    // search
    {
      cy.get('[data-test="search"] input').type(`${account.name}{enter}`);

      cy.wait('@getAccounts');

      cy.get('.ks-table tbody.table-tbody').contains(account.email);
    }

    // edit
    {
      cy.get(`[data-row-key="${account.name}"] button .kubed-icon-more`).click();
      cy.get(`[data-row-key="${account.name}"] [data-test="table-item-edit"]`).click();

      cy.get('#email').clear().type(`aaa-${account.email}`);
      cy.get('button[type="submit"]').click();

      cy.wait('@updateAccount');

      cy.get('.ks-table tbody.table-tbody').contains(`aaa-${account.email}`);
    }

    // delete
    {
      cy.get(`[data-row-key="${account.name}"] button .kubed-icon-more`).click();
      cy.get(`[data-row-key="${account.name}"] [data-test="table-item-delete"]`).click();

      cy.get('input[name="confirm"]').type(account.name);
      cy.get('[data-test="modal-ok"]').click();

      cy.wait('@deleteAccount');

      cy.get('.ks-table tbody.table-tbody')
        .contains(`aaa-${account.email}`)
        .should('not.be.visible');
    }

    // clear search
    {
      cy.get('.icon-clickable > .kubed-icon').click();

      cy.wait('@getAccounts');

      cy.get('.ks-table tbody.table-tbody > tr').its('length').should('be.gt', 2);
    }
  });
});
