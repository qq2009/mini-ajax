import { HttpRequest } from './request';
import type { RequestParame, requestUse, responseUse } from './interface/request';

export class Ajax extends HttpRequest {
  public get(url: string, parame = {} as RequestParame) {
    Object.assign(parame, { url: url, method: 'GET' })
    return this.request(parame)
  }

  public post() {
    console.log('post');
  }
}
const ajax = new Ajax();
(window as any).Ajax = ajax;