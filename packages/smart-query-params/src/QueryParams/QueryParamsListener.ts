export class QueryParamsListener {
  private unbindMethods: Array<() => void> = [];

  constructor(private listener: () => void) {
    this.bindChangeEvents();
  }

  public disconnect() {
    this.unbindMethods.forEach((unbind) => unbind());
    this.unbindMethods = [];
  }

  private notifyListener() {
    this.listener();
  }

  private bindChangeEvents() {
    const _pushState = history.pushState;
    const _replaceState = history.pushState;

    history.pushState = (...args) => {
      _pushState.call(history, ...args);
      this.notifyListener();
    };
    history.replaceState = (...args) => {
      _replaceState.call(this, ...args);
      this.notifyListener();
    };

    this.unbindMethods.push(() => {
      history.pushState = _pushState;
      history.replaceState = _replaceState;
    });

    const handler = () => this.notifyListener();
    window.addEventListener('popstate', handler);
    this.unbindMethods.push(() => window.removeEventListener('popstate', handler));
  }
}
