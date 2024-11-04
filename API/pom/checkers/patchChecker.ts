import { expect, APIRequestContext, APIResponse } from "@playwright/test";
import { z } from "zod";

export class PatchAPIChecker {
  request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async validateOkResponse(apiStatus: APIResponse) {
    expect(await apiStatus).toBeOK;
  }

  async validateNotOkResponse(apiStatus: APIResponse) {
    expect(await apiStatus).not.toBeOK;
  }

  async validateData(body: object, data: object) {
    expect([body]).toMatchObject([data]);
  }
}