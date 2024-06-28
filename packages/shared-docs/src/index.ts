import routes from './routes';
import locales from './locales';

const menu = {
  parent: 'toolbox',
  name: 'shared-docs',
  title: 'DOCS',
  children: [{
    name: 'docs',
    title: 'SHARED_DOCS',
    icon: 'documentation',
    desc: 'SHARED_DOCS_DESC',
    link: '/docs',
    enabled: true,
  }],
  skipAuth: true,
}

const extensionConfig = {
  menus: [menu],
  routes,
  locales,
};

export default extensionConfig;
