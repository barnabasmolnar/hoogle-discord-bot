import { assertEquals, assertRejects, unMockFetch, yup } from "./deps.ts";
import { getHoogleJSON, hoogleAPI, requestJSON } from "./api.ts";
import { mapResults, mapResultsStripped } from "./mockData.ts";
import { mockFetchHelper } from "./mockFetchHelper.ts";

const testURL =
  "https://hoogle.haskell.org?mode=json&hoogle=map&start=1&count=2";

Deno.test("API", async (t) => {
  await t.step("returns raw results from API properly", async () => {
    await mockFetchHelper(testURL, mapResults);
    const response = await requestJSON(`${hoogleAPI}=map&start=1&count=2`);
    assertEquals(response, mapResults);
  });

  await t.step("returns validated data from API", async () => {
    await mockFetchHelper(testURL, mapResultsStripped);
    const response = await getHoogleJSON("map");
    assertEquals(response, mapResultsStripped);
  });

  await t.step("rejects invalid data with validation error", async () => {
    await mockFetchHelper(testURL, [{ "this": "will fail for sure" }]);
    assertRejects(() => getHoogleJSON("map"), yup.ValidationError);
  });

  await t.step("requestJSON rejects with 400", async () => {
    await mockFetchHelper(testURL, {}, 400, "aint gonna work, son");
    assertRejects(
      () => requestJSON(`${hoogleAPI}=map&start=1&count=2`),
      Error,
      "aint gonna work, son",
    );
  });

  unMockFetch();
});
