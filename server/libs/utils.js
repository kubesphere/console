/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml/dist/js-yaml');
const NodeCache = require('node-cache');
const get = require('lodash/get');
const merge = require('lodash/merge');
const isEmpty = require('lodash/isEmpty');
const pick = require('lodash/pick');
const systemImports = require('../configs/systemImports');
const http = require('http');
const https = require('https');
const { URL } = require('url');

const MANIFEST_CACHE_KEY = 'MANIFEST_CACHE_KEY';
const MANIFEST_CACHE_KEY_PREFIX = 'MANIFEST_CACHE_KEY_V3_';
const LOCALE_MANIFEST_CACHE_KEY = 'LOCALE_MANIFEST_CACHE_KEY';
const DLL_MANIFEST_CACHE_KEY = 'DLL_MANIFEST_CACHE_KEY';
const SERVER_CONF_KEY = 'pitrix-server-conf-key';

// const root = dir => `${global.APP_ROOT}/${dir}`.replace(/(\/+)/g, '/');
const root = dir => path.resolve(global.SERVER_ROOT, dir);
const cwdResolve = absolutePath => path.resolve(process.cwd(), absolutePath);

const cache = global._pitrixCache || new NodeCache();
if (!global._pitrixCache) {
  global._pitrixCache = cache;
}

/**
 *
 * @param filePath
 * @returns {*} json formatted content
 */
const loadYaml = filePath => {
  try {
    return yaml.safeLoad(fs.readFileSync(filePath), 'utf8');
  } catch (e) {
    return false;
  }
};

/**
 *
 * @params tlsConfig
 * @returns {*} target object
 */
const getTargetConfigWithTLS = (parsedUrl, tlsConfig) => {
  const { protocol, hostname, port } = parsedUrl;
  const { pfxFilePath, clientCertificateFilePath } = tlsConfig;

  return {
    protocol,
    host: hostname,
    port,
    pfx: fs.readFileSync(pfxFilePath),
    passphrase: '',
    requestCert: true,
    ca: fs.readFileSync(clientCertificateFilePath),
  };
};

/**
 * get server side configuration
 *
 * @returns {*|{}}
 */
const getServerConfig = key => {
  let config = cache.get(SERVER_CONF_KEY);
  if (!config) {
    // parse config yaml
    config = loadYaml(root('configs/config.yaml')) || {};

    const tryFile = cwdResolve('configs/config.yaml');
    if (fs.existsSync(tryFile)) {
      // merge local_config
      const localConfig = loadYaml(tryFile);
      if (typeof localConfig === 'object') {
        merge(config, localConfig);
      }
    }

    const tryLocalFile = cwdResolve('configs/local_config.yaml');
    if (fs.existsSync(tryLocalFile)) {
      // merge local_config
      const localConfig = loadYaml(tryLocalFile);
      if (typeof localConfig === 'object') {
        merge(config, localConfig);
      }
    }

    cache.set(SERVER_CONF_KEY, config);
  }

  const { tls, ...serverConfig } = key ? config[key] : config;

  const parsedUrl = new URL(serverConfig.server.apiServer.url);

  const tlsEnabled = !!tls?.enable;

  const agent =
    parsedUrl.protocol === 'https:'
      ? new https.Agent({ rejectUnauthorized: tlsEnabled })
      : new http.Agent({ rejectUnauthorized: false });

  return {
    ...serverConfig,
    agent,
    target: tlsEnabled ? getTargetConfigWithTLS(parsedUrl, tls) : serverConfig.server.apiServer.url,
  };
};
const getCache = () => cache;

const URL_PATTEN =
  /^(https|http|ftp|rtsp|mms){0,1}:?(\/)+(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\\/])+$/;

// eslint-disable-next-line @typescript-eslint/no-shadow
const isValidReferer = path => {
  if (isEmpty(path)) {
    return false;
  }
  const referer = decodeURIComponent(path);
  const isUrl = URL_PATTEN.test(referer);

  const isJsScript = referer.indexOf('javascript:') < 0;

  const isConsoleV3 = referer.indexOf('consolev3') > -1; // todo tmp add for embed consolev3

  return (
    referer !== '/' && referer.indexOf('/login') === -1 && !isUrl && isJsScript && !isConsoleV3
  );
};

/**
 *
 * @param path  koa ctx.path
 */
// eslint-disable-next-line @typescript-eslint/no-shadow
const isAppsRoute = path => {
  return path === '/apps' || /^\/apps\/?(app-([-0-9a-z]*)\/?)?$/.exec(path);
};

/**
 *
 encrypt algorithm:
 1. read salt from template variable.
 2. base64 encode raw password, and use it as str to encrypt.
 3. keep salt.length >= str.length.
 if it does not match, salt += str.slice(0, str.length - salt.length)
 4. mix salt and str letter by letter, take the average character code of these two string.
 if str.length < salt.length, use character '@' to mix salt letter
 5. convert the average codes to letters and join them into a new string.
 6. since the average code may not be an interger, there is prefix in the new string.
 the prefix is a bitmap converted by base64(parseInt(bitmap, 2))
 7. encrypted one is constructed with prefix + '@' + new string.
 */

const decryptPassword = (encrypted, salt) => {
  const specialToken = '@';
  const specialIndex = encrypted.indexOf(specialToken);
  if (specialIndex === -1 || !salt) {
    return encrypted;
  }

  const prefix = encrypted.slice(0, specialIndex);
  const pure = encrypted.slice(specialIndex + specialToken.length);
  const signs = Buffer.from(prefix, 'base64').toString('utf-8');

  let index = 0;
  let b64 = '';

  for (const letter of pure) {
    const todel = index < salt.length ? salt[index] : b64[index - salt.length];
    let code = letter.charCodeAt(0) * 2 - todel.charCodeAt(0);
    if (signs[index] === '1') {
      code += 1;
    }
    if (code !== 64) {
      b64 += String.fromCharCode(code);
    }
    index++;
  }

  return Buffer.from(b64, 'base64').toString('utf-8');
};

const safeParseJSON = (json, defaultValue) => {
  let result;
  try {
    result = JSON.parse(json);
  } catch (e) {}

  if (!result && defaultValue !== undefined) {
    return defaultValue;
  }
  return result;
};

const safeBase64 = {
  safeBtoa: str => {
    if (typeof str !== 'string') {
      return '';
    }
    return Buffer.from(str).toString('base64');
  },
  safeAtob: str => {
    if (typeof str !== 'string') {
      return '';
    }
    return Buffer.from(str, 'base64').toString('utf-8');
  },
};

const getManifest = () => {
  let manifestCache = cache.get(MANIFEST_CACHE_KEY);

  if (!manifestCache) {
    let data = {};
    try {
      const dataStream = fs.readFileSync(cwdResolve('dist/manifest.json'));
      data = safeParseJSON(dataStream.toString(), {});
    } catch (error) {}
    manifestCache = pick(data, [
      'main.css',
      'main.js',
      'terminal.css',
      'terminal.js',
      'vendor.js',
      'staticPlugins.js',
      'locales-en',
      'locales-zh',
      'locales-tc',
      'locales-es',
    ]);
    cache.set(MANIFEST_CACHE_KEY, manifestCache);
  }

  return manifestCache;
};

const getLocaleManifest = () => {
  let manifestCache = cache.get(LOCALE_MANIFEST_CACHE_KEY);

  if (!manifestCache) {
    let data = {};
    try {
      const dataStream = fs.readFileSync(cwdResolve('dist/manifest.locale.json'));
      data = safeParseJSON(dataStream.toString(), {});
    } catch (error) {}
    manifestCache = pick(
      data,
      Object.keys(data).filter(key => key.startsWith('locale-')),
    );
    cache.set(LOCALE_MANIFEST_CACHE_KEY, manifestCache);
  }

  return manifestCache;
};

const getV3Manifest = entry => {
  let manifestCache = cache.get(`${MANIFEST_CACHE_KEY_PREFIX}${entry}`);
  if (!manifestCache) {
    let data = {};
    try {
      const dataStream = fs.readFileSync(cwdResolve('dist/v3dist/manifest.json'));
      data = safeParseJSON(dataStream.toString(), {});
    } catch (error) {}
    manifestCache = get(data, `entrypoints.${entry}`);
    cache.set(`${MANIFEST_CACHE_KEY_PREFIX}${entry}`, manifestCache);
  }

  return manifestCache;
};

const getV3LocaleManifest = () => {
  let manifestCache = cache.get(`${LOCALE_MANIFEST_CACHE_KEY}v3`);

  if (!manifestCache) {
    let data = {};
    try {
      const dataStream = fs.readFileSync(cwdResolve('dist/v3dist/manifest.locale.json'));
      data = safeParseJSON(dataStream.toString(), {});
    } catch (error) {}
    manifestCache = pick(
      data,
      Object.keys(data).filter(key => key.startsWith('locale-')),
    );
    cache.set(`${LOCALE_MANIFEST_CACHE_KEY}v3`, manifestCache);
  }

  return manifestCache;
};

const getDllManifest = () => {
  let manifestCache = cache.get(DLL_MANIFEST_CACHE_KEY);

  if (!manifestCache) {
    manifestCache = {};
    try {
      const dataStream = fs.readFileSync(cwdResolve('dist/dll/manifest.json'));
      manifestCache = safeParseJSON(dataStream.toString(), {});
    } catch (error) {}
    cache.set(DLL_MANIFEST_CACHE_KEY, manifestCache);
  }

  return manifestCache;
};

const getImportMap = () => {
  return systemImports;
};

const mapperTheme = themeData => {
  const { title, logo, favicon, background, description } = themeData;

  return {
    title,
    description,
    logo,
    favicon,
    background,
  };
};

const { server: serverConfig } = getServerConfig();
const getThemeConfig = customTheme => {
  const defaultTheme = serverConfig.theme;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const _theme = Object.values(customTheme).every(v => v === '') ? defaultTheme : customTheme;

  return {
    ..._theme,
    theme: { ...customTheme },
    defaultTheme,
  };
};

const mapResource = resource => {
  if (!resource) {
    return '';
  }
  if (
    resource.startsWith('http://') ||
    resource.startsWith('https://') ||
    resource.startsWith('data:image')
  ) {
    return resource;
  }
  return `/theme/static/images/${resource}`;
};

function getServiceAccountToken() {
  const serviceAccountTokenByConfig = serverConfig?.apiServer?.serviceAccountToken;

  if (serviceAccountTokenByConfig && typeof serviceAccountTokenByConfig === 'string') {
    console.info('Use serviceAccountToken from config');
    return { serviceAccountToken: serviceAccountTokenByConfig };
  }

  const DEFAULT_RET = { serviceAccountToken: undefined };

  const serviceAccountTokenFilePath = serverConfig?.apiServer?.serviceAccountTokenFilePath;

  if (!serviceAccountTokenFilePath) {
    console.error('server.apiServer.serviceAccountTokenFilePath is not set');
    return DEFAULT_RET;
  }

  if (typeof serviceAccountTokenFilePath !== 'string') {
    console.error('server.apiServer.serviceAccountTokenFilePath is not a string');
    return DEFAULT_RET;
  }

  const filePath = path.resolve(serviceAccountTokenFilePath);

  try {
    const serviceAccountTokenByFile = fs.readFileSync(filePath, { encoding: 'utf8' });

    if (!serviceAccountTokenByFile) {
      console.error('serviceAccountTokenByFile is empty');
      return DEFAULT_RET;
    }

    if (typeof serviceAccountTokenByFile !== 'string') {
      console.error('serviceAccountTokenByFile is not a string');
      return DEFAULT_RET;
    }

    console.info(`Use serviceAccountToken from ${filePath}`);
    return { serviceAccountToken: serviceAccountTokenByFile };
  } catch (error) {
    console.error('Failed to read serviceAccountTokenByFile', error);
    return DEFAULT_RET;
  }
}

module.exports = {
  root,
  cwdResolve,
  loadYaml,
  getCache,
  getManifest,
  getLocaleManifest,
  getServerConfig,
  isValidReferer,
  isAppsRoute,
  decryptPassword,
  safeParseJSON,
  getImportMap,
  safeBase64,
  mapperTheme,
  getThemeConfig,
  getV3Manifest,
  getV3LocaleManifest,
  mapResource,
  getDllManifest,
  getServiceAccountToken,
};
