import { test, expect, APIRequestContext } from "@playwright/test";
import { z } from "zod";

export class PostChecker {
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

  async validateData(body: object, data: object, bodyElement: object) {
    const bodyResponse = z
      .object({
        id: z.number(),
        email: z.string(),
        first_name: z.string(),
        last_name: z.string(),
        avatar: z.string(),
      })
      .partial().required({
        first_name: true,
        last_name: true,
      })
      .array();
    // .required({
    //   first_name: true,
    //   last_name: true,
    // })

    //    expect(bodyResponse.parse(bodyElement)).not.toThrow();
    expect(async () => await bodyResponse.parse(bodyElement)).not.toThrow();
    expect(body).toEqual(data);
  }
}
