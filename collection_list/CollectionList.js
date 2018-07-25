const _var = require('../js/variables.js');
import { ajaxcall } from "../services/ajaxservice.js";
import { store} from "../ReduxStore/redxstore"

function Addcollection(){

     let statedata=store.getState();
     let selected = [];
     $('.popbody input:checked').each(function() {
         selected.push($(this).attr('name'));
     });       
     let filterObj = statedata.PopupData.filter(function(e) {
             return selected.includes(e.id.toString());
     });     

     ajaxcall(_var.BaseServerUrl,_var.Apikey,"DataType",filterObj,"SaveData");
     console.log("function add call ")  
     store.dispatch({type: "Update CollecList",collecList:filterObj});

}

function DelCollecList(){

 let selected = [];
 let statedata=store.getState();
 $('.popbody input:checked').each(function() {
     selected.push($(this).attr('name'));
 });   
 let filterObj = statedata.PopupData.filter(function(e) {
         return selected.includes(e.id.toString());
 }); 
 //console.log(statedata)
 ajaxcall(_var.BaseServerUrl,_var.Apikey,"DataType",filterObj,"deleteDate") 
 store.dispatch({type: "Delete CollecList",collecList:filterObj});

}



export { Addcollection,DelCollecList }