
import { expect } from "@playwright/test";
import { Component } from "../abstractClasses";
import { RegistrationForm } from "./registration_form";
import { SideMenu } from "./side_menu";

export class HeaderMenu extends Component {
  public registrationForm = new RegistrationForm(this.page);
  public sideMenu = new SideMenu(this.page);
  private sideMenuBtn = this.page.getByRole("button", { name: "Aside menu" });
  private logo = this.page.locator("#main-header picture img");
  private loginBtn = this.page.locator("#main-header").getByRole("button", { name: "Login" });
  private singUpBtn = this.page.locator("#main-header").getByRole("button", { name: "Sign Up" });

  async expectLoaded() {
    await expect(this.sideMenuBtn).toBeVisible();
    await expect(this.logo).toBeVisible();
  }

  async openRegistrationForm() {
    await this.expectLoaded();
    await this.singUpBtn.click();
  }
  async openSideMenu() {
    await this.expectLoaded();
    await this.sideMenuBtn.click();
  }
}
