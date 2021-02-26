import type { RequestParame } from './interface/request';
export class HttpRequest {
  public constructor() {

  }

  open(parame: RequestParame) {
    const { method, url, baseURL } = parame;
    return new Promise((resolve, reject) => {

      var xhr = new XMLHttpRequest();

      xhr.onload = function () {
        const { status, response, responseText, timeout } = this;
        resolve({
          data: JSON.parse(responseText),
          status,
        })
      }

      xhr.open(method, url);
      // xhr.responseType = "document";
      xhr.send();
    })
  }
}