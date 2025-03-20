const { get } = require('lodash');

module.exports = async (ctx, next) => {
  await next();

  const response = get(ctx, 'response');

  const code = get(response, 'code');
  const reason = get(response, 'reason');
  const isForbidden = code === 403 && reason === 'Forbidden';

  /* if (isForbidden) {
    console.log(123123, response);
  } */

  if (isForbidden) {
    return ctx.redirect('/errors/403');
  }
};
