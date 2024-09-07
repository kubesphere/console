/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import mitt from 'mitt';

const { on, off, emit, all } = mitt<any>();
const useEventEmitter = () => ({ $on: on, $off: off, $emit: emit, all });

export { useEventEmitter };
