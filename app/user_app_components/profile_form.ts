import { expect } from "@playwright/test";
import { Component } from "../abstractClasses";

export class ProfileForm extends Component {
  private profileTab = this.page.getByRole('tab', { name: 'dashboard3 My Profile' })
 private userEmailHeading = this.page.locator('.cabinet__left-side-col .playfina-user-name-display')
 

  async expectLoaded() {
    await expect(this.profileTab).toBeVisible();
  }
  async openProfileTab() {
    await this.expectLoaded();
    await this.profileTab.click();
  }
  async isCorrectUser(user) {
    const userEmail = await this.userEmailHeading.innerText();
    expect(userEmail).toBe(user.email);
    
  }

  
}
