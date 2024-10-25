import { test, expect, Locator, APIRequestContext } from "@playwright/test";

export class PatchPage {
  request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async patchUsers(endpoint: string, data: object, dataJob: string) {
    const newUser = await this.request.patch(`${endpoint}/${dataJob}}`, {
      data,
    });
    const apiStatus = await newUser.status();
    const body = await newUser.json(); // Devuelve Body de la response
    console.log("Body:");
    console.log(body);
    return { apiStatus, body };
  }
}
