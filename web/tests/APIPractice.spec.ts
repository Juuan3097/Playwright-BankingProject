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
import { z } from "zod";

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
      const apiStatus = await getUsers.getUsers.ok();
      const bodyElement = await getUsers.body.data;
      await getChecker.validateType(bodyElement);
      await getChecker.validateOkResponse(apiStatus);
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
      const apiStatus = await getUsers.getUsers.ok();
      const bodyElement = await getUsers.body.data;
      await getChecker.validateType(bodyElement);
      await getChecker.validateOkResponse(apiStatus);
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
      const apiStatus = await getUsers.getUsers.ok();
      const bodyElement = await getUsers.body.data;
      await getChecker.validateType(bodyElement);
      await getChecker.validateNotOkResponse(apiStatus);
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
      const apiStatus = await getUsers.getUsers.ok();
      const bodyElement = await getUsers.body.data;
      await getChecker.validateType(bodyElement);
      await getChecker.validateOkResponse(apiStatus);
    }
  );
  test.only(
    "Post user to list",
    {
      tag: "@API",
    },
    async ({ request }) => {
      const data: object[] = [
        {
          first_name: "John",
          last_name: "Rivers",
        },
      ];
      const postPage = new PostPage(request);
      const postChecker = new PostChecker(request);
      const endpoint = process.env.POST_USERS_ENDPOINT!;
      const postUser = await postPage.postToUsers(endpoint, data);
      const apiStatus = await postUser.apiStatus;
      const body = await postUser.body;
      const bodyElement = await body;
      await postChecker.validateOkResponse(apiStatus);
      await postChecker.validateData(body, data, bodyElement);
    }
  );
  test(
    "Put user",
    {
      tag: "@API",
    },
    async ({ request }) => {
      const data = [
        {
          name: "John Rivers",
          job: "QA",
        },
      ];
      const putPage = new PutPage(request);
      const putChecker = new PutChecker(request);
      const endpoint = process.env.USER_ENDPOINT!;
      const putUsers = await putPage.PutUsers(endpoint, data);
      const apiStatus = await putUsers.apiStatus;
      const body = await putUsers.body;
      await putChecker.validateOkResponse(apiStatus);
      await putChecker.validateData(body, data);
    }
  );
  test(
    "Patch user Job",
    {
      tag: "@API",
    },
    async ({ request }) => {
      const data = [
        {
          name: "morpheus",
          job: "DEV",
        },
      ];
      const patchPage = new PatchPage(request);
      const patchChecker = new PatchChecker(request);
      const endpoint = process.env.USER_ENDPOINT!;
      const dataName = data[0].name;
      const patchUsers = await patchPage.patchUsers(endpoint, data, dataName);
      const apiStatus = await patchUsers.apiStatus;
      const body = await patchUsers.body;
      await patchChecker.validateOkResponse(apiStatus);
      await patchChecker.validateData(body, data);
    }
  );
  test(
    "Patch user Name",
    {
      tag: "@API",
    },
    async ({ request }) => {
      const data = [
        {
          name: "Sandman",
          job: "QA",
        },
      ];
      const patchPage = new PatchPage(request);
      const patchChecker = new PatchChecker(request);
      const endpoint = process.env.USER_ENDPOINT!;
      const dataName = data[0].job;
      const patchUsers = await patchPage.patchUsers(endpoint, data, dataName);
      const apiStatus = await patchUsers.apiStatus;
      const body = await patchUsers.body;
      await patchChecker.validateOkResponse(apiStatus);
      await patchChecker.validateData(body, data);
    }
  );
  test(
    "Post, get and patch by Job",
    {
      tag: "@API",
    },
    async ({ request }) => {
      const dataA = [
        {
          email: "test@reqres.in",
          first_name: "Morpheus",
          last_name: "Sandman",
          avatar: "https://reqres.in/img/faces/2-image.jpg",
        },
      ];
      const dataB = [
        {
          first_name: "Sandman",
          job: "DEV",
        },
      ];
      //Post starts
      const endpoint = process.env.USER_ENDPOINT!;
      const postPage = new PostPage(request);
      const postChecker = new PostChecker(request);
      const postUser = await postPage.postToUsers(endpoint, dataA);
      const apiStatusA = await postUser.apiStatus;
      const bodyA = await postUser.body;
      const bodyElement = await postUser.body.data;
      await postChecker.validateOkResponse(apiStatusA);
      await postChecker.validateData(bodyA, dataA, bodyElement);
      //Post ends
      //Patch starts
      const patchPage = new PatchPage(request);
      const patchChecker = new PatchChecker(request);
      //      const endpoint = process.env.USER_ENDPOINT!;
      const dataJob = dataA[0].first_name;
      const patchUsers = await patchPage.patchUsers(endpoint, dataB, dataJob);
      const apiStatusB = await patchUsers.apiStatus;
      const body = await patchUsers.body;
      await patchChecker.validateOkResponse(apiStatusB);
      //      await patchChecker.validateData(body, dataB);
      //Patch ends
      //Get starts
      const getPage = new GetPage(request);
      const getChecker = new GetChecker(request);
      //      const endpoint = process.env.USER_ENDPOINT!;
      const getUsers = await getPage.getUsers(endpoint);
      const apiStatusC = await getUsers.getUsers.ok();
      await getChecker.validateOkResponse(apiStatusC);
      //Get ends
    }
  );
  test(
    "Delete user",
    {
      tag: "@API",
    },
    async ({ request }) => {
      const data = [
        {
          email: "test@reqres.in",
          first_name: "Morpheus",
          last_name: "Sandman",
          avatar: "https://reqres.in/img/faces/2-image.jpg",
        },
      ];
      const deletePage = new DeletePage(request);
      const deleteChecker = new DeleteChecker(request);
      const endpoint = process.env.USER_ENDPOINT!;
      const dataName = data[0].first_name;
      const deleteUsers = await deletePage.DeleteUsers(endpoint, dataName);
      const apiStatus = await deleteUsers.apiStatus;
      await deleteChecker.validateOkResponse(apiStatus);
    }
  );
});
