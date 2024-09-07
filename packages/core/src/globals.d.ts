/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

type ExtensionMenuParent =
  | 'topbar'
  | 'global'
  | 'toolbox'
  | 'access'
  | 'cluster'
  | 'workspace'
  | 'project'
  | 'platformSettings';

interface ExtensionMenu {
  parent: ExtensionMenuParent;
  name: string;
  link?: string;
  title: string;
  icon?: string;
  order?: number;
  desc?: string;
  skipAuth?: boolean;
  authKey?: string;
  authAction?: string;
  children?: ExtensionMenu[];
}

interface Extension {
  routes?: Record<string, any>[];
  menus?: ExtensionMenu[];
  locales?: Record<string, any>;
  isCheckLicense?: boolean;
}

interface Options {
  isSkipLicenseCheck?: boolean;
  extensionName?: string;
}

interface GlobalsConfig {
  importRemoteExtensions?: {
    includes?: string[];
    excludes?: string[];
  };
  [key: string]: any;
}

interface Globals {
  currentCluster?: string;
  config: GlobalsConfig;
  manifest: Record<string, string>;
  ksConfig: Record<string, any>;
  licenseInfo: {
    formattedLicenses: Record<string, any>[];
  };
  user: Record<string, any>;
  runtime: string;
  clusterRole: string;
  installedExtensions: {
    name: string;
    extensionName: string;
    link: string;
    resourceVersion: string;
  }[];
  context: {
    routes: Record<string, any>[];
    locales: Record<string, any>;
    registerLocales: (locales: Record<string, any> | undefined) => void;
    registerExtension: (extension: Extension, options?: Options) => void;
    registerExtensions: (extensions: Extension[], options?: Options) => void;
  };
  emitter: {
    all: any;
    on: any;
    off: any;
    emit: any;
  };
  run?: () => Promise<void>;
  clusterConfig?: Record<string, any>;
  theme: Record<string, string>;
  useDefaultTheme: boolean;
  defaultTheme: Record<string, string>;
  // TODO 新增别名
  workspacesAliasName: Record<string, string>;
  projectAliasName: Record<string, Record<string, string>>;
  clustersAliasName: Record<string, string>;
  userAliasName: Record<string, string>;
  platformRolesAliasName: Record<string, string>;
}

interface TFunction {
  (key: string | string[], options?: Record<string, any>): string;

  (key: string | string[], defaultValue?: string, options?: Record<string, any>): string;
}

interface Window {
  readonly globals: Globals;
  readonly t: TFunction;
}

declare const globals: Globals;
declare const t: TFunction;
// eslint-disable-next-line @typescript-eslint/naming-convention
