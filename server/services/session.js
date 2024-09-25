/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

const get = require('lodash/get');
const uniq = require('lodash/uniq');
const isEmpty = require('lodash/isEmpty');
const jwtDecode = require('jwt-decode');

const { sendGatewayRequest } = require('../libs/request');

const {
  isAppsRoute,
  safeParseJSON,
  getServerConfig,
  mapperTheme,
  mapResource,
} = require('../libs/utils');
const { getEnabledExtensionModules } = require('./extension');
const { has } = require('lodash');

const { server: serverConfig } = getServerConfig();

const handleLoginResp = (resp = {}) => {
  if (!resp.access_token) {
    throw new Error(resp.message);
  }

  const {
    access_token: token,
    refresh_token: refreshToken,
    expires_in: expiresIn = 100000,
  } = resp || {};

  const { username, extra, groups } = jwtDecode(token);
  const email = get(extra, 'email[0]');
  const initialized = get(extra, 'uninitialized[0]') !== 'true';
  const extraname = get(extra, 'username[0]') || get(extra, 'uid[0]');

  return {
    username,
    email,
    groups,
    extraname,
    initialized,
    token,
    refreshToken,
    expire: new Date().getTime() + Number(expiresIn) * 1000,
  };
};

const login = async (data, headers) => {
  let clientID = serverConfig.apiServer.clientID;
  if (!clientID) {
    clientID = 'kubesphere';
  }

  let clientSecret = serverConfig.apiServer.clientSecret;
  if (!clientSecret) {
    clientSecret = 'kubesphere';
  }

  data.client_id = clientID;
  data.client_secret = clientSecret;

  const resp = await sendGatewayRequest({
    method: 'POST',
    url: '/oauth/token',
    headers: {
      ...headers,
      'content-type': 'application/x-www-form-urlencoded',
    },
    params: {
      ...data,
      grant_type: data.grant_type || 'password',
    },
  });

  return handleLoginResp(resp);
};

const loginThird = async ({ provider, ...data }) => {
  let clientID = serverConfig.apiServer.clientID;
  if (!clientID) {
    clientID = 'kubesphere';
  }

  let clientSecret = serverConfig.apiServer.clientSecret;
  if (!clientSecret) {
    clientSecret = 'kubesphere';
  }

  data.client_id = clientID;
  data.client_secret = clientSecret;
  data.provider = provider;

  const resp = await sendGatewayRequest({
    method: 'POST',
    url: '/oauth/token',
    headers: {
      // ...headers,
      'content-type': 'application/x-www-form-urlencoded',
    },
    params: {
      ...data,
      grant_type: 'password',
    },
  });

  return handleLoginResp(resp);
};

const getNewToken = async ctx => {
  const refreshToken = ctx.cookies.get('refreshToken');
  let newToken = {};

  const data = {
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  };

  let clientID = serverConfig.apiServer.clientID;
  if (!clientID) {
    clientID = 'kubesphere';
  }

  let clientSecret = serverConfig.apiServer.clientSecret;
  if (!clientSecret) {
    clientSecret = 'kubesphere';
  }

  data.client_id = clientID;
  data.client_secret = clientSecret;

  const resp = await sendGatewayRequest({
    method: 'POST',
    url: '/oauth/token',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    params: data,
    token: refreshToken,
  });

  const { access_token: token, refresh_token: rfsToken, expires_in: expiresIn } = resp || {};

  if (!token) {
    throw new Error(resp.message);
  }

  newToken = {
    token,
    refreshToken: rfsToken,
    expire: new Date().getTime() + Number(expiresIn) * 1000,
  };

  return newToken;
};

const oAuthLogin = async ({ oauthName, ...params }) => {
  const resp = await sendGatewayRequest({
    method: 'GET',
    url: `/oauth/callback/${oauthName}`,
    params,
  });

  return handleLoginResp(resp);
};

const getUserGlobalRules = async (username, token) => {
  const resp = await sendGatewayRequest({
    method: 'GET',
    url: `/kapis/iam.kubesphere.io/v1beta1/users/${username}/roletemplates?scope=global`,
    token,
  });

  const globalTemplates = resp.items || [];
  const rules = {};

  globalTemplates.forEach(template => {
    const globalRuleName = get(template, 'metadata.name');
    const roleTemplateRules = safeParseJSON(
      get(template, "metadata.annotations['iam.kubesphere.io/role-template-rules']"),
      {},
    );
    Object.keys(roleTemplateRules).forEach(key => {
      rules[key] = rules[key] || [];

      if (Array.isArray(roleTemplateRules[key])) {
        rules[key].push(...roleTemplateRules[key], globalRuleName);
      } else {
        rules[key].push(roleTemplateRules[key], globalRuleName);
      }

      rules[key] = uniq(rules[key]);
    });
  });

  return rules;
};

const getUserDetail = async (token, clusterRole) => {
  let user = {};

  const { username } = jwtDecode(token);

  const resp = await sendGatewayRequest({
    method: 'GET',
    url: `/kapis/iam.kubesphere.io/v1beta1/users/${username}`,
    token,
  });

  if (resp) {
    user = {
      email: get(resp, 'spec.email'),
      lang: get(resp, 'spec.lang'),
      username: get(resp, 'metadata.name'),
      globalrole: get(resp, 'metadata.annotations["iam.kubesphere.io/globalrole"]'),
      grantedClusters: get(resp, 'metadata.annotations["iam.kubesphere.io/granted-clusters"]', []),
      uninitialized: get(resp, 'metadata.annotations.["iam.kubesphere.io/uninitialized"]', 'false'),
      lastLoginTime: get(resp, 'status.lastLoginTime'),
      otpEnabled: has(resp, 'metadata.annotations.["iam.kubesphere.io/totp-auth-key-ref"]'),
    };
  } else {
    throw new Error(resp);
  }

  try {
    const roles = await getUserGlobalRules(user.username, token);

    if (clusterRole === 'member') {
      roles.users = roles.users.filter(role => role !== 'manage');
      roles.workspaces = roles.workspaces.filter(role => role !== 'manage');
    }

    const isClustersRole = Object.keys(roles).includes('clusters');

    if (!isClustersRole && user.grantedClusters.length > 0) {
      roles.clusters = ['view'];
    }
    user.globalRules = roles;
  } catch (error) {}

  return user;
};

const getWorkspaces = async (token, clusterRole) => {
  let workspaces = [];
  let workspacesAliasName = {};
  let version = 3.2;

  const backendVersion = await sendGatewayRequest({
    method: 'GET',
    url: `/kapis/version`,
    token,
  });
  if (backendVersion) {
    const updatedVersion = backendVersion.gitVersion.replace(/[^\d.]/g, '');
    version = Number(updatedVersion.split('.').slice(0, 2).join('.'));
  }
  const url =
    version > 3.2
      ? clusterRole === 'host'
        ? '/kapis/tenant.kubesphere.io/v1beta1/workspacetemplates'
        : '/kapis/tenant.kubesphere.io/v1beta1/workspaces'
      : '/kapis/tenant.kubesphere.io/v1beta1/workspaces';

  const resp = await sendGatewayRequest({
    method: 'GET',
    url,
    params: { limit: 10 },
    token,
  });

  if (resp && resp.items) {
    workspaces = resp.items.map(item => {
      const aliasName = item.metadata.annotations?.['kubesphere.io/alias-name'];
      workspacesAliasName[item.metadata.name] = aliasName
        ? `${aliasName}（${item.metadata.name}）`
        : item.metadata.name;
      return item.metadata.name;
    });
  }

  return { workspaces, workspacesAliasName };
};

const getClusters = async token => {
  let clusters = [];
  const url = '/kapis/tenant.kubesphere.io/v1beta1/clusters';
  const resp = await sendGatewayRequest({
    method: 'GET',
    url,
    token,
  });

  if (resp && resp.items) {
    clusters = resp.items.map(item => {
      return item.metadata.name;
    });
  }

  return { clusters };
};

const getKSConfig = async ctx => {
  let resp = {};
  const token = ctx.cookies.get('token');
  try {
    const [config, version, { enabledExtensionModules, enabledExtensionModulesStatus }] =
      await Promise.all([
        sendGatewayRequest({
          method: 'GET',
          url: '/kapis/config.kubesphere.io/v1alpha2/configs/configz',
          token,
        }),
        sendGatewayRequest({
          method: 'GET',
          url: '/version',
          token,
        }),
        getEnabledExtensionModules({ token }, ctx),
      ]);

    resp = { enabledExtensionModulesStatus, ...config, ...enabledExtensionModules };

    if (version) {
      resp.ksVersion = version.gitVersion;
      resp.k8sVersion = version.kubernetes?.gitVersion;
    }
  } catch (error) {
    console.error(error);
  }

  return resp;
};

const getCurrentUser = async (ctx, clusterRole, isMulticluster) => {
  const token = ctx.cookies.get('token');

  if (!token) {
    if (isAppsRoute(ctx.path)) {
      return null;
    }
    ctx.throw(401, 'Not Login');
  }

  const [userDetail, workspaces, clusters] = await Promise.all([
    getUserDetail(token, clusterRole, isMulticluster),
    getWorkspaces(token, clusterRole),
    getClusters(token),
  ]);

  return { ...userDetail, ...workspaces, ...clusters };
};

const getK8sRuntime = async ctx => {
  const token = ctx.cookies.get('token');
  let resp = 'docker';
  if (!token) {
    return resp;
  }
  try {
    const nodeList = await sendGatewayRequest({
      method: 'GET',
      url: '/api/v1/nodes',
      token,
    });
    if (nodeList.items) {
      const runTime = nodeList.items[0].status.nodeInfo.containerRuntimeVersion;
      resp = runTime.split(':')[0];
    }
  } catch (error) {
    console.error(error);
  }

  return resp;
};

const getClusterRole = async ctx => {
  const token = ctx.cookies.get('token');
  let role = 'host';
  if (!token) {
    return role;
  }
  try {
    // const config = await sendGatewayRequest({
    //   method: 'GET',
    //   url: '/kapis/iam.kubesphere.io/v1beta1/clusterroles',
    //   token,
    // });
    // const data = config.data['kubesphere.yaml'];
    // const str = /clusterRole:(\s*[\w]+\s*)/g.exec(data);
    // if (str && Array.isArray(str)) {
    //   const clusterRole = str[0].split(':')[1].replace(/\s/g, '');
    const clusterRole = 'host';
    role = ['host', 'member'].indexOf(clusterRole) === -1 ? 'host' : clusterRole;
    // }
  } catch (error) {
    console.error(error);
  }

  return role;
};

const getOAuthInfo = async () => {
  let resp = [];
  try {
    resp = await sendGatewayRequest({
      method: 'GET',
      url: '/kapis/config.kubesphere.io/v1alpha2/configs/oauth',
    });
  } catch (error) {
    console.error(error);
  }

  const servers = [];
  if (resp && !isEmpty(resp.identityProviders)) {
    resp.identityProviders.forEach(item => {
      if (item && item.provider) {
        let url;
        let params = {};
        const title = item.name;
        let type = item.type;
        let endSessionURL;

        const authURL = get(item, 'provider.endpoint.authURL');

        if (authURL) {
          url = authURL;
          params = {
            state: item.name,
            client_id: item.provider.clientID,
            response_type: 'code',
          };

          if (item.provider.redirectURL) {
            params.redirect_uri = item.provider.redirectURL;
          }

          if (item.provider.scopes && item.provider.scopes.length > 0) {
            params.scope = item.provider.scopes.join(' ');
          }

          if (item.type) {
            endSessionURL = get(item, 'provider.endpoint.endSessionURL');
            type = item.type;
          }
        } else if (item.provider.casServerURL) {
          params = { service: item.provider.redirectURL };
          url = item.provider.casServerURL + '/login';
        } else if (type === 'LDAPIdentityProvider' && item.provider.host) {
          url = item.provider.host;
        }

        if (url && !isEmpty(params)) {
          url = `${url}?${Object.keys(params)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
            .join('&')}`;
        }
        servers.push({ title, type, url, endSessionURL });
      }
    });
  }

  return servers;
};

const createUser = (params, token) => {
  return sendGatewayRequest({
    method: 'POST',
    url: '/kapis/iam.kubesphere.io/v1beta1/users',
    params: {
      apiVersion: 'iam.kubesphere.io/v1beta1',
      kind: 'User',
      metadata: {
        name: params.username,
      },
      spec: {
        email: params.email,
      },
    },
    token,
  });
};

const getInstallerSpec = async ctx => {
  const token = ctx.cookies.get('token');
  if (!token) {
    return {};
  }

  try {
    const result = await sendGatewayRequest({
      method: 'GET',
      url: `/apis/installer.kubesphere.io/v1alpha1/clusterconfigurations?name=ks-installer`,
      token,
    });

    return result.items[0].spec;
  } catch (error) {
    console.error(error);
  }

  return {};
};

const getTheme = async () => {
  try {
    const theme = await sendGatewayRequest({
      method: 'get',
      url: '/kapis/config.kubesphere.io/v1alpha2/configs/theme',
    });
    if (isEmpty(theme)) {
      return {};
    }

    const { title, logo, favicon, background, description } = mapperTheme(theme);
    return {
      title,
      description,
      logo: mapResource(logo),
      favicon: mapResource(favicon),
      background: mapResource(background),
    };
  } catch (err) {
    return {};
  }
};

module.exports = {
  login,
  loginThird,
  oAuthLogin,
  getCurrentUser,
  getOAuthInfo,
  getNewToken,
  getKSConfig,
  getK8sRuntime,
  createUser,
  getClusterRole,
  getInstallerSpec,
  getTheme,
};
