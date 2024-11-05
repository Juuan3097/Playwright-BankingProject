import { APIRequestContext, APIResponse, request } from "@playwright/test";
import { GetAPIPage } from "./getPage";
import { PostAPIPage } from "./postPage";
import fs from "fs";

export class TokenPage {
  apirequest: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.apirequest = request;
  }

  async readFile() {
    const data = fs.readFileSync("API/token.txt", "utf-8");
    return data;
  }

  async getApiStatus(apiRequestContext: APIRequestContext) {
    const getPage = new GetAPIPage(apiRequestContext);
    const endpoint = process.env.API_ORDERS_SB!;
    const orderId = process.env.API_ORDER_ID_SB!;
    const getOrder = await getPage.getAPI(endpoint + orderId);
    const status = await getOrder.apiResponse;
    console.log("Status: ");
    console.log(status);
    return { status };
  }

  async createToken(apiRequestContext: APIRequestContext) {
    const data = {
      clientName: "jrios1",
      clientEmail: "jriostest1@example.com",
    };
    const postPage = new PostAPIPage(apiRequestContext);
    const endpoint = process.env.API_CLIENT_SB!;
    const postClient = await postPage.postAPI(endpoint, data);
    const body = await postClient.body;
    const bodyString = JSON.stringify(body);
    console.log("Body");
    console.log(bodyString);
    const accessToken = await bodyString.replace('{"accessToken":"', "").trim();
    const token = await accessToken.replace('"}', "");
    return { token };
  }

  async validateAuthentication(apiRequestContext: APIRequestContext) {
    const status = await this.getApiStatus(apiRequestContext);
    if (await status.status.ok()) {
      console.log("Autenticacion aprobada");
    } else {
      console.log("Autenticacion rechazada");
      const tokenCreated = await this.createToken(apiRequestContext);
      const token = await tokenCreated.token;
      console.log("Token Creado: " + token);
      fs.writeFileSync("API/token.txt", token);
      // write token.text with new token
    }
  }
}
