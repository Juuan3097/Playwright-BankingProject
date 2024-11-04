import { APIRequestContext } from "@playwright/test";

export class DeleteAPIPage {
  request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async deleteAPI(endpoint: string) {
    const apiResponse = await this.request.delete(`${endpoint}`);
//    const body = await apiResponse.json();
    return { apiResponse };
  }
}