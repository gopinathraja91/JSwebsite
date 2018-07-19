const _var = require('./variables.js');
import {DelCollecList,Addcollection,SearchListFun,poplistall,poplistgen,AjaxDelete,AjaxPost,ajaxcall,ImageInfo} from "./functions.js"
/* Popular list */

    _var.Popularlist=ajaxcall(_var.Baseurl +"movie/popular?",_var.Apikey,"Json");
    poplistgen(5,"cardcust",_var.Popularlist,"NOdelete","");

/* Collection list */
    let CollectionList=ajaxcall(_var.BaseServerUrl+"?",_var.Apikey,"Array")
    let colleng=(CollectionList.length>4)?5:CollectionList.length;
    poplistgen(colleng,"collection",CollectionList,"NOdelete","");

/*Button Click Event Listeners */
    document.getElementById("PopListId").addEventListener("click", poplistall.bind(this,_var.Popularlist,"NOdelete","Popular Lists"));    
    document.getElementById("searchbtn").addEventListener("click", SearchListFun);
    document.getElementById("AddCollec").addEventListener("click", Addcollection);
    document.getElementById("ViewCollec").addEventListener("click", poplistall.bind(this,CollectionList,"delete","Collection Lists"));
    document.getElementById("DelCollec").addEventListener("click", DelCollecList);


    $(".imgcls").click(function(){


        var selector=$(this).attr("id");
        $("#DialogOpen").trigger("click")
        let PopularHtml="";
        let filterObj = _var.Popularlist.filter(function(e) {
            return selector.toString() == e.id.toString();
         }); 

         if(filterObj.length==0){
               filterObj = CollectionList.filter(function(e) {
                     return selector.toString() == e.id.toString();
                }); 
         }
        PopularHtml +=`<div class='card p-2 ml-2'><div class="row"><div class="col-md-6 float-left"><div class='imgcls text-center' id='${filterObj[0].id}' ><img class='card-img-top' src='https://image.tmdb.org/t/p/w500/${filterObj[0].poster_path}' alt='Card image cap' /><p><span class="r-corner">2D</span><span class="r-corner">3D</span></p></div></div><div class="col-md-6"><h3>Movie Overview</h3><div class='card-text'><span><i class='fa fa-heart'></i></span><span>&nbsp${filterObj[0].vote_average * 10}% &nbsp&nbsp</span><span>Votes: ${filterObj[0].vote_count}</span><span>&nbsp 4.3<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></span></div><p>${filterObj[0].overview}</p><p>Release Date: ${filterObj[0].release_date}</p></div></div>`;
        document.getElementsByClassName("popbody")[0].innerHTML = PopularHtml; 
        $(".modal-title").html("Movie Info") ; 
        $("#DelCollec").css("display","none");  
        //$(".modal-footer").html("<button type='button' class='btn btn-danger' data-dismiss='modal'>Book now</button><button type='button' class='btn btn-danger' data-dismiss='modal'>Close</button>") ;  

    })
    
 






