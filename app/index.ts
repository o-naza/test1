import { PageHolder } from "./abstractClasses";
import { API } from "../api/api";
import { HomePage } from "./user_app_pages/HomePage";




export class WebApp extends PageHolder {
  public api = new API(this.page.request);
  public homePage = new HomePage(this.page);
}