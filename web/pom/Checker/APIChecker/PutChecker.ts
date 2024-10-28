import { test, expect, APIRequestContext, APIResponse } from "@playwright/test";
import { z } from "zod";

export class PutChecker {
  request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async validateOkResponse(apiStatus: APIResponse) {
    await expect(apiStatus).toBeOK();
  }

  async validateNotOkResponse(apiStatus: APIResponse) {
    await expect(apiStatus).not.toBeOK();
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
    const result = bodyResponse.safeParse(bodyElement);
    console.log("Resultado");
    console.log(result);
    await expect(bodyResponse.parse(bodyElement));
  }

  async validateRequire(bodyElement: object) {
    const bodyResponse = z
      .object({
        name: z.string(),
        job: z.string(),
      })
      .required({
        name: true,
        job: true,
      });
    const result = bodyResponse.safeParse(bodyElement);
    expect(result.error).toBeTruthy();
  }
}
