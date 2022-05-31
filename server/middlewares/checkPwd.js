const convert = require('koa-convert')
const bodyParser = require('koa-bodyparser')
const { send_gateway_request } = require('../libs/request')
const { decryptPassword } = require('../libs/utils')

const parseBody = convert(
  bodyParser({
    formLimit: '200kb',
    jsonLimit: '200kb',
    bufferLimit: '4mb',
  })
)

module.exports = async (ctx, next) => {
  const url = ctx.url
  let params = null
  if (
    url === '/kapis/iam.kubesphere.io/v1alpha2/users' &&
    ctx.method === 'POST'
  ) {
    await parseBody(ctx, () => {})
    params = ctx.request.body
    params.spec.password = decryptPassword(params.spec.password, 'kubesphere')
  } else if (
    /^\/kapis\/iam.kubesphere.io\/v1alpha2\/users\/.*\/password$/.test(url) &&
    ctx.method === 'PUT'
  ) {
    await parseBody(ctx, () => {})
    params = ctx.request.body
    params.currentPassword = decryptPassword(
      params.currentPassword,
      'kubesphere'
    )
    params.password = decryptPassword(params.password, 'kubesphere')
  }

  if (params) {
    try {
      const response = await send_gateway_request({
        method: ctx.method,
        headers: ctx.headers,
        url: ctx.url,
        token: ctx.cookies.get('token'),
        params,
      })
      ctx.status = 200
      ctx.body = response
    } catch (err) {
      ctx.body = {
        status: err.code,
        reason: err.statusText,
        message: err.message,
      }
    }
  } else {
    return await next()
  }
}
