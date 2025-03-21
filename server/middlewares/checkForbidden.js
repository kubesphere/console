const { get } = require('lodash');

module.exports = async (ctx, next) => {
  await next();

  const responseBody = get(ctx, 'req.customResponse.body');

  const code = get(responseBody, 'code');
  const reason = get(responseBody, 'reason');
  const isForbidden = ctx.method === 'GET' && code === 403 && reason === 'Forbidden';

  if (isForbidden) {
    return ctx.redirect('/errors/403');
  }
};
