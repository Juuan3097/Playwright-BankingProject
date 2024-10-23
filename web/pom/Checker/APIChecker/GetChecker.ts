import { test, expect, APIRequestContext } from "@playwright/test";

export class GetChecker {
  request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async validateOkResponse(apiStatus: boolean) {
    expect(await apiStatus).toBeTruthy();
  }

  async validateNotOkResponse(apiStatus: boolean) {
    expect(await apiStatus).toBeFalsy();
  }
}
