import { test, expect, Locator, APIRequestContext } from "@playwright/test";

export class DeletePage {
  request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async DeleteUsers(endpoint: string, data: object, dataName: string) {
    const newUser = await this.request.delete(`${endpoint}/${dataName}}`);
    const apiStatus = await newUser.status();
    return { apiStatus };
  }
}
