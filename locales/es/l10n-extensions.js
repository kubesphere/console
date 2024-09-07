/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  BRAND: 'KubeSphere',
  EXTENSION: 'Extension',
  EXTENSION_DESC: 'Quickly access your extensions for platforms, clusters, and workspaces.',
  EXTENSION_WITH_SUFFIX: 'Extension {suffix}',
  VERSION: 'Version',
  NO_DATA: 'No Data',

  // marketplace
  MARKETPLACE_EN: 'Marketplace',
  KUBESPHERE_MARKETPLACE: 'KubeSphere Marketplace',
  SUBSCRIBE: 'Subscribe',
  SUBSCRIPTION_FAILED: 'Subscription failed',
  MANAGE: 'Manage',
  BIND_MARKETPLACE_ACCOUNT: 'Bind Marketplace account',
  BIND_MARKETPLACE_ACCOUNT_DESCRIPTION:
    'Please go to the "Extension Center" to bind your KubeSphere cloud account before subscribing to the extensions',
  GO: 'Go',

  // manager
  EXTENSIONS_CENTER: 'Extensions Center',
  EXTENSIONS_CENTER_DESCRIPTION:
    'It is a management center for your extensions. Here, you can install, uninstall, update, configure, enable, or disable extensions.',
  // common
  CLUSTER_AGENT_WITH_SUFFIX: 'Cluster Agent {suffix}',
  // status.state
  PREPARING: 'Preparing',
  INSTALLING: 'Installing',
  UPDATING: 'Updating',
  UNINSTALLING: 'Uninstalling',
  INSTALLED: 'Installed',
  ENABLED: 'Enabled',
  DISABLED: 'Disabled',
  UNINSTALLED: 'Uninstalled',
  INSTALL_FAILED: 'Install Failed',
  UPDATE_FAILED: 'Update Failed',
  UNINSTALL_FAILED: 'Uninstall Failed',
  // status.state > custom
  LOCAL_PENDING: 'Waiting',
  NOT_INSTALLED: 'Not Installed',
  INSTALL_SUCCESS: 'Install Success',
  UNINSTALL_SUCCESS: 'Uninstall Success',
  INSTALL_EXCEPTION: 'Install Exception',
  UPDATE_EXCEPTION: 'Update Exception',
  UNINSTALL_EXCEPTION: 'Uninstall Exception',
  // actions
  INSTALL: 'Install',
  ENABLE: 'Enable',
  DISABLE: 'Disable',
  UNINSTALL: 'Uninstall',
  FORCE_UNINSTALL: 'Force Uninstall',
  UNINSTALL_EXTENSION: 'Uninstall Extension',
  FORCE_UNINSTALL_EXTENSION: 'Force Uninstall Extension',
  UPDATE: 'Update',
  EXTENSION_INSTALLED: '{extensionLocaleDisplayName} installed, please refresh the page',
  EXTENSION_UNINSTALLED: '{extensionLocaleDisplayName} uninstalled, please refresh the page',
  ENABLE_EXTENSION_ING: 'Enable {extensionLocaleDisplayName}...',
  EXTENSION_ENABLED: '{extensionLocaleDisplayName} enabled, please refresh the page',
  DISABLE_EXTENSION_ING: 'Disable {extensionLocaleDisplayName}...',
  EXTENSION_DISABLED: '{extensionLocaleDisplayName} disabled, Please refresh the page',
  SET_EXTENSION_CONFIG_ING: 'Set Extension Config...',
  SET_EXTENSION_CONFIG_SUCCESSFULLY: 'Set Extension Config Successfully',
  SET_CLUSTER_AGENT_CONFIG_ING: 'Set Cluster Agent Config...',
  SET_CLUSTER_AGENT_CONFIG_SUCCESSFULLY: 'Set Cluster Agent Successfully',
  UNINSTALL_CONFIRM_TIP:
    'This action cannot be undone, please enter the extension name <b>{extensionName}</b> to confirm that you understand the risks of this action.',
  UPDATE_AVAILABLE: 'update available',
  VIEW_EXTENSION_FILES: 'View Files',

  // files viewer modal
  CURRENT_VERSION_WITH_VERSION: 'Current Version: {version}',
  EXTENSION_FILES_SEARCH_PLACEHOLDER: 'Search by file name',
  ALL_EXTENSION_FILES: 'All Files',
  KIND: 'Kind',
  COPY: 'Copy',
  COPIED: 'Copied',
  DOWNLOAD: 'Download',
  NO_MATCHING_RESULTS_FOUND: 'No matching results found',
  YOU_CAN_TRY_ACTION: 'You can try',
  CLEARING_THE_SEARCH_CRITERIA: 'clearing the search criteria',

  // extensions
  EXTENSIONS: 'Extensions',
  SEARCH: 'Search',
  FILTERS: 'Filters',
  CATEGORIES: 'Categories',
  KEYWORDS: 'Keywords',
  RESULTS_COUNT: '{count} Results',
  CLEAR_ALL_FILTERS: 'Clear All Filters',
  BY_PROVIDER: 'by {providerName}',
  NO_EXTENSION_FOUND: 'No Extension Found',
  NO_EXTENSION_FOUND_DESC:
    'No extensions found at the moment. Please complete the installation and deployment in the extension center before use.',
  NO_MATCHING_RESULT_FOUND: 'No Matching Result Found',
  YOU_CAN_TRY_TO: 'You can try',
  REFRESH_PAGE: 'refresh page',
  OR: 'or',
  CLEAR_SEARCH_CONDITIONS: 'clear search conditions',
  VIEW_EXTENSION_INSTALLATION_LOG: 'View extension installation log',
  VIEW_EXTENSION_UNINSTALLATION_LOG: 'View extension uninstallation log',
  EXTENSION_INSTALLATION_LOG: 'Extension installation log',
  EXTENSION_UNINSTALLATION_LOG: 'Extension uninstallation log',
  OBSERVABILITY_CENTER: 'Whizard Observability Center',
  DISTRIBUTED_OBSERVABILITY_CENTER_DESC:
    'Unified monitoring dashboard that provides metrics of all clusters managed by the platform.',
  // table ui
  UNBOUND_MARKETPLACE_ACCOUNT: 'Unbound KubeSphere cloud account',
  UNBOUND_MARKETPLACE_ACCOUNT_DESCRIPTION:
    'Bind the KubeSphere cloud account, and your subscriptions in the extension marketplace will be automatically synchronized here.<br />You can login to your KubeSphere cloud account in any KubeSphere Online Console to access your subscribed extensions and use them.',
  SUBSCRIPTION_EXTENSION_NOT_FOUND: 'Subscription extensions not found',
  SUBSCRIPTION_EXTENSION_NOT_FOUND_DESCRIPTION:
    'Your KubeSphere cloud account subscription extension was not found. Please go to the extension market to find more extensions.',
  DISCOVER_EXTENSIONS: 'Discover Extensions',
  INSTALLATION_STATUS: 'Installation Status',
  ENABLED_STATE: 'Enabled State',
  INSTALLATION_TIME: 'Installation Time',
  SYNC_MARKETPLACE_ACCOUNT: 'Sync Cloud Account',
  SYNC_MARKETPLACE_ACCOUNT_SUCCESSFULLY: 'Sync cloud account successfully',
  MARKETPLACE_ACCOUNT_SETTINGS: 'Cloud Account Settings',
  SUBSCRIPTION_MANAGEMENT: 'Subscriptions',
  ORDER_MANAGEMENT: 'Orders',
  UNBIND_MARKETPLACE_ACCOUNT: 'Unbind Cloud Account',
  UNBIND_MARKETPLACE_ACCOUNT_DESCRIPTION:
    'After the cloud account is unbound, the extension components of the subscription cannot be obtained. Are you sure you want to unbind the cloud account?',
  MARKETPLACE_ACCOUNT_BINDING_FAILED: 'KubeSphere cloud account binding failed',
  MARKETPLACE_ACCOUNT_BINDING_FAILED_DESCRIPTION:
    'An error occurred during the binding process, please try to authorize the binding again.',
  UNBIND: 'Unbind',
  REBIND: 'Rebind',
  BIND_SUCCESSFULLY: 'Bind successfully',
  UNBIND_SUCCESSFULLY: 'Unbind successfully',
  // extensions > detail
  BACK: 'Back',
  EXTENSION_CONFIG: 'Extension Config',
  RECOMMENDED: 'Recommended',
  BASIC_INFORMATION: 'Basic Information',
  INSTALLED_VERSION: 'Installed Version',
  STATUS: 'Status',
  PROVIDER: 'Provider',
  EXT_HOMEPAGE: 'Homepage',
  RELEASE_DATE: 'Release Date',
  EXTENSION_ID: 'Extension ID',
  KUBERNETES_VERSION: 'Kubernetes Version',
  KUBE_SPHERE_VERSION: 'KubeSphere Version',
  EXTENSION_REPOSITORIES: 'Extension Repositories',
  EXTENSION_DOCUMENTS: 'Extension Documents',
  OVERVIEW: 'Overview',
  INTRODUCTION: 'Introduction',
  SCREENSHOTS: 'Screenshots',
  CHANGELOGS: 'Changelogs',
  PERMISSION_REQUIREMENTS: 'Permission Requirements',
  INSTALLED_CLUSTER_AGENT: 'Installed Cluster Agent',
  // extensions > detail > action menus
  INSTALL_CLUSTER_AGENT: 'Install Cluster Agent',
  CLUSTER_AGENT_CONFIGS: 'Cluster Agent Configs',
  // extensions > detail > ExtensionMultiClusterLogsButton
  CLUSTER_AGENT: 'Cluster Agent',
  COMPONENT_INSTALLATION_STATUS: 'Component installation status',
  VIEW_LOG: 'View Log',
  CLUSTER_AGENT_INSTALLATION_LOG: 'Cluster Agent Installation Log',
  CLUSTER_AGENT_UNINSTALLATION_LOG: 'Cluster Agent Uninstallation Log',
  CLUSTER_AGENT_INSTALLATION_PROGRESS: 'Cluster Agent Installation Progress',
  INSTALLATION_LOG: 'Installation Log',
  UNINSTALLATION_LOG: 'Uninstallation Log',
  // install
  CURRENT: 'Current',
  EXTENSION_FINISHED: 'Finished',
  NOT_SET: 'Not set',
  PREVIOUS: 'Previous',
  NEXT: 'Next',
  CANCEL: 'Cancel',
  OK: 'OK',
  // install > Version Selection
  VERSION_SELECTION: 'Version Selection',
  'EXTENSION.EXTENSION_NO_VERSION_DESCRIPTION': 'There is no version of this extension',
  UPDATE_WARNING:
    'The update process will cause the extensions to be unavailable, which may affect the business. Please perform it during low business hours.',
  EXTENSION_VERSION: 'Extension Version',
  KUBERNETES_VERSION_REQUIREMENTS: 'Kubernetes Version Requirements',
  KUBESPHERE_VERSION_REQUIREMENTS: 'Kubesphere Version Requirements',
  VERSION_MISMATCH: 'Version Mismatch',
  AVAILABLE_UPDATE_VERSIONS: 'Available Update Versions',
  EXTENSION_DEPENDENCIES_NOT_FOUND: 'Extension Dependencies Not Found',
  THE_CURRENT_EXTENSION_VERSION_HAS_NO_DEPENDENCIES:
    'The current extension version has no dependencies',
  REQUIRED_EXTENSIONS: 'Required Extensions',
  OPTIONAL_EXTENSIONS: 'Optional Extensions',
  EXTENSION_NOT_EXISTS_TIP: 'The extension does not exist in the platform',
  SATISFIED_VERSION: 'Satisfied Version',
  READY: 'Ready',
  UNREADY: 'Unready',
  REQUIRED_DEPENDENCY_VERSION_NOT_SATISFIED_TIP:
    'The <b>{dependencyLocaleDisplayName}</b> extension does not have the satisfied version installed, which will make it impossible to install, update and use <b>{extensionLocaleDisplayName}</b>.',
  REQUIRED_DEPENDENCY_EXCEPTION_TIP:
    'The <b>{dependencyLocaleDisplayName}</b> extension is abnormal, which will make it impossible to install, update and use <b>{extensionLocaleDisplayName}</b>.',
  OPTIONAL_DEPENDENCY_TIP:
    'Optional dependencies that are not ready will not affect the normal use of the target installation extensions. If you need to use optional extensions, please confirm whether the extensions status is abnormal or the satisfied version has been installed.',
  // install > Extension Installation
  EXTENSION_INSTALLATION: 'Extension Installation',
  EXTENSION_UPDATE: 'Extension Update',
  SET_THE_CONFIGURATION_OF_THE_EXTENSION: 'Set the configuration of the extension.',
  START_INSTALLATION: 'Start Installation',
  START_UPDATE: 'Start Update',
  SUCCEED: 'Succeed',
  // install > Clusters Selection
  CLUSTER_SELECTION: 'Clusters Selection',
  SEARCH_CLUSTERS: 'Search clusters',
  UNSELECTED_INSTALLED_CLUSTERS_TIP:
    'Unchecked, the extension agent and data in the {clusterName} cluster will be cleaned up.',
  // install > Diff Config
  DIFF_CONFIG: 'Diff Config',
  CONFIGURATION_CHANGED: 'Configuration changed',
  EDIT_CLUSTER_CONFIGURATION: 'Edit Cluster Configuration',
  CLUSTER_CONFIGURATION: 'Cluster Configuration',
  // install > Submit
  REMOVE_CLUSTERS_CONFIRM_TITLE_SI: 'Uninstall Agent',
  REMOVE_CLUSTERS_CONFIRM_TITLE_PL: 'Uninstall Agents',
  EXTENSION_CLUSTER_AGENT_LOW: 'unchecked cluster',
  // Reset Default Configuration
  RESET_DEFAULT_CONFIGURATION_TITLE: 'Reset Recommended Configuration',
  RESET_DEFAULT_CONFIGURATION_DESCRIPTION:
    'Use the latest recommended configuration to install or upgrade the extension components. It is recommended to adapt your environment based on the latest recommended configuration before installation or upgrade.',
  RESET_DEFAULT_CONFIGURATION_CONFIRM_DESCRIPTION:
    'Are you sure you want to restore the current configuration to the recommended configuration?',
};
