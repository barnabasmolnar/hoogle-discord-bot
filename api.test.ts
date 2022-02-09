import { mockFetch, unMockFetch } from "https://deno.land/x/metch/mod.ts";
import {
  assertEquals,
  assertRejects,
} from "https://deno.land/std/testing/asserts.ts";
import * as yup from "https://esm.sh/yup";
import { getHoogleJSON, hoogleAPI, requestJSON } from "./api.ts";
import { mapResults, mapResultsStripped } from "./mockData.ts";

export const mockFetchHelper = async (
  requestURL: string,
  expectedJSON: unknown,
  status = 200,
  statusText = "",
) => {
  const request = new Request(requestURL);
  const expectedResponse = new Response(JSON.stringify(expectedJSON), {
    status,
    headers: { "content-type": "application/json" },
    statusText,
  });

  return await mockFetch(request, expectedResponse);
};

const testURL =
  "https://hoogle.haskell.org?mode=json&hoogle=map&start=1&count=2";

Deno.test("returns raw results from api properly", async () => {
  await mockFetchHelper(testURL, mapResults);

  const response = await requestJSON(`${hoogleAPI}=map&start=1&count=2`);

  assertEquals(response, mapResults);

  unMockFetch();
});

Deno.test("returns validated data from api", async () => {
  await mockFetchHelper(testURL, mapResultsStripped);

  const response = await getHoogleJSON("map");

  assertEquals(response, mapResultsStripped);

  unMockFetch();
});

Deno.test("rejects invalid data with validation error", async () => {
  await mockFetchHelper(testURL, [{ "this": "will fail for sure" }]);

  assertRejects(() => getHoogleJSON("map"), yup.ValidationError);

  unMockFetch();
});

Deno.test("requestJSON rejects with 400", async () => {
  await mockFetchHelper(testURL, {}, 400, "aint gonna work, son");

  assertRejects(
    () => requestJSON(`${hoogleAPI}=map&start=1&count=2`),
    Error,
    "aint gonna work, son",
  );

  unMockFetch();
});
