import { test, expect, Locator, APIRequestContext } from "@playwright/test";

export class GetPage {
  request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async getUsers(endpoint: string) {
    const apiResponse = await this.request.get(`${endpoint}`);
    const body = await apiResponse.json();
    return { apiResponse, body };
  }
}
