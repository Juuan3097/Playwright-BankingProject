import { APIRequestContext } from "@playwright/test";

export class PatchAPIPage {
  request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async patchAPI(endpoint: string, data: object) {
    const apiResponse = await this.request.patch(`${endpoint}`, { data });
//    const body = await apiResponse.json();
    return { apiResponse };
  }
}
