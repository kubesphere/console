/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

const cookie = (name: string, value?: string, path?: string) => {
  if (typeof value !== 'undefined') {
    window.document.cookie = `${[name, '=', encodeURIComponent(value)].join('')};path=${
      path || '/'
    }`;
  } else {
    const cookieValue = window.document.cookie.match(new RegExp(`(?:\\s|^)${name}\\=([^;]*)`));
    return cookieValue ? decodeURIComponent(cookieValue[1]) : null;
  }
};

export default cookie;
