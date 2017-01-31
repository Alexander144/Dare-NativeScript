import MainModel from "./Friends-model";
import { Page } from "ui/page";
import { EventData } from "data/observable";
import { Observable} from "data/observable";

var model = new MainModel();

var PageLoaded = (args: EventData) => {
    //Henter siden
   var page = <Page>args.object;
   //binder variablene sammen
   page.bindingContext = model;
   
   //Henter data som har blitt sendt til siden
   var data = page.navigationContext;
   //Setter metoden fordi constructoren kjøres før jeg får satt verdien
    model.SetApplication(data.Username);
   
}
export { PageLoaded };