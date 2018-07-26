const _var = require('../variables.js');
import { ajaxcall } from "../services/ajaxservice.js";
import { poplistall } from "../popupdata/popupcont.js";
import { Addcollection,DelCollecList } from "../collection_list/CollectionList.js";
import { store} from "../ReduxStore/redxstore";

function poplistgen(movielg,classname,datagen,delbtnsta,headcont){

    let PopularHtml="";
    for(let i=0;i<movielg;i++){
        PopularHtml +=`<div class='col-sm-3 col-md-2'><div class='round'><input type='checkbox' id='${classname + i}' name='${datagen[i].id}' /><label for='${classname + i}' ></label></div><div class='imgcls' id='${datagen[i].id}' ><img class='card-img-top' src='https://image.tmdb.org/t/p/w500/${datagen[i].poster_path}' alt='Card image cap' /><div class='card-text'><span><i class='fa fa-heart'></i></span><span>&nbsp${datagen[i].vote_average * 10}% &nbsp&nbsp</span><span>${datagen[i].title}</span></div></div></div>`;
    }
    document.getElementsByClassName(classname)[0].innerHTML = PopularHtml; 
    store.dispatch({type: "Update Popupdata",PopupData:datagen});       
    
    if(delbtnsta=="delete"){
        $("#DelCollec").css("display","block");
        $("#AddCollec").css("display","none");
        
    }else{
        $("#DelCollec").css("display","none"); 
        $("#AddCollec").css("display","block");           
    }
    $(".modal-title").html(headcont);   

}



/* Popular list */

function PopularList_Render(){

    let Popularfetchdata=ajaxcall(_var.Baseurl +"movie/popular?",_var.Apikey,"Json","","GetDate");
    store.dispatch({type: "Create PopularList",popularList:Popularfetchdata});
    
}

/* Collection list */
function CollectionList_Render(){
        let CollectionList=ajaxcall(_var.BaseServerUrl+"?",_var.Apikey,"Array","","GetDate"); 
        store.dispatch({type: "Create CollecList",collecList:CollectionList});
}

function SearchListFun() {

    let searcval=$("[aria-label='Search']").val();
    let SearchListdata=ajaxcall(`${_var.Baseurl}search/movie?query=${searcval}&page=1&include_adult=false&`,_var.Apikey,"Json","","GetDate");
    store.dispatch({type: "Search Component",SearchList:SearchListdata});
     $("#DialogOpen").trigger("click");
    

};

/*Button Click Event Listeners */
function Button_events(){

    document.getElementById("PopListId").addEventListener("click", poplistall.bind(this,"NOdelete","Popular Lists"));    
    document.getElementById("searchbtn").addEventListener("click", SearchListFun);
    document.getElementById("AddCollec").addEventListener("click", Addcollection);
    document.getElementById("ViewCollec").addEventListener("click", poplistall.bind(this,"delete","Collection Lists"));
    document.getElementById("DelCollec").addEventListener("click", DelCollecList);
}




function ImageInfo(){
    let statedata=store.getState();
    $(".imgcls").click(function(){


        var selector=$(this).attr("id");
        $("#DialogOpen").trigger("click");
        let PopularHtml="";
        let filterObj = statedata.popularList.filter(function(e) {
            return selector.toString() == e.id.toString();
        }); 

        if(filterObj.length==0){
            filterObj = statedata.collecList.filter(function(e) {
                    return selector.toString() == e.id.toString();
                }); 
        }
        PopularHtml +=`<div class='card p-2 ml-2'><div class="row"><div class="col-md-6 float-left"><div class='imgcls text-center' id='${filterObj[0].id}' ><img class='card-img-top' src='https://image.tmdb.org/t/p/w500/${filterObj[0].poster_path}' alt='Card image cap' /><p><span class="r-corner">2D</span><span class="r-corner">3D</span></p></div></div><div class="col-md-6"><h3>Movie Overview</h3><div class='card-text'><span><i class='fa fa-heart'></i></span><span>&nbsp${filterObj[0].vote_average * 10}% &nbsp&nbsp</span><span>Votes: ${filterObj[0].vote_count}</span><span>&nbsp 4.3<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></span></div><p>${filterObj[0].overview}</p><p>Release Date: ${filterObj[0].release_date}</p></div></div>`;
        document.getElementsByClassName("popbody")[0].innerHTML = PopularHtml; 
        $(".modal-title").html("Movie Info") ; 
        $("#DelCollec").css("display","none");  
    
    })

}

function Popuphtml(){


    let Popupstruc=`<!-- The Modal -->
    
        <div class="modal-dialog">
        <div class="modal-content">
        
            <!-- Modal Header -->
            <div class="modal-header">
            <h4 class="modal-title">Modal Heading</h4>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            
            <!-- Modal body -->
            <div class="modal-body row popbody">
            
            </div>
            
            <!-- Modal footer -->
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal" id="AddCollec">Add To Collection</button>
                <button type="button" class="btn btn-danger" data-dismiss="modal" id="DelCollec">Delete</button>    
                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
            </div>
            
        </div>
        </div>`;
        document.getElementById("myModal").innerHTML = Popupstruc;        

}



export { poplistgen,PopularList_Render,CollectionList_Render,Button_events,SearchListFun,ImageInfo,Popuphtml }