/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

interface WebSocketClientOptions<T> {
  subProtocols?: string | string[];
  reopenLimit?: number;
  onOpen?: (event: Event) => any;
  onMessage?: (data: T, event: MessageEvent<T>) => any;
  onClose?: (event: CloseEvent) => any;
  onError?: (event: Event) => any;
}

interface OptionsProp<T> extends Omit<WebSocketClientOptions<T>, 'reopenLimit'> {
  reopenLimit: number;
}

const DEFAULT_OPTIONS = {
  reopenLimit: 5,
};

export type { WebSocketClientOptions };

export class WebSocketClient<T> {
  public readonly url: string | URL;

  public readonly options: OptionsProp<T>;

  public client: WebSocket | undefined;

  private reopenCount: number;

  private immediately: boolean;

  private timer?: ReturnType<typeof setTimeout>;

  private closeStatus: boolean = false;

  public constructor(url: string | URL, options?: WebSocketClientOptions<T>) {
    this.url = url;

    if (!this.url) {
      throw Error(`invalid WebSocket url: ${this.url}`);
    }

    this.options = { ...DEFAULT_OPTIONS, ...options };
    this.reopenCount = 0;
    this.immediately = false;
    this.timer = undefined;

    this.setUp();
  }

  private setUp() {
    this.initClient();
    this.attachEvents();
  }

  private initClient() {
    const subProtocols = this.options?.subProtocols;
    if (!this.client) {
      this.client = new WebSocket(this.url, subProtocols);
    }

    if (this.client && this.client.readyState > 1) {
      this.close(true);
      this.client = new WebSocket(this.url, subProtocols);
    }

    return this.client;
  }

  private attachEvents() {
    if (this.client) {
      const { onOpen, onMessage, onClose, onError } = this.options;

      this.client.onopen = event => {
        if (this.timer) clearTimeout(this.timer);
        this.reopenCount = 1;
        if (typeof onOpen === 'function') {
          onOpen(event);
        }
      };

      this.client.onmessage = (event: MessageEvent<T>) => {
        let { data } = event;
        if (typeof data === 'string') {
          try {
            data = JSON.parse(data);
          } catch (e) {}
        }

        if (typeof onMessage === 'function') {
          onMessage(data, event);
        }
      };

      this.client.onclose = event => {
        if (!this.closeStatus && this.reopenCount < this.options.reopenLimit) {
          this.timer = setTimeout(this.setUp.bind(this), 1000 * 2 ** this.reopenCount);
          this.reopenCount++;
        }
        if (typeof onClose === 'function') {
          onClose(event);
        }
      };

      this.client.onerror = event => {
        console.error('socket error: ', event);
        if (this.timer) clearTimeout(this.timer);
        this.timer = setTimeout(this.setUp.bind(this), 1000 * 2 ** this.reopenCount);
        this.reopenCount++;
        if (typeof onError === 'function') {
          onError(event);
        }
      };
    }
  }

  public send(data: string | ArrayBufferLike | Blob | ArrayBufferView) {
    return this.client?.send(data);
  }

  public close(isImmediate?: boolean) {
    if (isImmediate) {
      this.immediately = true;
    }
    this.closeStatus = true;

    this.client?.close();

    if (!!this.timer) {
      clearTimeout(this.timer);
    }
  }
}
