import * as yup from "https://esm.sh/yup";
import {
  assertEquals,
  assertNotEquals,
  assertRejects,
} from "https://deno.land/std/testing/asserts.ts";
import {
  mapResults,
  mapResultsStripped,
  zipWith,
  zipWithStripped,
} from "./mockData.ts";
import { hoogleSchema, itemSchema, validateSchema } from "./validation.ts";

Deno.test("Validation", async (t) => {
  await t.step("validateSchema strips unnecessary details", async () => {
    const validated = await validateSchema(itemSchema, zipWith);
    assertEquals(validated, zipWithStripped);
    assertNotEquals(validated, zipWith);
  });

  await t.step("url is valid", () => {
    assertRejects(
      () => validateSchema(itemSchema, { ...zipWith, url: "not a valid url" }),
      yup.ValidationError,
    );
  });

  await t.step("all required properties exist on object", () => {
    assertRejects(
      () => validateSchema(itemSchema, { ...zipWith, url: undefined }),
      yup.ValidationError,
      "url is a required field",
    );
  });

  await t.step(
    "hoogleSchema returns array of items with itemSchema",
    async () => {
      const validated = await validateSchema(hoogleSchema, mapResults);
      assertEquals(validated, mapResultsStripped);
    },
  );

  await t.step("hoogleSchema should throw on []", () => {
    assertRejects(
      () => validateSchema(hoogleSchema, []),
      yup.ValidationError,
    );
  });
});
