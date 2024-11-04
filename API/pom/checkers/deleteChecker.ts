import { test, expect, APIRequestContext, APIResponse } from "@playwright/test";

export class DeleteAPIChecker {
  request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async validateOkResponse(apiStatus: APIResponse) {
    expect(await apiStatus).toBeOK();
  }

  async validateNotOkResponse(apiStatus: APIResponse) {
    expect(await apiStatus).not.toBeOK();
  }
}