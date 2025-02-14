/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

const request = require('./request.base');
const { getServerConfig } = require('./utils');

const { server: serverConfig } = getServerConfig();

/**
 *  gateway api request, if get logined resource, token must exists,
 * @param {options} options: { token, method, url, params }
 */
const sendGatewayRequest = ({ method, url, params, token, headers = {}, ...rest }) => {
  const options = { headers, ...rest };

  if (token) {
    options.headers = {
      Authorization: `Bearer ${token}`,
      'content-type': headers['content-type'] || 'application/json',
      'x-client-ip': headers['x-client-ip'],
    };
  }

  return request[method.toLowerCase()](`${serverConfig.apiServer.url}${url}`, params, options);
};

module.exports = {
  sendGatewayRequest,
};
