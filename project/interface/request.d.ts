export type RequestType = 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'OPTIONS' | 'TRACE' | 'PATCH';
export interface RequestParame {
  // 请求服务器 URL
  url: string;
  // 创建请求时的方法
  method: RequestType;
  // 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  baseURL: string;
  // 自定义请求头
  headers: string;
  params: {
    [key: string]: any
  },
  data: {
    [key: string]: any
  },
  // 指定请求超时的毫秒数
  timeout: number
}