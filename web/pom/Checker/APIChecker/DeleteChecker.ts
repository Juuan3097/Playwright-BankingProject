import { test, expect, APIRequestContext } from "@playwright/test";

export class DeleteChecker {
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
}
