import { test, expect, APIRequestContext, APIResponse } from "@playwright/test";
import { z } from "zod";

export class GetAPIChecker {
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

  async validateORderSchema(bodyElement: object) {
    if (Array.isArray(bodyElement)) {
      const bodyResponse = z
        .object({
          id: z.string(),
          bookId: z.number(),
          customerName: z.string(),
          createdBy: z.string().optional(),
          quantity: z.number().optional(),
          timestamp: z.number().optional(),
        })
        .array();
      await bodyResponse.parse(bodyElement);
    } else {
      const bodyResponse = z.object({
        id: z.string(),
        bookId: z.number(),
        customerName: z.string(),
        createdBy: z.string().optional(),
        quantity: z.number().optional(),
        timestamp: z.number().optional(),
      });
      await bodyResponse.parse(bodyElement);
    }
  }

  async validateBookSchema(bodyElement: object) {
    const bodyResponse = z
      .object({
        id: z.number(),
        name: z.string(),
        type: z.string(),
        available: z.boolean(),
      })
      .array();
    await bodyResponse.parse(bodyElement);
  }

  async validateBookIdSchema(bodyElement: object) {
    const bodyResponse = z.object({
      id: z.number(),
      name: z.string(),
      author: z.string(),
      isbn: z.string(),
      type: z.string(),
      price: z.number(),
      "current-stock": z.number(),
      available: z.boolean(),
    });
    await bodyResponse.parse(bodyElement);
  }
}
