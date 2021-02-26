import type {
  RequestParame,
  RequestResponse,
  requestUse,
  responseUse,
  UseCallbackL
} from './interface/request';

export class HttpRequest {
  public constructor() {
    this.initialize()
  }

  private initialize() {
    /**
     * 注册拦截器
     * @param { (callback: unknown) => void }
     * */
    // TODO: 待优化
    function requestUse(callback: (config: RequestParame) => void) {
      (this as unknown as UseCallbackL).callbackList.push(callback);
    }
    function responseUse(callback: (config: RequestResponse) => void) {
      (this as unknown as UseCallbackL).callbackList.push(callback);
    }
    (this.request as unknown as requestUse).use = requestUse;
    (this.response as unknown as responseUse).use = responseUse;
    (this.request as unknown as UseCallbackL).callbackList = [];
    (this.response as unknown as UseCallbackL).callbackList = [];
  }

  /**
   * 请求
   * @param { RequestParame } parame
  */
  public request<K = any>(parame: RequestParame) {
    const vm = this;
    (this.request as unknown as UseCallbackL).callbackList.forEach(callbackFn => {
      callbackFn(parame)
    })
    const { method, url, baseURL } = parame;
    return new Promise((resolve, reject) => {
      const xhr = new window.XMLHttpRequest();
      xhr.onload = function () {
        vm.response<K>(this, resolve, reject)
      }
      xhr.open(method, url);
      xhr.send();
    })
  }

  /**
   * 响应
   * @param { XMLHttpRequest } vm - 请求结果上下文
   * @param { (value: unknown) => void } resolve
   * @param { (value: unknown) => void } reject
  */
  public response<K>(vm: XMLHttpRequest, resolve: (value: unknown) => void, reject: (value: unknown) => void) {
    const { status, response, responseText, timeout } = vm;
    let result: RequestResponse<K> | RequestResponse;
    try {
      result = {
        data: JSON.parse(responseText),
        status,
      }
    } catch {
      result = {
        data: responseText,
        status,
      }
    }

    (this.response as unknown as UseCallbackL).callbackList.forEach(callbackFn => {
      callbackFn(result)
    })
  }
}
