/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Cluster List
  BATCH_MANAGE: 'Batch Manage',
  // Cluster List > Batch Manage > Edit Tags
  CLUSTER_REPEATED_TAGS_DESC: 'The tag keys must be unique for each cluster.',
  CLUSTER_MAX_TAGS_DESC: 'Each cluster is allowed to carry a maximum of 5 tags.',
  EMPTY_TAG_LABEL_DESC: 'Please enter the tag key.',
  EMPTY_TAG_VALUE_DESC: 'Please enter the tag value.',
  HAS_ADD_TAGS: 'Added Tags',
  // Cluster List > Add Cluster
  CLUSTER_TYPE_DESC: 'Select a type to identify the purpose of the cluster.',
  // Cluster List > Remove Cluster
  DELETE_CLUSTER_SWIPE_DESC: 'I understand the risks of this operation.',
  REMOVE_CLUSTER_TIP_C:
    'Please clear the configuration information in the cluster by refering to the KubeSphere official documentation to avoid resource conflicts when the cluster joins another multi-cluster system.',
  // Cluster Tags
  CLUSTER_TAGS: 'Cluster Tags',
  NO_CLUSTER_TAGS: 'No Cluster Tag Found',
  NO_CLUSTER_TAGS_DESC: 'Please create a cluster tag.',
  CLUSTER_TAG_ADD_HELP: 'You can create tags if no tags meet the requirements.',
  // Cluster Tags > Create
  TAG_PL: 'Tags',
  CREATE_TAGS: 'Create Tags',
  CREATE_TAGS_DESC: 'The keys of different tags can be the same.',
  ENT_CLUSTER_TAG_DESC: 'The key and value cannot be empty. The maximum length is 63 characters.',
  CLUSTER_TAG_EMPTY_DESC: 'Please add a tag.',
  // Cluster Tags > Delete
  DELETE_MULTIPLE_TAGS: 'Delete Multiple Tags',
  DELETE_TAG: 'Delete Tag',
  DELETE_CLUSTER_TAG_DESC: 'Deleted tags will be removed from all clusters.',
  DELETE_CLUSTER_TAG_CONFIRM_DESC:
    'Please enter the tag key and value <strong>{resource}</strong> to confirm that you understand the risks of this operation.',
  DELETE_CLUSTER_TAGS_CONFIRM_DESC:
    'Please enter the tag keys and values <strong>{resource}</strong> to confirm that you understand the risks of this operation.',
  // Cluster Tags > Edit
  EDIT_TAG: 'Edit Tag',
  // Cluster Tags > Bind Clusters
  ADD_TO_CLUSTERS: 'Add to Clusters',
  ADD_TAG_TO_CLUSTERS: 'Add Tags to Clusters',
  ADD_TAG_DESC:
    'The tag keys must be unique for each cluster. New tags do not overwrite existing tags.',
  ADD_TAG_SUCCESSFUL: 'The tag was added successfully.',
  // Cluster Tags > Unbind Clusters
  REMOVE_FROM_CLUSTERS: 'Remove from Clusters',
  REMOVE_TAG_FROM_CLUSTERS: 'Remove Tag from Clusters',
  REMOVE_TAG: 'Remove Tag',
  REMOVE_TAG_DESC: 'Are you sure you want remove the tag from the cluster?',
  REMOVE_TAG_SUCCESSFUL: 'The tag was removed successfully.',
  // Cluster Tag > Unbind Clusters
  NO_CLUSTER_FOUND: 'No Cluster Found',
};
