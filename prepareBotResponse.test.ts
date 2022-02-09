import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { unMockFetch } from "https://deno.land/x/metch/mod.ts";
import { mockFetchHelper } from "./api.test.ts";
import { ERROR_MSG, prepareBotResponse } from "./prepareBotResponse.ts";

Deno.test("prepareBotResponse returns json that discord expects with cleaned text", async () => {
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

  unMockFetch();
});
Deno.test("prepareBotResponse responds to 4xx client error with appropriate error msg", async () => {
  await mockFetchHelper(
    "https://hoogle.haskell.org?mode=json&hoogle=val&start=1&count=2",
    {},
    400,
  );

  const result = await prepareBotResponse("val");
  const jsonResult = await result.json();

  assertEquals(jsonResult, { type: 4, data: { content: ERROR_MSG.client } });

  unMockFetch();
});

Deno.test("prepareBotResponse responds to 5xx server error with appropriate error msg", async () => {
  await mockFetchHelper(
    "https://hoogle.haskell.org?mode=json&hoogle=val&start=1&count=2",
    {},
    500,
  );

  const result = await prepareBotResponse("val");
  const jsonResult = await result.json();

  assertEquals(jsonResult, { type: 4, data: { content: ERROR_MSG.server } });

  unMockFetch();
});

Deno.test("prepareBotResponse responds to yup validation error with appropriate error msg", async () => {
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

  unMockFetch();
});
