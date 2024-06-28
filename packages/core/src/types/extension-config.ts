import type { RouteObject } from 'react-router-dom';

type ExtensionMenuParent =
  | 'topbar'
  | 'global'
  | 'toolbox'
  | 'access'
  | 'cluster'
  | 'workspace'
  | 'project'
  | 'platformSettings';

export interface ExtensionMenu {
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

export interface ExtensionConfig {
  routes?: RouteObject[];
  menus?: ExtensionMenu[];
  locales?: Record<string, any>;
  isCheckLicense?: boolean;
}
