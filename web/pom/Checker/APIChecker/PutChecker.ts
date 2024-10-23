import { test, expect, APIRequestContext } from "@playwright/test";

export class PutChecker {
  request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async validateOkResponse(apiStatus: any) {
    expect(await apiStatus).toBeTruthy();
  }

  async validateNotOkResponse(apiStatus: any) {
    expect(await apiStatus).toBeFalsy();
  }

  async validateData(body: object, data: object) {
    expect(body).toEqual(data);
  }
}