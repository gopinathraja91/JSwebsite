import { poplistgen } from "../render/renderpage.js"
import { store} from "../ReduxStore/redxstore"


function poplistall(arrdata,delbtnstatus,headcont) {
    console.log("popupdata")
    console.log(arrdata)
    $("#DialogOpen").trigger("click");
    poplistgen(arrdata.length,"popbody",arrdata,delbtnstatus,headcont);
    
};

export { poplistall }