const _var = require('../js/variables.js');

function ajaxcall(ApiUrl,Apikey,DataType,DataArr,Datastate){

   
    switch(Datastate){   
     
         case "GetDate":
        
             var data = $.parseJSON($.ajax({
                     url: ApiUrl + "api_key="+ Apikey +"&language=en-US",
                     dataType: 'json', 
                     async: false
                 }).responseText);
             console.log(data)
             if(DataType=="Json"){ 
                 console.log(data["results"])
                 return data["results"];
             }else{
                 return data;
             }
             break;
 
 
         // post data to local server
         case "SaveData":
             for( let i=0;i<DataArr.length;i++){
                 $.post(_var.BaseServerUrl,
                     DataArr[i],
                 function(data, status){
                     console.log("Files added to the database");
                 });
             }
             window.location.reload(true);
             break;
            
 
 
         // delete data from local server
         case "deleteDate":
             for( let i=0;i<DataArr.length;i++){
                 console.log(DataArr[i].id);
                     $.ajax({
                     url: _var.BaseServerUrl+"/"+DataArr[i].id,
                     type: 'DELETE',
                     success: function(response) {
                     console.log("Files deleted from database")
                     }
                 });
             }
            window.location.reload(true);
 
     }
      
 }


 export { ajaxcall }
 