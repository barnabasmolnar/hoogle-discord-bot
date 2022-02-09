import { json } from "https://deno.land/x/sift@0.4.3/mod.ts";
import { getHoogleJSON } from "./api.ts";
import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";
import * as yup from "https://esm.sh/yup";
import { cleanText } from "./utils.ts";

export const ERROR_MSG = {
  validation:
    "Validation error. The response from hoogle could not be parsed. The function you're looking for most likely does not exist in hoogle's database. If you believe this to be false, please contact the creator of the bot.",
  client: "Client error. Please contact the creator of the bot.",
  server: "Server error. The hoogle API may be down. Try again a bit later.",
};

const handleError = (error: Error) => {
  switch (true) {
    case error instanceof yup.ValidationError:
      return ERROR_MSG.validation;
    case error.cause?.status === 400:
      return ERROR_MSG.client;
    case error.cause?.status === 500:
      return ERROR_MSG.server;
    default:
      return "Unkown error.";
  }
};

export const prepareBotResponse = async (value: string) => {
  try {
    const apiResponse = await getHoogleJSON(value);
    const rawStr = cleanText(apiResponse[0].docs);

    const { textContent: content } = new DOMParser().parseFromString(
      rawStr,
      "text/html",
    )!;

    // Type 4 responds with the below message retaining the user's
    // input at the top.
    return json({ type: 4, data: { content } });
  } catch (error) {
    const errorMsg = handleError(error);

    return json({ type: 4, data: { content: errorMsg } });
  }
};
