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
