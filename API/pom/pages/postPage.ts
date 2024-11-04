import { APIRequestContext } from "@playwright/test";

export class PostAPIPage {
  request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async postAPI(endpoint: string, data: object) {
    const apiResponse = await this.request.post(`${endpoint}`, { data });
    const body = await apiResponse.json();
    return { apiResponse, body };
  }
}