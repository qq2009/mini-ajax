import { HttpRequest } from './request';
import type { RequestParame } from './interface/request';

export class Ajax extends HttpRequest {
  public get(url: string, parame = {} as RequestParame) {
    Object.assign(parame, { url: url, method: 'GET' })
    return this.open(parame)    
  }

  public post() {
    console.log('post');
  }
}

(window as any).Ajax = new Ajax();