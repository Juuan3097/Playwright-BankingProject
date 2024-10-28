import { test, expect, Locator, APIRequestContext } from "@playwright/test";

export class PostPage {
  request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async postToUsers(endpoint: string, data: object) {
    const apiResponse = await this.request.post(`${endpoint}`, { data });
    const body = await apiResponse.json();

    return { apiResponse, body };
  }
}
