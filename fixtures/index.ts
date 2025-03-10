import { test as base } from "@playwright/test";
import { WebApp } from "../app";
import { user } from "../test-data/test-user";


export const test = base.extend<{ logs: any }>({
  logs: async ({ page }, use) => {
    let consoleLogs: string[] = [];
    let networkLogs: string[] = [];
    // Capture console messages
    page.on("console", (msg) => {
      consoleLogs.push(`[${msg.type()}] ${msg.text()}`);
    });

    // Capture network requests
    page.on("request", (request) => {
      networkLogs.push(`Request: ${request.method()} ${request.url()}`);
    });

    // Capture network responses
    page.on("response", (response) => {
      networkLogs.push(`Response: ${response.status()} ${response.url()}`);
    });
    await use({ consoleLogs, networkLogs });
    test.info().attach("console-logs", {
      body: consoleLogs.join("\n"),
      contentType: "text/plain",
    });
    test.info().attach("network-logs", {
      body: networkLogs.join("\n"),
      contentType: "text/plain",
    });
  },
});

export const application = test.extend<{
  app: WebApp;
}>({
  app: async ({ page }, use) => {
    const app = new WebApp(page);
    await use(app);
  },
});

export const newUserLogin = application.extend<{
  newUser: any;
}>({
  newUser: async ({ app,page }, use) => {
    const createdUserResponse = await app.api.auth.registerNewUser(user);
    console.log(createdUserResponse);
    const setCookieHeader = createdUserResponse.headers()['set-cookie'];
    
    if (!setCookieHeader) {
        throw new Error('Set-Cookie header not found in API response');
    }

    // Extract the _casino_session cookie from the header
    const match = setCookieHeader.match(/_casino_session=([^;]+)/);
    
    if (!match) {
        throw new Error('_casino_session cookie not found in Set-Cookie header');
    }

    const sessionCookie = match[1];

    // Set the extracted cookie in Playwright's context
    const token = [
        {
            name: '_casino_session',
            value: sessionCookie,
            domain: '.asino.com', 
            path: '/',
            secure: true,
            httpOnly: true,
            sameSite: 'None',
        },
    ]
    await page.context().addCookies(token);
    await use(token);

  },
});
