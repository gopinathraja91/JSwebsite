const _var = require('../js/variables.js');
import { ajaxcall } from "../services/ajaxservice.js";

function Addcollection(){
    console.log("add collection")
     let selected = [];
     $('.popbody input:checked').each(function() {
         selected.push($(this).attr('name'));
     });       
     let filterObj = _var.PopAllTimedata.filter(function(e) {
             return selected.includes(e.id.toString());
     });     
     console.log("function add call ")  
     ajaxcall(_var.BaseServerUrl,_var.Apikey,"DataType",filterObj,"SaveData")

}

function DelCollecList(){

 let selected = [];
 $('.popbody input:checked').each(function() {
     selected.push($(this).attr('name'));
 });   
 let filterObj = _var.PopAllTimedata.filter(function(e) {
         return selected.includes(e.id.toString());
 }); 
 console.log("function delete call ")
 ajaxcall(_var.BaseServerUrl,_var.Apikey,"DataType",filterObj,"deleteDate")

}



export { Addcollection,DelCollecList }