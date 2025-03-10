import { expect } from "@playwright/test";
import { AppPage } from "../abstractClasses";
import { HeaderMenu } from "../user_app_components/header_menu";
import { env } from "../../playwright.config";

export class HomePage extends AppPage {
  public pagePath = `${env.FRONTEND_URL}/`;
  public headerMenu = new HeaderMenu(this.page);
  private homePageTitle = 'Asino Casino: Welcome Package up to C$5,800 + 1,200 FS';
  private expectedUrl = 'https://asino.com/ca/';


  

  async expectLoaded() {
    await expect(this.page).toHaveTitle(this.homePageTitle);
    await expect(this.page).toHaveURL(this.expectedUrl);

  }

}
