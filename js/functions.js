const _var = require('./variables.js');

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
   
    for(let i=0;i<data.length;i++){
        $.post(_var.BaseServerUrl,
        data[i],
        function(data, status){
            console.log("Data: " + data + "\nStatus: " + status);
        });
    }
    window.location.reload(true);

}

function AjaxDelete(URL,data){

    for(let i=0;i<data.length;i++){
        console.log(data[i].id);
            $.ajax({
            url: _var.BaseServerUrl+data[i].id,
            type: 'DELETE',
            success: function(response) {
             
            }
         });
    }
    window.location.reload(true);

}




function poplistgen(movielg,classname,datagen,delbtnsta,headcont){
              
        let PopularHtml="";
        for(let i=0;i<movielg;i++){
            PopularHtml +=`<div class='card p-2 ml-2 my-flex-item'><div class='round'><input type='checkbox' id='${classname + i}' name='${datagen[i].id}' /><label for='${classname + i}' ></label></div><div class='imgcls text-center' id='${datagen[i].id}' ><img class='card-img-top' src='https://image.tmdb.org/t/p/w500/${datagen[i].poster_path}' alt='Card image cap' /><div class='card-text'><span><i class='fa fa-heart'></i></span><span>&nbsp${datagen[i].vote_average * 10}% &nbsp&nbsp</span><span>${datagen[i].title}</span></div></div></div>`;
        }
        document.getElementsByClassName(classname)[0].innerHTML = PopularHtml;        
        _var.PopAllTimedata=datagen;
        if(delbtnsta=="delete"){
            $("#DelCollec").css("display","block");
            $("#AddCollec").css("display","none");
            
        }else{
            $("#DelCollec").css("display","none"); 
            $("#AddCollec").css("display","block");           
        }
        $(".modal-title").html(headcont);
        ImageInfo()

}


function poplistall(arrdata,delbtnstatus,headcont) {

        $("#DialogOpen").trigger("click")
        poplistgen(arrdata.length,"popbody",arrdata,delbtnstatus,headcont)
        
};

function SearchListFun() {

        let searcval=$("[aria-label='Search']").val()
        SearchListdata=ajaxcall(_var.Baseurl+"search/movie?query="+searcval+"&page=1&include_adult=false&",_var.Apikey,"Json");
        $("#DialogOpen").trigger("click")
        poplistgen(SearchListdata.length,"popbody",SearchListdata,"NOdelete","Search Results")

};

function Addcollection(){
       
        let selected = [];
        $('.popbody input:checked').each(function() {
            selected.push($(this).attr('name'));
        });       
        let filterObj = _var.PopAllTimedata.filter(function(e) {
                return selected.includes(e.id.toString());
        });       
        
        AjaxPost(_var.BaseServerUrl,filterObj); 

}

function DelCollecList(){

    let selected = [];
    $('.popbody input:checked').each(function() {
        selected.push($(this).attr('name'));
    });   
    let filterObj = _var.PopAllTimedata.filter(function(e) {
            return selected.includes(e.id.toString());
    }); 

    AjaxDelete(_var.BaseServerUrl,filterObj);

}

function ImageInfo(){

    $(".imgcls").click(function(){


        var selector=$(this).attr("id");
        $("#DialogOpen").trigger("click")
        let PopularHtml="";
        let filterObj = _var.Popularlist.filter(function(e) {
            return selector.toString() == e.id.toString();
        }); 

        if(filterObj.length==0){
            filterObj = _var.CollectionList.filter(function(e) {
                    return selector.toString() == e.id.toString();
                }); 
        }
        PopularHtml +=`<div class='card p-2 ml-2'><div class="row"><div class="col-md-6 float-left"><div class='imgcls text-center' id='${filterObj[0].id}' ><img class='card-img-top' src='https://image.tmdb.org/t/p/w500/${filterObj[0].poster_path}' alt='Card image cap' /><p><span class="r-corner">2D</span><span class="r-corner">3D</span></p></div></div><div class="col-md-6"><h3>Movie Overview</h3><div class='card-text'><span><i class='fa fa-heart'></i></span><span>&nbsp${filterObj[0].vote_average * 10}% &nbsp&nbsp</span><span>Votes: ${filterObj[0].vote_count}</span><span>&nbsp 4.3<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></span></div><p>${filterObj[0].overview}</p><p>Release Date: ${filterObj[0].release_date}</p></div></div>`;
        document.getElementsByClassName("popbody")[0].innerHTML = PopularHtml; 
        $(".modal-title").html("Movie Info") ; 
        $("#DelCollec").css("display","none");  
        //$(".modal-footer").html("<button type='button' class='btn btn-danger' data-dismiss='modal'>Book now</button><button type='button' class='btn btn-danger' data-dismiss='modal'>Close</button>") ;  

    })

}



export {DelCollecList,Addcollection,SearchListFun,poplistall,poplistgen,AjaxDelete,AjaxPost,ajaxcall,ImageInfo}