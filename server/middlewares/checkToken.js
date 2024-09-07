/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

const { getNewToken } = require('../services/session');

module.exports = async (ctx, next) => {
  const expire = ctx.cookies.get('expire');
  if (expire) {
    const current = new Date().getTime();
    if (expire <= current + 600000) {
      const data = await getNewToken(ctx);
      if (data.token) {
        ctx.cookies.set('token', data.token);
        ctx.cookies.set('expire', data.expire);
        ctx.cookies.set('refreshToken', data.refreshToken);
        return ctx.redirect(ctx.headers.referer || '/');
      }
    }
  }

  return await next();
};
