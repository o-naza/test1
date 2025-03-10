import { expect } from "@playwright/test";
import { Component } from "../abstractClasses";

export class RegistrationForm extends Component {
  private emailField = this.page.getByRole("textbox", { name: "Email" });
  private passwordField = this.page.getByRole("textbox", { name: "Password" });
  private currencySelector = this.page.locator("#register-currency-select");
  private contrySelector = this.page.locator("#register-country-select");
  private eighteenYearCheckbox = this.page.locator("label").filter({ hasText: "I am 18 years old and I" }).locator("span");
  private marketingCheckbox = this.page.locator("label").filter({ hasText: "I agree to receive marketing" }).locator("span");
  private registerBtn = this.page.getByRole("button", { name: "Create Account" });

  async expectLoaded() {
    await expect(this.emailField).toBeVisible();
    await expect(this.passwordField).toBeVisible();
    await expect(this.currencySelector).toBeVisible();
    await expect(this.contrySelector).toBeVisible();
    await expect(this.eighteenYearCheckbox).toBeVisible();
    await expect(this.marketingCheckbox).toBeVisible();
    await expect(this.registerBtn).toBeVisible();
  }
  async fillUserData(user) {
    await this.emailField.fill(user.email);
    await this.passwordField.fill(user.password);
  }
  async checkContry() {
    const selectedValue = await this.contrySelector.inputValue();
    expect(selectedValue).toBe("CA");
  }
  async checkCurrency() {
    const selectedValue = await this.currencySelector.inputValue();
    expect(selectedValue).toBe("CAD");
  }
  async eighteenYearsAgreement(checkbox) {
    const isChecked = await this.eighteenYearCheckbox.isChecked();
    if (checkbox && !isChecked) {
      await this.eighteenYearCheckbox.click();
      await expect(this.eighteenYearCheckbox).toBeChecked();
    } else if (!checkbox && isChecked) {
      await this.eighteenYearCheckbox.click();
      await expect(this.eighteenYearCheckbox).not.toBeChecked();
    }
  }
  async marketingAgreement(checkbox) {
    const isChecked = await this.marketingCheckbox.isChecked();
    if (checkbox && !isChecked) {
      await this.marketingCheckbox.click();
      await expect(this.marketingCheckbox).toBeChecked();
    } else if (!checkbox && isChecked) {
      await this.marketingCheckbox.click();
      await expect(this.marketingCheckbox).not.toBeChecked();
    }
  }
  async createUserAccountBtn() {
    await this.registerBtn.click();
    await expect(this.registerBtn).toBeHidden({timeout: 10000});
  }
}
