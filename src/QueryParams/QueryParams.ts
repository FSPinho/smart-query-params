export interface Params {
  [key: string]: string;
}

export class QueryParams {
  public getParams(): Params {
    const entries = new URL(window.location.toString()).searchParams.entries();
    const params: Params = {};
    for (const [key, value] of entries) {
      params[key] = value;
    }
    return params;
  }

  public pushParams(params: Params): void {
    history.pushState({}, '', this.generateUrl(params));
  }

  public replaceParams(params: Params): void {
    history.replaceState({}, '', this.generateUrl(params));
  }

  private generateUrl(params: Params): string {
    const paramsStr = new URLSearchParams(params).toString();
    const { pathname } = window.location;
    return [pathname, paramsStr ? `?${paramsStr}` : ''].join('');
  }
}
