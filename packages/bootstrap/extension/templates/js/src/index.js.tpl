import routes from './routes';
import locales from './locales';

const menus = [
  {
    parent: 'topbar',
    name: '{{extensionName}}',
    title: '{{displayName}}',
    icon: 'cluster',
    order: 0,
    desc: '{{description}}',
    skipAuth: true,
  },
];

const extensionConfig = {
  routes,
  menus,
  locales,
};

export default extensionConfig;
