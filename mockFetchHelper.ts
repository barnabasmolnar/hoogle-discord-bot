import { mockFetch } from "./deps.ts";

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
