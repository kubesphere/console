/*
 * This file is part of KubeSphere Console.
 * Copyright (C) 2019 The KubeSphere Console Authors.
 *
 * KubeSphere Console is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * KubeSphere Console is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with KubeSphere Console.  If not, see <https://www.gnu.org/licenses/>.
 */

describe('The Cluster Role Detail Page', function() {
  beforeEach('login', function() {
    cy.login('admin')
  })

  it('successfully loads', function() {
    const name = 'cluster-admin'
    cy.visit(`/roles/${name}`)

    cy.get('[data-test="detail-title"]').contains(name)
  })

  it('failed loads', function() {
    cy.visit('/roles/sxxaayyuixzuxi')

    cy.get('.h1').contains('Not Found')

    cy.get('.h1+p a').click()

    cy.url().should('include', 'roles')
  })

  it('account detail base operation', function() {
    cy.server()

    cy.route('GET', /\/clusterroles/).as('getRoles')


    const formData = {
      apiVersion: 'rbac.authorization.k8s.io/v1',
      kind: 'ClusterRole',
      rules: [
        {
          verbs: ['*'],
          apiGroups: ['*'],
          resources: ['workspaces', 'workspaces/*'],
        },
        {
          verbs: ['list'],
          apiGroups: ['iam.kubesphere.io'],
          resources: ['users'],
        },
        {
          verbs: ['get', 'list'],
          apiGroups: ['monitoring.kubesphere.io', 'monitoring.coreos.com'],
          resources: ['*'],
        },
        {
          verbs: ['get', 'list'],
          apiGroups: ['', 'resources.kubesphere.io'],
          resources: [
            'componenthealth',
            'components',
            'nodes',
            'events',
            'pods',
          ],
        },
        { verbs: ['get'], apiGroups: [''], resources: ['namespaces'] },
        {
          verbs: ['list'],
          apiGroups: ['resources.kubesphere.io'],
          resources: ['pods'],
        },
        {
          verbs: ['get', 'list'],
          apiGroups: ['alerting.kubesphere.io'],
          resources: ['*'],
        },
        {
          verbs: ['create'],
          apiGroups: ['alerting.kubesphere.io'],
          resources: ['*'],
        },
        {
          verbs: ['get', 'list', 'update', 'patch'],
          apiGroups: ['alerting.kubesphere.io'],
          resources: ['*'],
        },
        {
          verbs: ['delete'],
          apiGroups: ['alerting.kubesphere.io'],
          resources: ['*'],
        },
      ],
      metadata: {
        name: 'tester-random-aaxx',
        annotations: {
          'kubesphere.io/description': 'tester random',
          'kubesphere.io/creator': 'admin',
        },
      },
    }

    cy.request({
      method: 'GET',
      url: `/apis/rbac.authorization.k8s.io/v1/clusterroles/${
        formData.metadata.name
      }`,
      headers: { 'x-check-exist': true },
    }).then(resp => {
      if (resp.body.exist) {
        cy.request(
          'DELETE',
          `/apis/rbac.authorization.k8s.io/v1/clusterroles/${
            formData.metadata.name
          }`
        )
      }
      cy.request(
        'POST',
        '/apis/rbac.authorization.k8s.io/v1/clusterroles',
        formData
      )
    })

    cy.visit(`/roles/${formData.metadata.name}`)
    cy.get('[data-test="detail-title"]').contains(formData.metadata.name)
    cy.get('[data-test="rule-list"] > li').should('have.length', 3)

    // edit
    {
      cy.get('[data-test="detail-edit"]').click()

      cy.get('[name="metadata.annotations[\'kubesphere.io/description\']"]')
        .clear()
        .type(
          `aaa ${formData.metadata.annotations['kubesphere.io/description']}`
        )

      cy.get('[data-test="modal-next"]').click()

      cy.get(`input[name="logging"][value="view"]`)
        .parent()
        .click()

      cy.get('[data-test="modal-create"]').click()

      cy.wait('@getRoles')

      cy.get('[data-test="detail-desc"]').contains(
        `aaa ${formData.metadata.annotations['kubesphere.io/description']}`
      )
      cy.get('[data-test="rule-list"] > li').should('have.length', 4)
    }

    // delete
    {
      cy.get('[data-test="detail-delete"]').click()
      cy.get('[data-test="modal-ok"]').click()

      cy.wait('@getRoles')

      cy.get('.autosuggest-input > input').type(
        `${formData.metadata.name}{enter}`
      )

      cy.get('.ks-table tbody.table-tbody')
        .contains(
          `aaa ${formData.metadata.annotations['kubesphere.io/description']}`
        )
        .should('not.be.visible')
    }
  })
})
