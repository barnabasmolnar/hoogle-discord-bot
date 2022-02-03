import { mockFetch, unMockFetch } from "https://deno.land/x/metch/mod.ts";
import {
  assertEquals,
  assertRejects,
} from "https://deno.land/std/testing/asserts.ts";
import * as yup from "https://esm.sh/yup";
import { hoogleSchema, validateSchema } from "./validation.test.ts";
import { mapResults, mapResultsStripped } from "./mockData.ts";

const noValidation = yup
  .mixed()
  .test("no-validation", "no validation", () => true);

const requestJSON = async (
  resource: string,
  schema = noValidation,
  options?: RequestInit,
) => {
  const r = await fetch(resource, options);
  if (!r.ok) {
    throw new Error(r.statusText, {
      cause: {
        status: r.status,
        message: r.statusText,
      },
    });
  }
  const json = await r.json();
  return await validateSchema(schema, json);
};

const hoogleAPI = "https://hoogle.haskell.org?mode=json&hoogle";

const getHoogleJSON = (searchTerm: string, hoogleOptions = "start=1&count=2") =>
  requestJSON(`${hoogleAPI}=${searchTerm}&${hoogleOptions}`, hoogleSchema);

const mockFetchHelper = async (
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

Deno.test("returns raw results from api properly", async () => {
  await mockFetchHelper(
    "https://hoogle.haskell.org?mode=json&hoogle=map&start=1&count=2",
    mapResults,
  );

  const response = await requestJSON(`${hoogleAPI}=map&start=1&count=2`);

  assertEquals(response, mapResults);

  unMockFetch();
});

Deno.test("returns validated data from api", async () => {
  await mockFetchHelper(
    "https://hoogle.haskell.org?mode=json&hoogle=map&start=1&count=2",
    mapResultsStripped,
  );

  const response = await getHoogleJSON("map");

  assertEquals(response, mapResultsStripped);

  unMockFetch();
});

Deno.test("rejects invalid data with validation error", async () => {
  await mockFetchHelper(
    "https://hoogle.haskell.org?mode=json&hoogle=map&start=1&count=2",
    [{ "this": "will fail for sure" }],
  );

  assertRejects(() => getHoogleJSON("map"), yup.ValidationError);

  unMockFetch();
});

Deno.test("requestJSON rejects with 400", async () => {
  await mockFetchHelper(
    "https://hoogle.haskell.org?mode=json&hoogle=map&start=1&count=2",
    {},
    400,
    "aint gonna work, son",
  );

  assertRejects(
    () => requestJSON(`${hoogleAPI}=map&start=1&count=2`),
    Error,
    "aint gonna work, son",
  );

  unMockFetch();
});
