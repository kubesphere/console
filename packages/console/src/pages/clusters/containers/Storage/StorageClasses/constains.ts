/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

export const getAccessorsTemplate = (name: string) => ({
  apiVersion: 'storage.kubesphere.io/v1alpha1',
  kind: 'Accessor',
  metadata: {
    name: `${name}-accessor`,
  },
  spec: {
    storageClassName: `${name}-disabled`,
    namespaceSelector: {
      fieldSelector: [
        {
          fieldExpressions: [
            {
              field: 'Name',
              operator: 'In',
              values: [],
            },
          ],
        },
      ],
    },
    workspaceSelector: {
      fieldSelector: [
        {
          fieldExpressions: [
            {
              field: 'Name',
              operator: 'In',
              values: [],
            },
          ],
        },
      ],
    },
  },
});
