/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

const isEmpty = require('lodash/isEmpty');
const get = require('lodash/get');
const jwtDecode = require('jwt-decode');
const omit = require('lodash/omit');
const base64UrlDecode = require('jwt-decode/lib/base64_url_decode');
const { getServerConfig } = require('../libs/utils');

const { client: clientConfig } = getServerConfig();

const { login, loginThird, oAuthLogin, getNewToken, createUser } = require('../services/session');
const {
  isValidReferer,
  isAppsRoute,
  decryptPassword,
  safeParseJSON,
  safeBase64,
} = require('../libs/utils');

const { sendGatewayRequest } = require('../libs/request');

const handleLoginByPwd = async ctx => {
  const params = ctx.request.body;
  const error = {};
  let user = null;

  if (isEmpty(params) || !params.username || !params.encrypt) {
    Object.assign(error, {
      status: 400,
      reason: 'Invalid Login Params',
      message: 'invalid login params',
    });
  }

  if (isEmpty(error)) {
    const encryptKey = clientConfig.encryptKey || 'kubesphere';
    params.password = decryptPassword(params.encrypt, encryptKey);

    user = await login(params, { 'x-client-ip': ctx.request.ip });

    if (!user) {
      Object.assign(error, {
        status: 401,
        reason: 'Unauthorized',
        message: 'INCORRECT_USERNAME_OR_PASSWORD',
      });
    }
  }
  return { user, error };
};

const handleLoginByOtp = async ctx => {
  const params = ctx.request.body;
  const error = {};
  let user = null;

  if (!params.otp || !params.token) {
    Object.assign(error, {
      status: 400,
      reason: 'Invalid Login Params',
      message: 'invalid login params',
    });
  }
  if (isEmpty(error)) {
    user = await login(
      {
        otp: params.otp,
        token: params.token,
        grant_type: 'otp',
      },
      { 'x-client-ip': ctx.request.ip },
    );
    ctx.cookies.set('otpToken', null);
    if (!user) {
      Object.assign(error, {
        status: 401,
        reason: 'Unauthorized',
        message: 'TWO_FACTOR_AUTHENTICATION_FAILED',
      });
    }
  }
  return { user, error };
};

const handleLogin = async ctx => {
  const params = ctx.request.body;

  const authAuthorizeUrl = ctx.cookies.get('authAuthorizeUrl');
  let referer = ctx.cookies.get('referer');
  referer = referer ? decodeURIComponent(referer) : '';

  let error = {};
  let user = null;

  if (isEmpty(error)) {
    try {
      const action = params.grant_type === 'otp' ? handleLoginByOtp : handleLoginByPwd;
      const { user: user1, error: error1 } = await action(ctx);
      user = user1;
      error = error1;
    } catch (err) {
      ctx.app.emit('error', err);

      switch (err.code) {
        case 400:
        case 401:
          Object.assign(error, {
            status: err.code,
            reason: 'Unauthorized',
            message:
              params.grant_type === 'otp'
                ? 'TWO_FACTOR_AUTHENTICATION_FAILED'
                : 'INCORRECT_USERNAME_OR_PASSWORD',
          });
          break;
        case 429:
          Object.assign(error, {
            status: err.code,
            reason: 'Too Many Failures',
            message: 'TOO_MANY_FAILURES',
          });
          break;
        case 502:
          Object.assign(error, {
            status: err.code,
            reason: 'Bad Gateway',
            message: 'FAILED_TO_ACCESS_BACKEND',
          });
          break;
        case 'ETIMEDOUT':
          Object.assign(error, {
            status: 500,
            reason: 'Internal Server Error',
            message: 'FAILED_TO_ACCESS_API_SERVER',
          });
          break;
        default:
          Object.assign(error, {
            status: 500,
            reason: err.statusText,
            message: err.message,
          });
      }
    }
  }

  if (!isEmpty(error) || !user) {
    ctx.body = error;
    return;
  }

  const lastToken = ctx.cookies.get('token');

  ctx.cookies.set('token', user.token);
  ctx.cookies.set('expire', user.expire);
  ctx.cookies.set('refreshToken', user.refreshToken);
  ctx.cookies.set('referer', null);

  if (user.username === 'system:pre-registration') {
    const extraname = safeBase64.safeBtoa(user.extraname);
    ctx.cookies.set('defaultUser', extraname);
    ctx.cookies.set('defaultEmail', user.email);
    ctx.body = {
      success: true,
      redirect: '/login/confirm',
    };
    return;
  }

  if (!user.initialized) {
    ctx.body = {
      success: true,
      redirect: '/password/confirm',
    };
    return;
  }

  if (lastToken) {
    const { username } = jwtDecode(lastToken);
    if (username && username !== user.username) {
      ctx.body = {
        success: true,
        redirect: '/',
      };
      return;
    }
  }

  if (authAuthorizeUrl) {
    ctx.cookies.set('authAuthorizeUrl', null);
    ctx.body = {
      success: true,
      redirect: authAuthorizeUrl,
    };
    return;
  }

  ctx.body = {
    success: true,
    redirect: isValidReferer(referer) ? referer : '/',
  };
};

const handleThirdLogin = async ctx => {
  const params = ctx.request.body;

  let referer = ctx.cookies.get('referer');
  referer = referer ? decodeURIComponent(referer) : '';

  const error = {};
  let user = null;

  if (isEmpty(params) || !params.username || !params.encrypt) {
    Object.assign(error, {
      status: 400,
      reason: 'Invalid Login Params',
      message: 'invalid login params',
    });
  }

  if (isEmpty(error)) {
    try {
      const encryptKey = clientConfig.encryptKey || 'kubesphere';
      params.password = decryptPassword(params.encrypt, encryptKey);
      params.provider = get(ctx, 'params.provider');

      user = await loginThird(omit(params, 'encrypt'), {
        'x-client-ip': ctx.request.ip,
      });

      if (!user) {
        Object.assign(error, {
          status: 401,
          reason: 'Unauthorized',
          message: 'INCORRECT_USERNAME_OR_PASSWORD',
        });
      }
    } catch (err) {
      ctx.app.emit('error', err);

      switch (err.code) {
        case 400:
        case 401:
          Object.assign(error, {
            status: err.code,
            reason: 'Unauthorized',
            message: 'INCORRECT_USERNAME_OR_PASSWORD',
          });
          break;
        case 429:
          Object.assign(error, {
            status: err.code,
            reason: 'Too Many Failures',
            message: 'TOO_MANY_FAILURES',
          });
          break;
        case 502:
          Object.assign(error, {
            status: err.code,
            reason: 'Bad Gateway',
            message: 'FAILED_TO_ACCESS_BACKEND',
          });
          break;
        case 'ETIMEDOUT':
          Object.assign(error, {
            status: 500,
            reason: 'Internal Server Error',
            message: 'FAILED_TO_ACCESS_API_SERVER',
          });
          break;
        default:
          Object.assign(error, {
            status: 500,
            reason: err.statusText,
            message: err.message || 'FAILED_TO_ACCESS_API_SERVER',
          });
      }
    }
  }

  if (!isEmpty(error) || !user) {
    ctx.body = error;
    return;
  }

  const lastToken = ctx.cookies.get('token');

  ctx.cookies.set('token', user.token);
  ctx.cookies.set('expire', user.expire);
  ctx.cookies.set('refreshToken', user.refreshToken);
  ctx.cookies.set('referer', null);

  if (user.username === 'system:pre-registration') {
    const extraname = safeBase64.safeBtoa(user.extraname);
    ctx.cookies.set('defaultUser', extraname);
    ctx.cookies.set('defaultEmail', user.email);

    // return ctx.redirect('/login/confirm'); // todo need refactor

    ctx.body = {
      success: true,
      redirect: '/login/confirm',
    };
    return;
  }

  if (!user.initialized) {
    // return ctx.redirect('/password/confirm');

    ctx.body = {
      success: true,
      redirect: '/password/confirm',
    };
    return;
  }

  if (lastToken) {
    const { username } = jwtDecode(lastToken);
    if (username && username !== user.username) {
      // return ctx.redirect('/');

      ctx.body = {
        success: true,
        redirect: '/',
      };
      return;
    }
  }

  // ctx.redirect(isValidReferer(referer) ? referer : '/');

  ctx.body = {
    success: true,
    redirect: isValidReferer(referer) ? referer : '/',
  };
};

const handleLogout = async ctx => {
  const oAuthLoginInfo = safeParseJSON(decodeURIComponent(ctx.cookies.get('oAuthLoginInfo')));

  const token = ctx.cookies.get('token');

  ctx.cookies.set('token', null);
  ctx.cookies.set('expire', null);
  ctx.cookies.set('refreshToken', null);
  ctx.cookies.set('oAuthLoginInfo', null);
  ctx.cookies.set('authAuthorizeUrl', null);

  if (
    !isEmpty(oAuthLoginInfo) &&
    oAuthLoginInfo.type &&
    oAuthLoginInfo.type === 'OIDCIdentityProvider' &&
    oAuthLoginInfo.endSessionURL
  ) {
    const url = `${oAuthLoginInfo.endSessionURL}`;
    // ctx.body = { data: { url }, success: true };
    ctx.redirect(url);
  } else {
    const { origin = '', referer = '' } = ctx.headers;
    const refererPath = referer.replace(origin, '');

    await sendGatewayRequest({
      method: 'GET',
      url: '/oauth/logout',
      token,
    });

    if (isAppsRoute(refererPath)) {
      ctx.redirect(refererPath);
    } else {
      ctx.redirect('/login');
    }
  }
};

const handleOAuthLogin = async ctx => {
  let user = null;
  const error = {};
  const oauthParams = omit(ctx.query, ['redirect_url', 'state']);
  let referer = ctx.cookies.get('referer');
  referer = referer ? decodeURIComponent(referer) : '';

  try {
    user = await oAuthLogin({ ...oauthParams, oauthName: ctx.params.name });
  } catch (err) {
    /* eslint-disable no-console */
    console.log(err);

    ctx.app.emit('error', err);
    Object.assign(error, {
      status: err.code,
      reason: err.statusText,
      message: err.message,
    });
  }

  if (!isEmpty(error) || !user) {
    ctx.body = error;
    return;
  }

  ctx.cookies.set('token', user.token);
  ctx.cookies.set('expire', user.expire);
  ctx.cookies.set('refreshToken', user.refreshToken);
  ctx.cookies.set('referer', null);

  if (user.username === 'system:pre-registration') {
    const extraname = safeBase64.safeBtoa(user.extraname);
    ctx.cookies.set('defaultUser', extraname);
    ctx.cookies.set('defaultEmail', user.email);
    ctx.redirect('/login/confirm');
    return;
  }

  const state = ctx.query.state;
  const redirectUrl = ctx.query.redirect_url;

  if (state) {
    try {
      const stateObject = JSON.parse(base64UrlDecode(state));
      const stateUrl = stateObject.redirect_url;
      if (stateUrl) {
        ctx.redirect(stateUrl);
      }
    } catch (err) {
      /* eslint-disable no-console */
      console.log(err);
    }
  }

  if (redirectUrl) {
    const redirectHost = new URL(redirectUrl).host;
    if (redirectHost === ctx.headers.host) {
      ctx.redirect(redirectUrl);
    }
  } else {
    ctx.redirect(isValidReferer(referer) ? referer : '/');
  }
};

const handleLoginConfirm = async ctx => {
  const token = ctx.cookies.get('token');
  const params = ctx.request.body;

  await createUser(params, token);

  const data = await getNewToken(ctx);
  if (data.token) {
    ctx.cookies.set('token', data.token);
    ctx.cookies.set('expire', data.expire);
    ctx.cookies.set('refreshToken', data.refreshToken);

    ctx.cookies.set('defaultUser', null);
    ctx.cookies.set('defaultEmail', null);
    ctx.body = {
      success: true,
      redirect: '/',
    };
  }
};

module.exports = {
  handleLogin,
  handleThirdLogin,
  handleLogout,
  handleOAuthLogin,
  handleLoginConfirm,
};
