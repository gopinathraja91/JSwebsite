/*Ajax calls */
let Popularlist,Popularlistdat,SearchData,CollectionHtml,PopularHtml,PopAllTimedata;
const Apikey="d785263959aca38cc69b73f271297635";
const Baseurl="https://api.themoviedb.org/3/";
const BaseServerUrl="http://localhost:3000/products";

function ajaxcall(ApiUrl,Apikey,DataType){

    var data = $.parseJSON($.ajax({
            url: ApiUrl + "api_key="+ Apikey +"&language=en-US",
            dataType: 'json', 
            async: false
        }).responseText);
    
    if(DataType=="Json"){ 
        return data["results"];
    }else{
        return data;
    }
     
}


function AjaxPost(URL,data){
    for(i=0;i<data.length;i++){
        $.post("http://localhost:3000/products",
        data[i],
        function(data, status){
            alert("Data: " + data + "\nStatus: " + status);
        });
    }

}

function AjaxDelete(URL,data){
    for(i=0;i<data.length;i++){
        console.log(data[i].id);
            $.ajax({
            url: "http://localhost:3000/products/"+data[i].id,
            type: 'DELETE',
            success: function(response) {
             
            }
         });
    }

}




function poplistgen(movielg,classname,datagen,delbtnsta,headcont){
              
        PopularHtml="";
        for(i=0;i<movielg;i++){
            PopularHtml +=`<div class='card p-2 ml-2 my-flex-item'><div class='round'><input type='checkbox' id='${classname + i}' name='${datagen[i].id}' /><label for='${classname + i}' ></label></div><div class='imgcls text-center'><img class='card-img-top' src='https://image.tmdb.org/t/p/w500/${datagen[i].poster_path}' alt='Card image cap' /><div class='card-text'><span><i class='fa fa-heart'></i></span><span>&nbsp${datagen[i].vote_average * 10}% &nbsp&nbsp</span><span>${datagen[i].title}</span></div></div></div>`;
        }
        document.getElementsByClassName(classname)[0].innerHTML = PopularHtml;        
        PopAllTimedata=datagen;
        if(delbtnsta=="delete"){
            $("#DelCollec").css("display","block");
            $("#AddCollec").css("display","none");
            
        }else{
            $("#DelCollec").css("display","none"); 
            $("#AddCollec").css("display","block");           
        }
        $(".modal-title").html(headcont)
}


function poplistall(arrdata,delbtnstatus,headcont) {

        $("#DialogOpen").trigger("click")
        poplistgen(arrdata.length,"popbody",arrdata,delbtnstatus,headcont)
        
};

function SearchListFun() {

        let searcval=$("[aria-label='Search']").val()
        SearchListdata=ajaxcall("https://api.themoviedb.org/3/search/movie?query="+searcval+"&page=1&include_adult=false&",Apikey,"Json");
        $("#DialogOpen").trigger("click")
        poplistgen(SearchListdata.length,"popbody",SearchListdata,"NOdelete","Search Results")

};

function Addcollection(){
       
        let selected = [];
        $('.popbody input:checked').each(function() {
            selected.push($(this).attr('name'));
        });       
        let filterObj = PopAllTimedata.filter(function(e) {
                return selected.includes(e.id.toString());
        });       
        
        AjaxPost(BaseServerUrl,filterObj);        
}

function DelCollecList(){

    let selected = [];
    $('.popbody input:checked').each(function() {
        selected.push($(this).attr('name'));
    });   
    let filterObj = PopAllTimedata.filter(function(e) {
            return selected.includes(e.id.toString());
    }); 

    AjaxDelete(BaseServerUrl,filterObj);
}




/* Popular list */

    Popularlist=ajaxcall("https://api.themoviedb.org/3/movie/popular?",Apikey,"Json");
    poplistgen(5,"cardcust",Popularlist,"NOdelete","");

/* Collection list */
    CollectionList=ajaxcall("http://localhost:3000/products?",Apikey,"Array")
    colleng=(CollectionList.length>4)?4:CollectionList.length;
    poplistgen(CollectionList.length,"collection",CollectionList,"NOdelete","");

/*Button Click Event Listeners */
    document.getElementById("PopListId").addEventListener("click", poplistall.bind(this,Popularlist,"NOdelete","Popular Lists"));    
    document.getElementById("searchbtn").addEventListener("click", SearchListFun);
    document.getElementById("AddCollec").addEventListener("click", Addcollection);
    document.getElementById("ViewCollec").addEventListener("click", poplistall.bind(this,CollectionList,"delete","Collection Lists"));
    document.getElementById("DelCollec").addEventListener("click", DelCollecList);
    
 






