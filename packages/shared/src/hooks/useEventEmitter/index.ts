import mitt from 'mitt';

const { on, off, emit, all } = mitt<any>();
const useEventEmitter = () => ({ $on: on, $off: off, $emit: emit, all });

export { useEventEmitter };
