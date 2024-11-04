import { test, expect, APIRequestContext, APIResponse } from "@playwright/test";
import { z } from "zod";

export class PostAPIChecker {
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

  async validateData(body: object, data: object) {
    expect([body]).toMatchObject([data]);
  }

  async validateORderSchema(bodyElement: object) {
    const bodyResponse = z
      .object({
        created: z.boolean(),
        orderId: z.string(),
      })
      .optional();
    await bodyResponse.parse(bodyElement);
  }
}
