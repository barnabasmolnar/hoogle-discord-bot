import { yup } from "./deps.ts";
import { hoogleSchema, validateSchema } from "./validation.ts";

const noValidation = yup
  .mixed()
  .test("no-validation", "no validation", () => true);

export const requestJSON = async (
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

export const hoogleAPI = "https://hoogle.haskell.org?mode=json&hoogle";

export const getHoogleJSON = (
  searchTerm: string,
  hoogleOptions = "start=1&count=2",
) => requestJSON(`${hoogleAPI}=${searchTerm}&${hoogleOptions}`, hoogleSchema);
