/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

export function startAutoRefresh(context: any, fun: (key: any) => void, options: any = {}) {
  const params = {
    interval: 5000, // milliseconds
    leading: true,
    ...options,
  };

  if (context && fun) {
    const fetch = fun;

    if (params.leading) {
      fetch({ autoRefresh: true });
    }

    context.timer = setInterval(() => {
      fetch({ autoRefresh: true });
    }, params.interval);
  }
}

export function stopAutoRefresh(context: any) {
  if (context && context.timer) {
    clearInterval(context.timer);
    context.timer = null;
  }
}
