declare module 'openid-steam' {
  export default class {
    constructor(returnUrl: string);
    url(): Promise<string>;
    verify(returnedUrlToCheck: string): Promise<string>;
  }
}
