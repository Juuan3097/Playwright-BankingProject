import { expect, APIRequestContext, APIResponse } from "@playwright/test";
import { z } from "zod";

export class PatchChecker {
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

  async validateSchema(bodyElement: object) {
    const bodyResponse = z
      .object({
        name: z.string(),
        job: z.string(),
      })
      .required({
        name: true,
        job: true,
      });
    await bodyResponse.parse(bodyElement);
  }
}
