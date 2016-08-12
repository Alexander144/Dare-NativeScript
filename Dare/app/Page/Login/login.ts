import LoginModel from "./login-model";
import { Page } from "ui/page";
import { EventData } from "data/observable";
import { Observable} from "data/observable";

var model = new LoginModel();


var PageLoaded = (args: EventData) => {
   var page = <Page>args.object;
   page.bindingContext = model;
}
export { PageLoaded };