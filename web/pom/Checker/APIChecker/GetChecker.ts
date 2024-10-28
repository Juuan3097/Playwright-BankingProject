import { test, expect, APIRequestContext, APIResponse } from "@playwright/test";
import { array, z } from "zod";

export class GetChecker {
  request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async validateOkResponse(apiResponse: APIResponse) {
    expect(await apiResponse).toBeOK();
  }

  async validateNotOkResponse(apiResponse: APIResponse) {
    expect(await apiResponse).not.toBeOK();
  }

  async validateSchema(bodyElement: object) {
    if (Array.isArray(bodyElement)) {
      const bodyResponse = z
        .object({
          id: z.number(),
          email: z.string(),
          first_name: z.string(),
          last_name: z.string(),
          avatar: z.string(),
        })
        .array();
      await bodyResponse.parse(bodyElement);
    } else {
      const bodyResponse = z.object({
        id: z.number(),
        email: z.string(),
        first_name: z.string(),
        last_name: z.string(),
        avatar: z.string(),
      });
      await bodyResponse.parse(bodyElement);
    }
  }
}
