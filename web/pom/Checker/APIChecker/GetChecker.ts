import { test, expect, APIRequestContext } from "@playwright/test";
import { z } from "zod";

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

  async validateType(bodyElement: object) {
    const bodyResponse = z
      .object({
        id: z.number(),
        email: z.string(),
        first_name: z.string(),
        last_name: z.string(),
        avatar: z.string(),
      })
      .array();
    expect(() => bodyResponse.parse(bodyElement)).not.toThrow();
  }
}
