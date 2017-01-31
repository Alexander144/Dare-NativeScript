import TempModel from "./TempPage-model";
import { Page } from "ui/page";
import { EventData } from "data/observable";
import { Observable} from "data/observable";

var model = new TempModel();


var PageLoaded = (args: EventData) => {
   var page = <Page>args.object;
   page.bindingContext = model;
}
export { PageLoaded };