import { test, expect, Locator, APIRequestContext } from "@playwright/test";

export class PutPage {
  request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async PutUsers(endpoint: string, data: object) {
    const newUser = await this.request.put(`${endpoint}`, { data });
    const apiStatus = await newUser.status();
    const body = await newUser.json();
    return { apiStatus, body };
  }
}
