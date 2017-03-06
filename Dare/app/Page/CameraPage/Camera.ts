import CameraModel from "./Camera-model";
import { Page } from "ui/page";
import { EventData } from "data/observable";
import { Observable} from "data/observable";

var model = new CameraModel();


var PageLoaded = (args: EventData) => {
   var page = <Page>args.object;
   page.bindingContext = model;
     //Henter data som har blitt sendt til siden
   var data = page.navigationContext;
   //Setter metoden fordi constructoren kjøres før jeg får satt verdien
    model.SetApplication(data.DareToAccept);
}
export { PageLoaded };