import { poplistgen } from "../render/renderpage.js"



function poplistall(arrdata,delbtnstatus,headcont) {
  
    $("#DialogOpen").trigger("click");
    poplistgen(arrdata.length,"popbody",arrdata,delbtnstatus,headcont);
    
};

export { poplistall }