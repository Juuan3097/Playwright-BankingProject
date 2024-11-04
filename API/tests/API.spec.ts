    import { test, APIRequestContext, request } from "@playwright/test";
    import { GetAPIPage } from "../pom/pages/getPage";
let apiRequestContext: APIRequestContext;

test.describe("API Testing", () => {
  test.beforeAll(async ({}) => {
    apiRequestContext = await request.newContext({
      baseURL: "https://simple-books-api.glitch.me",
      extraHTTPHeaders: { Authorization: `Bearer ${process.env.API_TOKEN}` },
    });
  });
  test("test 1", { tag: "@API-testing" }, async ({}) => {
    const apiResponse = await apiRequestContext.get("/orders");
    const status = await apiResponse.status();
    const body = await apiResponse.json();
    console.log("Status");
    console.log(status);
    console.log("Body");
    console.log(body);
  });
});

test.describe("API Testing", () => {
    test.use({
      baseURL: "https://simple-books-api.glitch.me",
      extraHTTPHeaders: { Authorization: `Bearer ${process.env.API_TOKEN}` },
    });
    test("Obtener orden", { tag: "@API-testing" }, async ({ request }) => {
      const getPage = new GetAPIPage(request);
      const endpoint = process.env.API_ORDERS_SB!;
      const getOrder = await getPage.getAPI(endpoint);
      const status = await getOrder.apiResponse;
      const body = await getOrder.body;
      console.log(status);
      console.log(body);
    });
  });