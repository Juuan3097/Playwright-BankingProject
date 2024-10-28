import { test, expect, Locator, APIRequestContext } from "@playwright/test";

export class PutPage {
  request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async putUsers(endpoint: string, data: object) {
    const apiResponse = await this.request.put(`${endpoint}`, { data });
    const body = await apiResponse.json();
    console.log("Body:");
    console.log(body);
    return { apiResponse, body };
  }
}
