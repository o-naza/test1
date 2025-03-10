export async function handleResponse(resp: any, expectedStatusCode: number) {
  const status = resp.status();
  const responseBody = await resp.text();
  if (status !== expectedStatusCode||responseBody.success == false||responseBody.errors) {
    throw new Error(`Unexpected response status: ${status} | Expected: ${expectedStatusCode} | Error response body: ${responseBody}`);
  }
  return await resp.json();
}
