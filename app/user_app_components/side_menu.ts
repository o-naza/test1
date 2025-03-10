import { expect } from "@playwright/test";
import { Component } from "../abstractClasses";

import { ProfileForm } from './profile_form';

export class SideMenu extends Component {

  public profileForm = new ProfileForm(this.page);
  private depositBtn = this.page.getByRole('link', { name: 'Deposit' })
  private profileBtn  = this.page.getByRole('link', { name: 'My Profile' })

  async expectLoaded() {
    await expect(this.profileBtn).toBeVisible();
    await expect(this.depositBtn).toBeVisible();

  }

  async openProfileForm() {
    await this.expectLoaded();
    await this.profileBtn.click();
  }
  
}
