import routes from './routes';
import locales from './locales';

const menu = {
  parent: 'topbar',
  name: '{{extensionName}}',
  title: '{{displayName}}',
  icon: 'cluster',
  order: 0,
  desc: '{{description}}',
  skipAuth: true,
};

const extensionConfig = {
  routes,
  menus: [menu],
  locales,
};

export default extensionConfig;
