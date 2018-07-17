/*Ajax calls */
let Popularlist,Popularlistdat,SearchList,SearchData,CollectionHtml,PopularHtml;
const Apikey="d785263959aca38cc69b73f271297635";
const Baseurl="https://api.themoviedb.org/3/";

function ajaxcall(ApiUrl,Apikey){

    var data = $.parseJSON($.ajax({
            url: ApiUrl + "api_key="+ Apikey +"&language=en-US",
            dataType: 'json', 
            async: false
        }).responseText);
     return data["results"]   ;
}

function poplistgen(movielg,classname,datagen){
    PopularHtml=""
    for(i=0;i<movielg;i++){
        PopularHtml +="<div class='card p-4 my-flex-item'><div class='imgcls text-center'><img class='card-img-top' src='https://image.tmdb.org/t/p/w500/"+datagen[i].poster_path +"' alt='Card image cap' /><div class='card-text'><span><i class='fa fa-heart'></i></span>"+ datagen[i].title +"</div></div></div>";
    }
    document.getElementsByClassName(classname)[0].innerHTML = PopularHtml;

}
function poplistall(arrdata) {
    $("#DialogOpen").trigger("click")
    poplistgen(arrdata.length,"popbody",arrdata)
      
};




/* Popular list */
    Popularlist=ajaxcall("https://api.themoviedb.org/3/movie/popular?",Apikey);
    poplistgen(5,"cardcust",Popularlist);

/* Collection list */
    for(i=0;i<4;i++){
        CollectionHtml +="<div class='card col-12 col-md-2 ml-2'><div class='imgcls text-center'><img class='card-img-top' src='./assets/movieone.jpg' alt='Card image cap'></div><div class='card-body'>  <p class='card-text'>Lorem ipsum dolor sit amet, consectetur</p></div></div>";
    }
    CollectionHtml +="<div class='col-md-12'><button class='float-right'>Show More</button></div>"
    document.getElementsByClassName("collection")[0].innerHTML += CollectionHtml;

    document.getElementById("PopListId").addEventListener("click", poplistall.bind(this,Popularlist));
    //document.getElementById("CollViewAll").addEventListener("click", CollListAll.bind(this,CollectionList));
  
 
/* search results */
    //SearchList=ajaxcall("https://api.themoviedb.org/3/search/movie?query="+SearchData+"&page=1&include_adult=false",Apikey);






