import { test, expect, Locator, APIRequestContext } from "@playwright/test";

export class PatchPage {
  request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async patchUsers(endpoint: string, data: object, dataJob: string) {
    const apiResponse = await this.request.patch(`${endpoint}/${dataJob}}`, {
      data,
    });
    const body = await apiResponse.json(); // Devuelve Body de la response
    console.log("Body:");
    console.log(body);
    return { apiResponse, body };
  }
}
