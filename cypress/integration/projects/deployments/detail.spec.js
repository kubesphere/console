/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

const formData = {
  kind: 'Deployment',
  apiVersion: 'apps/v1',
  metadata: {
    name: 'tester-random-aaxx',
    namespace: 'e2e-test',
    labels: {
      app: 'tester-random-aaxx',
    },
    annotations: {
      'deployment.kubernetes.io/revision': '1',
      'kubesphere.io/description': 'tester-random-aaxx desc',
      'kubesphere.io/maxSurgePod': '2',
      'kubesphere.io/minAvailablePod': '1',
    },
  },
  spec: {
    replicas: 1,
    selector: {
      matchLabels: {
        app: 'tester-random-aaxx',
      },
    },
    template: {
      metadata: {
        labels: {
          app: 'tester-random-aaxx',
        },
      },
      spec: {
        containers: [
          {
            name: 'redis-xcs6kd',
            image: 'redis',
            ports: [
              {
                name: 'http-6379',
                containerPort: 6379,
                protocol: 'TCP',
              },
            ],
            resources: {
              limits: {
                cpu: '500m',
                memory: '500Mi',
              },
              requests: {
                cpu: '10m',
                memory: '10Mi',
              },
            },
            imagePullPolicy: 'IfNotPresent',
          },
        ],
      },
    },
    strategy: {
      type: 'RollingUpdate',
      rollingUpdate: {
        maxUnavailable: '25%',
        maxSurge: '25%',
      },
    },
  },
};

describe('The Deployment Detail Page', function () {
  before(function () {
    cy.login('admin');

    cy.request({
      method: 'GET',
      url: `/apis/apps/v1/namespaces/e2e-test/deployments/${formData.metadata.name}`,
      headers: { 'x-check-exist': true },
    }).then(resp => {
      if (!resp.body.exist) {
        cy.request({
          method: 'POST',
          url: `/apis/apps/v1/namespaces/e2e-test/deployments`,
          body: formData,
        });
      } else {
        cy.request({
          method: 'PATCH',
          url: `/apis/apps/v1/namespaces/e2e-test/deployments/${formData.metadata.name}`,
          headers: {
            'content-type': 'application/merge-patch+json',
          },
          body: { spec: { replicas: 1 } },
        });
      }
    });
  });

  beforeEach('login', function () {
    cy.login('admin');

    cy.server();
    cy.route('GET', /\/deployments/).as('getDeployment');
    cy.route('PATCH', /\/deployments/).as('patchDeployment');
    cy.route('PUT', /\/deployments/).as('putDeployment');
    cy.route('DELETE', /\/deployments/).as('deleteDeployment');
    cy.route('GET', /\/pods/).as('getPods');
    cy.route('GET', /\/replicasets/).as('getReplicasets');
    cy.route('GET', /\/monitoring\.kubesphere\.io/).as('getMetrics');
    cy.route('GET', /\/events/).as('getEvents');
    cy.route('POST', /\/rollback/).as('rollback');
    cy.route('GET', /\/rules/).as('getRules');
  });

  it('successfully loads', function () {
    cy.visit(`/projects/e2e-test/deployments/${formData.metadata.name}`);

    cy.wait('@getDeployment');
    cy.get('.kubed-icon-loading').should('not.exist');

    cy.get('[data-test="detail-title"]').contains(formData.metadata.name);
    cy.get('[data-test="detail-labels"]').contains('app');
    cy.get('[data-test="detail-labels"]').contains(formData.metadata.name);
  });

  it('detail page base operation', function () {
    test_init();
    test_edit();
    test_redeploy();
    test_editYaml();

    function test_init() {
      cy.log('test init');
      cy.visit(`/projects/e2e-test/deployments/${formData.metadata.name}`);
      cy.wait('@getDeployment');
      cy.wait('@getRules');
      cy.get('.kubed-icon-loading').should('not.exist');
    }

    function test_edit() {
      cy.log('test edit');
      cy.get('[data-test="detail-edit"]').click();
      cy.get('[name="metadata.annotations[\'kubesphere.io/alias-name\']"]')
        .clear()
        .type('redis_test');

      cy.get('[data-test="modal-ok"]').click();

      cy.wait('@patchDeployment');
      cy.wait('@getDeployment');
    }

    function test_redeploy() {
      cy.log('test redeploy');
      cy.get('[data-test="detail-more"]').click();
      cy.get('[data-test="detail-redeploy"]').click();

      cy.get('[data-test="modal-ok"]').click();

      cy.wait('@patchDeployment');
      cy.wait('@getPods');
    }

    function test_editYaml() {
      cy.log('test edit yaml');

      cy.get('[data-test="detail-more"]').click();
      cy.get('[data-test="detail-editYaml"]').click();

      cy.wait(1000);
      cy.get('.kubed-icon-loading').should('not.exist');

      cy.get('[data-test="modal-ok"]').click();

      cy.wait('@putDeployment');
      cy.wait('@getDeployment');
    }
  });

  it('detail page resource status', function () {
    cy.visit(`/projects/e2e-test/deployments/${formData.metadata.name}/resource-status`);
    cy.wait('@getDeployment');
    cy.wait('@getRules');
    cy.get('.kubed-icon-loading').should('not.exist');

    // check ports
    cy.get('[data-test="panel-ports"]').contains('6379');
    // check pod item
    cy.get('[data-test="panel-pods"] .src-components-Cards-Pods-index__item')
      .its('length')
      .should('be.gt', 0);

    // expand check pod item
    cy.get('[data-test="panel-pods"] .src-components-Cards-Pods-index__item').first().click();

    // check pod container item
    cy.get('[data-test="panel-pods"] .src-components-Cards-Pods-index__item')
      .first()
      .find('.src-components-Cards-Containers-index__item')
      .its('length')
      .should('be.gt', 0);

    // scale replicas
    cy.get(
      '.src-pages-projects-components-Cards-Replica-Status-index__scale .kubed-icon-chevron-down',
    ).click();
    cy.get('.src-components-Base-NotifyConfirm-index__wrapper').contains('Apply changes').click();

    cy.wait('@patchDeployment');
    cy.wait('@getPods');

    cy.get(
      '.src-pages-projects-components-Cards-Replica-Status-index__scale .kubed-icon-chevron-up',
    ).click();
    cy.get(
      '.src-pages-projects-components-Cards-Replica-Status-index__scale .kubed-icon-chevron-up',
    ).click();
    cy.get(
      '.src-pages-projects-components-Cards-Replica-Status-index__scale .kubed-icon-chevron-up',
    ).click();
    cy.get('.src-components-Base-NotifyConfirm-index__wrapper').contains('Apply changes').click();

    cy.wait('@patchDeployment');
    cy.wait('@getPods');
  });

  it('detail page revision', function () {
    cy.visit(`/projects/e2e-test/deployments/${formData.metadata.name}/revision-control`);
    cy.wait('@getDeployment');
    cy.wait('@getRules');
    cy.wait('@getReplicasets');
    cy.get('.kubed-icon-loading').should('not.exist');

    cy.get('[data-revision]').first().find('.kubed-icon-eye').click();
    cy.get('.ReactModal__Overlay').contains('View YAML');

    cy.get('[data-test="modal-close"]').click();

    cy.get('[data-revision]').first().click();
    cy.url().should('include', 'revisions');

    cy.visit(`/projects/e2e-test/deployments/${formData.metadata.name}/revision-control`);
    cy.wait('@getDeployment');
    cy.wait('@getReplicasets');
    cy.get('.kubed-icon-loading').should('not.exist');

    cy.get('[data-test="detail-more"]').click();
    cy.get('[data-test="detail-rollBack"]').click();

    cy.get('[data-test="form-item-revision"] .select-control').click();
    cy.get('[data-test="form-item-revision"] .select-option').first().click();

    cy.get('[data-test="modal-ok"]').click();

    cy.wait('@rollback');
  });

  it('detail page monitoring', function () {
    cy.visit(`/projects/e2e-test/deployments/${formData.metadata.name}/monitors`);
    cy.wait('@getDeployment');
    cy.wait('@getMetrics');
    cy.get('.kubed-icon-loading').should('not.exist');
  });

  it('detail page enviroment', function () {
    cy.visit(`/projects/e2e-test/deployments/${formData.metadata.name}/envs`);
    cy.wait('@getDeployment');
    cy.get('.kubed-icon-loading').should('not.exist');
  });

  it('detail page events', function () {
    cy.visit(`/projects/e2e-test/deployments/${formData.metadata.name}/events`);
    cy.wait('@getDeployment');
    cy.wait('@getEvents');
    cy.get('.kubed-icon-loading').should('not.exist');

    cy.contains('ScalingReplicaSet');
  });

  it('detail page edit config template', function () {
    cy.visit(`/projects/e2e-test/deployments/${formData.metadata.name}/resource-status`);
    cy.wait('@getDeployment');
    cy.wait('@getRules');
    cy.get('.kubed-icon-loading').should('not.exist');

    cy.get('[data-test="detail-more"]').click();
    cy.get('[data-test="detail-editConfigTemplate"]').click();
    cy.get('[data-test="modal-ok"]').click();
  });

  it('detail page hpa', function () {
    cy.visit(`/projects/e2e-test/deployments/${formData.metadata.name}/resource-status`);
    cy.wait('@getDeployment');
    cy.wait('@getRules');
    cy.get('.kubed-icon-loading').should('not.exist');

    cy.get('[data-test="detail-more"]').click();
    cy.get('[data-test="detail-editHpa"]').click();
    cy.get('[data-test="modal-ok"]').click();
  });

  it('detail page delete', function () {});
});
