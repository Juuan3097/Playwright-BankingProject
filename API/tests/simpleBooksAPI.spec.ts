import { test, APIRequestContext, request } from "@playwright/test";
import { GetAPIPage } from "../pom/pages/getPage";
import { PostAPIPage } from "../pom/pages/postPage";
import { DeleteAPIPage } from "../pom/pages/deletePage";
import { PatchAPIPage } from "../pom/pages/patchPage";
import { GetAPIChecker } from "../pom/checkers/getChecker";
import { PostAPIChecker } from "../pom/checkers/postChecker";
import { DeleteAPIChecker } from "../pom/checkers/deleteChecker";
import fs from "fs";
import { TokenPage } from "../pom/pages/tokenPage";

let apiRequestContext: APIRequestContext;

test.describe("API Testing", () => {
  test.beforeAll(async ({}) => {
    const tokenPage = new TokenPage(apiRequestContext);
    const token = await tokenPage.readFile();
    apiRequestContext = await request.newContext({
      baseURL: "https://simple-books-api.glitch.me",
      extraHTTPHeaders: { Authorization: `Bearer ${token}` },
    });
    await tokenPage.validateAuthentication(apiRequestContext);
  });
  test.only("Get status", { tag: "@API-testing" }, async ({}) => {
    const getPage = new GetAPIPage(apiRequestContext);
    const getChecker = new GetAPIChecker(apiRequestContext);
    const endpoint = process.env.API_STATUS_SB!;
    const getOrder = await getPage.getAPI(endpoint);
    const status = await getOrder.apiResponse;
    await getChecker.validateOkResponse(status);
  });
  test.skip("Registro de cliente", { tag: "@API-testing" }, async ({}) => {
    const data = {
      clientName: "jrios1",
      clientEmail: "jriostest1@example.com",
    };
    const postPage = new PostAPIPage(apiRequestContext);
    const postChecker = new PostAPIChecker(apiRequestContext);
    const endpoint = process.env.API_CLIENT_SB!;
    const postClient = await postPage.postAPI(endpoint, data);
    const status = await postClient.apiResponse;
    const body = await postClient.body;
    await postChecker.validateOkResponse(status);
  });
  test("Crear orden", { tag: "@API-testing" }, async ({}) => {
    const data = {
      bookId: 1,
      customerName: "John",
    };
    const postPage = new PostAPIPage(apiRequestContext);
    const postChecker = new PostAPIChecker(apiRequestContext);
    const endpoint = process.env.API_ORDERS_SB!;
    const postOrder = await postPage.postAPI(endpoint, data);
    const status = await postOrder.apiResponse;
    const body = await postOrder.body;
    await postChecker.validateORderSchema(body);
    await postChecker.validateOkResponse(status);
  });
  test("Get ordenes", { tag: "@API-testing" }, async ({}) => {
    const getPage = new GetAPIPage(apiRequestContext);
    const getAPIChecker = new GetAPIChecker(apiRequestContext);
    const endpoint = process.env.API_ORDERS_SB!;
    const getOrder = await getPage.getAPI(endpoint);
    const status = await getOrder.apiResponse;
    const body = await getOrder.body;
    await getAPIChecker.validateORderSchema(body);
    await getAPIChecker.validateOkResponse(status);
  });
  test("Get orden by id", { tag: "@API-testing" }, async ({}) => {
    const getPage = new GetAPIPage(apiRequestContext);
    const getAPIChecker = new GetAPIChecker(apiRequestContext);
    const endpoint = process.env.API_ORDERS_SB!;
    const bookId = process.env.API_ORDER_ID_SB!;
    const getOrder = await getPage.getAPI(endpoint + bookId);
    const status = await getOrder.apiResponse;
    const body = await getOrder.body;
    await getAPIChecker.validateOkResponse(status);
    console.log("Status");
    console.log(status);
    await getAPIChecker.validateORderSchema(body);
  });
  test("Get books", { tag: "@API-testing" }, async ({}) => {
    const getPage = new GetAPIPage(apiRequestContext);
    const getAPIChecker = new GetAPIChecker(apiRequestContext);
    const endpoint = process.env.API_BOOKS_SB!;
    const getBook = await getPage.getAPI(endpoint);
    const status = await getBook.apiResponse;
    const body = await getBook.body;
    await getAPIChecker.validateBookSchema(body);
    await getAPIChecker.validateOkResponse(status);
  });
  test("Get book by id", { tag: "@API-testing" }, async ({}) => {
    const getPage = new GetAPIPage(apiRequestContext);
    const getAPIChecker = new GetAPIChecker(apiRequestContext);
    const endpoint = process.env.API_BOOKS_SB!;
    const bookId = 1;
    const getBook = await getPage.getAPI(endpoint + bookId);
    const status = await getBook.apiResponse;
    const body = await getBook.body;
    await getAPIChecker.validateBookIdSchema(body);
    await getAPIChecker.validateOkResponse(status);
  });
  test("Delete order by id", { tag: "@API-testing" }, async ({}) => {
    const deletePage = new DeleteAPIPage(apiRequestContext);
    const deleteChecker = new DeleteAPIChecker(apiRequestContext);
    const endpoint = process.env.API_ORDERS_SB!;
    const bookId = process.env.API_ORDER_ID_SB!;
    const deleteOrder = await deletePage.deleteAPI(endpoint + bookId);
    const status = await deleteOrder.apiResponse;
    await deleteChecker.validateOkResponse(status);
  });
  test("Update order patch", { tag: "@API-testing" }, async ({}) => {
    const data = {
      customerName: "Juan",
    };
    const patchPage = new PatchAPIPage(apiRequestContext);
    const endpoint = process.env.API_ORDERS_SB!;
    const bookId = process.env.API_ORDER_ID_SB!;
    const endpointId = endpoint + bookId;
    const patchOrder = await patchPage.patchAPI(endpointId, data);
    const status = await patchOrder.apiResponse;
    console.log(status);
  });
});
