import { assertEquals, unMockFetch } from "./deps.ts";
import { ERROR_MSG, prepareBotResponse } from "./prepareBotResponse.ts";
import { mockFetchHelper } from "./mockFetchHelper.ts";

Deno.test("Preparing bot response", async (t) => {
  await t.step(
    "returns json that discord expects with cleaned text",
    async () => {
      const simple =
        "Yo hello watup <pre>\nim aight bro</pre>. That's so <pre>frickin' cool brah, yeah</pre>. Here is a\nrandom line break\nand another because why not.\n";
      const simpleCleaned =
        "Yo hello watup ```hs\n\nim aight bro```. That's so ```hs\nfrickin' cool brah, yeah```. Here is a random line break and another because why not.";
      await mockFetchHelper(
        "https://hoogle.haskell.org?mode=json&hoogle=val&start=1&count=2",
        [{ docs: simple, url: "https://example.com" }],
      );
      const result = await prepareBotResponse("val");
      const jsonResult = await result.json();
      assertEquals(jsonResult, { type: 4, data: { content: simpleCleaned } });
    },
  );

  await t.step(
    "responds to 4xx client error with appropriate error msg",
    async () => {
      await mockFetchHelper(
        "https://hoogle.haskell.org?mode=json&hoogle=val&start=1&count=2",
        {},
        400,
      );
      const result = await prepareBotResponse("val");
      const jsonResult = await result.json();
      assertEquals(jsonResult, {
        type: 4,
        data: { content: ERROR_MSG.client },
      });
    },
  );

  await t.step(
    "responds to 5xx server error with appropriate error msg",
    async () => {
      await mockFetchHelper(
        "https://hoogle.haskell.org?mode=json&hoogle=val&start=1&count=2",
        {},
        500,
      );
      const result = await prepareBotResponse("val");
      const jsonResult = await result.json();
      assertEquals(jsonResult, {
        type: 4,
        data: { content: ERROR_MSG.server },
      });
    },
  );

  await t.step(
    "responds to yup validation error with appropriate error msg",
    async () => {
      await mockFetchHelper(
        "https://hoogle.haskell.org?mode=json&hoogle=val&start=1&count=2",
        {},
        200,
      );
      const result = await prepareBotResponse("val");
      const jsonResult = await result.json();
      assertEquals(jsonResult, {
        type: 4,
        data: { content: ERROR_MSG.validation },
      });
    },
  );

  unMockFetch();
});
