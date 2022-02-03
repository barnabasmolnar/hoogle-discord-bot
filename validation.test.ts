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

const itemSchema = yup.object().shape({
  docs: yup.string().required(),
  item: yup.string().required(),
  module: yup.object().shape({ name: yup.string().required() }),
  url: yup.string().url().required(),
});

export const hoogleSchema = yup.array().of(itemSchema);

export const validateSchema = (schema: yup.BaseSchema, data: unknown) =>
  schema.validate(data, { stripUnknown: true });

Deno.test("item schema strips unnecessary details", async () => {
  const validated = await validateSchema(itemSchema, zipWith);

  assertEquals(validated, zipWithStripped);
  assertNotEquals(validated, zipWith);
});

Deno.test("url is valid", () => {
  assertRejects(
    () => validateSchema(itemSchema, { ...zipWith, url: "not a valid url" }),
    yup.ValidationError,
  );
});

Deno.test("all required properties exist on object", () => {
  assertRejects(
    () => validateSchema(itemSchema, { ...zipWith, url: undefined }),
    yup.ValidationError,
    "url is a required field",
  );
});

Deno.test("hoogleSchema returns array of items with itemSchema", async () => {
  const validated = await validateSchema(hoogleSchema, mapResults);
  assertEquals(validated, mapResultsStripped);
});
