import { RequestHolder } from "./requestHolder";
import { env } from "../playwright.config";
import { handleResponse } from "./responseHandler";

export class AuthController extends RequestHolder {
  async registerNewUser(user) {
    const resp = await this.request.post(`${env.API_URL}/ca/register`, {
      headers: {
        accept: "application/json, text/plain, */*",
        "content-type": "application/json;charset=UTF-8",
      },
      data: {
        email: user.email,
        password: user.password,
        country: "CA",
        currency: "CAD",
        bonus_code: "",
        terms_and_conditions: "on",
        time_zone: "Europe/Kiev",
      },
    });

    await handleResponse(resp, 200) 
    return resp
  }
}
