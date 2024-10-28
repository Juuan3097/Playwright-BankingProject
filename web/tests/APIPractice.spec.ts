import { test, expect } from "@playwright/test";
import { GetPage } from "../pom/Pages/APIPages/GetPage";
import { GetChecker } from "../pom/Checker/APIChecker/GetChecker";
import { PostPage } from "../pom/Pages/APIPages/PostPage";
import { PostChecker } from "../pom/Checker/APIChecker/PostChecker";
import { PutPage } from "../pom/Pages/APIPages/PutPage";
import { PutChecker } from "../pom/Checker/APIChecker/PutChecker";
import { PatchPage } from "../pom/Pages/APIPages/PatchPage";
import { PatchChecker } from "../pom/Checker/APIChecker/PatchChecker";
import { DeletePage } from "../pom/Pages/APIPages/DeletePage";
import { DeleteChecker } from "../pom/Checker/APIChecker/DeleteChecker";

test.describe("API testing", () => {
  test(
    "Get users",
    {
      tag: "@API",
    },
    async ({ request }) => {
      const getPage = new GetPage(request);
      const getChecker = new GetChecker(request);
      const endpoint = process.env.USERS_ENDPOINT!;
      const getUsers = await getPage.getUsers(endpoint);
      const apiResponse = await getUsers.apiResponse;
      const bodyElement = await getUsers.body.data;
      await getChecker.validateSchema(bodyElement);
      await getChecker.validateOkResponse(apiResponse);
    }
  );
  test(
    "Get user",
    {
      tag: "@API",
    },
    async ({ request }) => {
      const getPage = new GetPage(request);
      const getChecker = new GetChecker(request);
      const endpoint = process.env.USER_ENDPOINT!;
      const getUsers = await getPage.getUsers(endpoint);
      const apiResponse = await getUsers.apiResponse;
      const bodyElement = await getUsers.body.data;
      await getChecker.validateSchema(bodyElement);
      await getChecker.validateOkResponse(apiResponse);
    }
  );
  test(
    "Get user not found",
    {
      tag: "@API",
    },
    async ({ request }) => {
      const getPage = new GetPage(request);
      const getChecker = new GetChecker(request);
      const endpoint = process.env.USER_NOTFOUND!;
      const getUsers = await getPage.getUsers(endpoint);
      const apiResponse = await getUsers.apiResponse;
      await getChecker.validateNotOkResponse(apiResponse);
    }
  );
  test(
    "Delayed response",
    {
      tag: "@API",
    },
    async ({ request }) => {
      const getPage = new GetPage(request);
      const getChecker = new GetChecker(request);
      const endpoint = process.env.USERS_DELAYED!;
      const getUsers = await getPage.getUsers(endpoint);
      const apiResponse = await getUsers.apiResponse;
      const bodyElement = await getUsers.body.data;
      await getChecker.validateSchema(bodyElement);
      await getChecker.validateOkResponse(apiResponse);
    }
  );
  test(
    "Post user to list",
    {
      tag: "@API",
    },
    async ({ request }) => {
      const data = {
        name: "Sandman",
        job: "QA",
      };
      const postPage = new PostPage(request);
      const postChecker = new PostChecker(request);
      const endpoint = process.env.POST_USERS_ENDPOINT!;
      const postUser = await postPage.postToUsers(endpoint, data);
      const apiResponse = await postUser.apiResponse;
      const body = await postUser.body;
      await postChecker.validateOkResponse(apiResponse);
      await postChecker.validateData(body, data);
      await postChecker.validateSchema(data);
    }
  );
  test(
    "Put user ",
    {
      tag: "@API",
    },
    async ({ request }) => {
      const data = {
        name: "Sandman",
        job: "QA",
      };
      const postPage = new PostPage(request);
      const postChecker = new PostChecker(request);
      const endpoint = process.env.USER_ENDPOINT!;
      const postUser = await postPage.postToUsers(endpoint, data);
      const apiResponse = await postUser.apiResponse;
      const body = await postUser.body;
      await postChecker.validateOkResponse(apiResponse);
      await postChecker.validateData(body, data);
      await postChecker.validateSchema(body);
    }
  );
  test(
    "Put user job",
    {
      tag: "@API",
    },
    async ({ request }) => {
      const data = {
        //        name: "Sandman",
        job: "QA",
      };
      const putPage = new PutPage(request);
      const putChecker = new PutChecker(request);
      const endpoint = process.env.USER_ENDPOINT!;
      const putUsers = await putPage.putUsers(endpoint, data);
      const apiResponse = await putUsers.apiResponse;
      const body = await putUsers.body;
      await putChecker.validateOkResponse(apiResponse);
      await putChecker.validateRequire(body);
      await putChecker.validateData(body, data);
    }
  );
  test(
    "Put user Name",
    {
      tag: "@API",
    },
    async ({ request }) => {
      const data = {
        name: "morpheus",
        //        job: "zion resident",
      };
      const putPage = new PutPage(request);
      const putChecker = new PutChecker(request);
      const endpoint = process.env.USER_ENDPOINT!;
      const putUsers = await putPage.putUsers(endpoint, data);
      const apiResponse = await putUsers.apiResponse;
      const body = await putUsers.body;
      await putChecker.validateOkResponse(apiResponse);
      await putChecker.validateRequire(body);
      await putChecker.validateData(body, data);
    }
  );
  test(
    "Patch user",
    {
      tag: "@API",
    },
    async ({ request }) => {
      const data = {
        name: "Sandman",
        job: "QA",
      };
      const patchPage = new PatchPage(request);
      const patchChecker = new PatchChecker(request);
      const endpoint = process.env.USER_ENDPOINT!;
      const dataName = data.name;
      const patchUsers = await patchPage.patchUsers(endpoint, data, dataName);
      const apiResponse = await patchUsers.apiResponse;
      const body = await patchUsers.body;
      await patchChecker.validateOkResponse(apiResponse);
      await patchChecker.validateData(body, data);
    }
  );
  test(
    "Patch user Name",
    {
      tag: "@API",
    },
    async ({ request }) => {
      const data = {
        name: "Sandman",
        //        job: "QA",
      };
      const patchPage = new PatchPage(request);
      const patchChecker = new PatchChecker(request);
      const endpoint = process.env.USER_ENDPOINT!;
      const dataName = data.name;
      const patchUsers = await patchPage.patchUsers(endpoint, data, dataName);
      const apiResponse = await patchUsers.apiResponse;
      const body = await patchUsers.body;
      await patchChecker.validateOkResponse(apiResponse);
      await patchChecker.validateData(body, data);
    }
  );
  test(
    "Patch user Job",
    {
      tag: "@API",
    },
    async ({ request }) => {
      const data = {
        //        name: "Sandman",
        job: "QA",
      };
      const patchPage = new PatchPage(request);
      const patchChecker = new PatchChecker(request);
      const endpoint = process.env.USER_ENDPOINT!;
      const dataName = data.job;
      const patchUsers = await patchPage.patchUsers(endpoint, data, dataName);
      const apiResponse = await patchUsers.apiResponse;
      const body = await patchUsers.body;
      await patchChecker.validateOkResponse(apiResponse);
      await patchChecker.validateData(body, data);
    }
  );
  test(
    "Delete user",
    {
      tag: "@API",
    },
    async ({ request }) => {
      const data = {
        email: "test@reqres.in",
        first_name: "Morpheus",
        last_name: "Sandman",
        avatar: "https://reqres.in/img/faces/2-image.jpg",
      };
      const deletePage = new DeletePage(request);
      const deleteChecker = new DeleteChecker(request);
      const endpoint = process.env.USER_ENDPOINT!;
      const dataName = data.first_name;
      const deleteUsers = await deletePage.DeleteUsers(endpoint, dataName);
      const apiStatus = await deleteUsers.apiStatus;
      await deleteChecker.validateOkResponse(apiStatus);
    }
  );
});
