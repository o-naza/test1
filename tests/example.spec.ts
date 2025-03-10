import { ProfileForm } from "./../app/user_app_components/profile_form";
import { createUser } from "./../test-data/test-user";
import { newUserLogin, test } from "../fixtures";
import { expect } from "@playwright/test";
import { WebApp } from "../app";

test("User can register a new acount", async ({ page, logs }) => {
  const app = new WebApp(page);
  await app.homePage.open();
  await app.homePage.headerMenu.openRegistrationForm();
  await app.homePage.headerMenu.registrationForm.fillUserData(createUser());
  await app.homePage.headerMenu.registrationForm.checkContry();
  await app.homePage.headerMenu.registrationForm.checkCurrency();
  await app.homePage.headerMenu.registrationForm.eighteenYearsAgreement(true);
  await app.homePage.headerMenu.registrationForm.marketingAgreement(false);
  await app.homePage.headerMenu.registrationForm.createUserAccountBtn();
  await app.homePage.headerMenu.openSideMenu();
  await app.homePage.headerMenu.sideMenu.openProfileForm();
  await app.homePage.headerMenu.sideMenu.profileForm.isCorrectUser(createUser());
});

newUserLogin("New user can edit profile settings", async ({ page, logs, newUser, app }) => {
  const user = createUser();
  await app.homePage.open();
  await app.homePage.headerMenu.openSideMenu();
  await app.homePage.headerMenu.sideMenu.openProfileForm();
  await page.getByRole("tab", { name: "dashboard3 My Profile" }).click();
  await page.getByRole("tabpanel", { name: "Profile" }).locator('input[name="first_name"]').fill(user.firstName);
  await page.getByRole("tabpanel", { name: "Profile" }).locator('input[name="last_name"]').fill(user.lastName);
  await page.getByRole("textbox", { name: "dd.mm.yyyy" }).fill(user.birthDate);
  await page.locator("#playfina-cabinet__profile-input--gender").selectOption(user.gender);
  await page.getByRole("tabpanel", { name: "Profile" }).locator('input[name="city"]').fill(user.city);
  await page.getByRole("tabpanel", { name: "Profile" }).locator('input[name="address"]').fill(user.address);
  await page.getByRole("tabpanel", { name: "Profile" }).locator('input[name="postal_code"]').fill(user.postalCode);
  await page.getByRole("button", { name: "Save" }).click();
  await page.goto("https://asino.com/ca/");
  await page.getByRole("button", { name: "Aside menu" }).click();
  await page.getByRole("link", { name: "My Profile" }).click();
  await page.getByRole("tab", { name: "dashboard3 My Profile" }).click();
  await expect(page.getByRole("tabpanel", { name: "Profile" }).locator('input[name="first_name"]')).toHaveValue(user.firstName);
  await expect(page.getByRole("tabpanel", { name: "Profile" }).locator('input[name="last_name"]')).toHaveValue(user.lastName);
  await expect(page.getByRole("textbox", { name: "dd.mm.yyyy" })).toHaveValue(user.birthDate);
  await expect(page.locator("#playfina-cabinet__profile-input--gender")).toHaveValue(user.gender);
  await expect(page.getByRole("tabpanel", { name: "Profile" }).locator('input[name="city"]')).toHaveValue(user.city);
  await expect(page.getByRole("tabpanel", { name: "Profile" }).locator('input[name="address"]')).toHaveValue(user.address);
  await expect(page.getByRole("tabpanel", { name: "Profile" }).locator('input[name="postal_code"]')).toHaveValue(user.postalCode);
});


newUserLogin("Logged in user can log out", async ({ page, logs, newUser, app }) => {
  await app.homePage.open();
  await app.homePage.headerMenu.openSideMenu();
  await expect(page.getByRole('link', { name: 'Sign Out' })).toBeVisible();
  await page.getByRole('link', { name: 'Sign Out' }).click();
  await expect(page.locator('#main-header').getByRole('button', { name: 'Sign Up' })).toBeVisible();
  await expect(page.locator('#main-header').getByRole('button', { name: 'Login' })).toBeVisible();

});