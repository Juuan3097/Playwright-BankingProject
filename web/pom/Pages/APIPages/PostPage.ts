import { test, expect, Locator, APIRequestContext } from "@playwright/test";

export class PostPage {
  request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async postToUsers(endpoint: string, data: object) {
    const newUser = await this.request.post(`${endpoint}`, { data });
    const apiStatus = await newUser.status();
    const body = await newUser.json();
    // console.log("Body:");
    // console.log(body);
    return { apiStatus, body };
  }
}
