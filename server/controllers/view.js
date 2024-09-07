/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

const { startsWith, get } = require('lodash');
const {
  getCurrentUser,
  getKSConfig,
  getK8sRuntime,
  getOAuthInfo,
  getClusterRole,
  getSupportGpuList,
  getInstallerSpec,
  getTheme,
} = require('../services/session');

const { getInstalledExtensions } = require('../services/extension');

const {
  getServerConfig,
  getManifest,
  getLocaleManifest,
  getImportMap,
  isValidReferer,
  safeBase64,
  getV3Manifest,
  getV3LocaleManifest,
  getThemeConfig,
  getDllManifest,
} = require('../libs/utils');

const { client: clientConfig } = getServerConfig();

const renderIndex = async (ctx, params) => {
  const themeData = await getTheme(ctx);
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const _theme = getThemeConfig(themeData);
  const { title, favicon, theme, defaultTheme, logo, background } = _theme;
  const useDefaultTheme = !startsWith(logo, '/theme');

  const manifest = getManifest('main');
  const dllManifest = getDllManifest();
  const localeManifest = getLocaleManifest();
  const importMap = getImportMap();

  await ctx.render('index', {
    manifest,
    dllManifest,
    isDev: global.MODE_DEV,
    title: useDefaultTheme ? defaultTheme?.tabTitle : title,
    favicon,
    background,
    hostname: ctx.hostname,
    importMap: JSON.stringify(importMap),
    globals: JSON.stringify({
      config: clientConfig,
      manifest,
      localeManifest,
      theme,
      defaultTheme,
      useDefaultTheme,
      ...params,
    }),
  });
};

const renderV3Index = async (ctx, params) => {
  const themeData = await getTheme(ctx);
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const _theme = getThemeConfig(themeData);
  const { theme, defaultTheme, logo } = _theme;
  const useDefaultTheme = !startsWith(logo, '/theme');

  const manifest = getV3Manifest('main');
  const localeManifest = getV3LocaleManifest();

  await ctx.render('consolev3', {
    manifest,
    isDev: global.MODE_DEV,
    title: clientConfig.title,
    hostname: ctx.hostname,
    globals: JSON.stringify({
      config: clientConfig,
      localeManifest,

      theme,
      defaultTheme,
      useDefaultTheme,

      ...params,
    }),
  });
};

const renderViewErr = async (ctx, err) => {
  const themeData = await getTheme(ctx);
  const _theme = getThemeConfig(themeData);
  const { title, favicon, logo, defaultTheme } = _theme;
  const useDefaultTheme = !startsWith(logo, '/theme');

  ctx.app.emit('error', err);
  if (err) {
    if (err.code === 401 || err.code === 403 || err.status === 401) {
      if (isValidReferer(ctx.path)) {
        ctx.redirect(`/login?referer=${ctx.path}`);
      } else {
        ctx.redirect('/login');
      }
    } else if (err.code === 502) {
      await ctx.render('error', {
        title: useDefaultTheme ? defaultTheme?.tabTitle : title,
        favicon,
        message: 'Unable to access the backend services',
      });
    } else if (err.code === 'ETIMEDOUT') {
      await ctx.render('error', {
        title: useDefaultTheme ? defaultTheme?.tabTitle : title,
        favicon,
        message: 'Unable to access the api server',
      });
    } else {
      ctx.app.emit('error', err);
    }
  } else {
    await ctx.render('error', {
      title: useDefaultTheme ? defaultTheme?.tabTitle : title,
      favicon,
      t: ctx.t.bind(ctx),
    });
  }
};

const renderTerminal = async ctx => {
  const themeData = await getTheme(ctx);
  const _theme = getThemeConfig(themeData);
  const { title, favicon, theme, defaultTheme, logo } = _theme;
  const useDefaultTheme = !startsWith(logo, '/theme');
  const importMap = getImportMap();

  try {
    const manifest = getManifest('terminal');
    const dllManifest = getDllManifest();
    const [user, ksConfig, runtime] = await Promise.all([
      getCurrentUser(ctx),
      getKSConfig(ctx),
      getK8sRuntime(ctx),
    ]);
    const localeManifest = getLocaleManifest();

    await ctx.render('terminal', {
      manifest,
      dllManifest,
      isDev: global.MODE_DEV,
      title: useDefaultTheme ? defaultTheme.tabTitle : title,
      favicon,
      hostname: ctx.hostname,
      importMap: JSON.stringify(importMap),
      globals: JSON.stringify({
        config: clientConfig,
        manifest,
        localeManifest,
        user,
        ksConfig,
        runtime,
        theme,
        defaultTheme,
        useDefaultTheme,
      }),
    });
  } catch (err) {
    await renderViewErr(ctx, err);
  }
};

const renderMarkdown = async ctx => {
  await ctx.render('blank_markdown');
};

const renderView = async ctx => {
  try {
    const clusterRole = await getClusterRole(ctx);
    const ksConfig = await getKSConfig(ctx);

    const [user, runtime, supportGpuType, installer, installedExtensions] = await Promise.all([
      getCurrentUser(ctx, clusterRole, ksConfig.multicluster),
      getK8sRuntime(ctx),
      getSupportGpuList(ctx),
      getInstallerSpec(ctx),
      getInstalledExtensions(ctx),
    ]);

    await renderIndex(ctx, {
      ksConfig: {
        ...ksConfig,
        metrics_server: get(installer, 'metrics_server.enabled', false),
      },
      user,
      runtime,
      clusterRole,
      installedExtensions,
      config: {
        ...clientConfig,
        supportGpuType: [...supportGpuType, ...clientConfig.supportGpuType],
      },
    });
  } catch (err) {
    await renderViewErr(ctx, err);
  }
};

const renderV3View = async ctx => {
  try {
    const clusterRole = await getClusterRole(ctx);
    const ksConfig = await getKSConfig(ctx);

    const [user, runtime, supportGpuType, installer] = await Promise.all([
      getCurrentUser(ctx, clusterRole, ksConfig.multicluster),
      getK8sRuntime(ctx),
      getSupportGpuList(ctx),
      getInstallerSpec(ctx),
    ]);

    await renderV3Index(ctx, {
      ksConfig: {
        ...ksConfig,
        metrics_server: get(installer, 'metrics_server.enabled', false),
      },
      user,
      runtime,
      clusterRole,
      config: {
        ...clientConfig,
        supportGpuType: [...supportGpuType, ...clientConfig.supportGpuType],
      },
    });
  } catch (err) {
    await renderViewErr(ctx, err);
  }
};

const renderLogin = async ctx => {
  const referer = ctx.querystring.split('referer=')[1];

  if (isValidReferer(referer)) {
    if (referer === '/dist/') {
      ctx.cookies.set('referer', '/dashboard');
    } else {
      ctx.cookies.set('referer', referer);
    }
  }

  const oauthServers = await getOAuthInfo(ctx);

  await renderIndex(ctx, {
    oauthServers: oauthServers || [],
  });
};

const renderLoginConfirm = async ctx => {
  const usrName = ctx.cookies.get('defaultUser') || '';
  await renderIndex(ctx, {
    user: {
      username: safeBase64.safeAtob(usrName),
      email: ctx.cookies.get('defaultEmail'),
    },
  });
};

module.exports = {
  renderView,
  renderV3View,
  renderTerminal,
  renderLogin,
  renderMarkdown,
  renderLoginConfirm,
};
