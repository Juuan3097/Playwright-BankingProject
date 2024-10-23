import { test, expect, Locator, APIRequestContext } from "@playwright/test";

export class GetPage {
  request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async getUsers(endpoint: string) {
    const getUsers = await this.request.get(`${endpoint}`);
    return { getUsers };
  }
}
