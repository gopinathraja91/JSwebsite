import {createStore} from 'redux';
import { PopularList_Render,CollectionList_Render,poplistgen } from "../render/renderpage.js"

// Reducer
function CreateComponent(CurrentState, action) {
        let NewState=CurrentState;
        switch(action.type) {
            case "Create PopularList":
                const s = [...NewState.popularList, ...action.popularList]
                NewState.popularList=s;
                NewState.status="CreatePopularList";
                return NewState;
                break;
            case "Create CollecList":
                NewState.collecList=action.collecList;
                NewState.status="CreateCollecList";
                return NewState;
                break;
            case "Search Component":
                NewState.SearchList=action.SearchList;
                NewState.status="CreateSearchList";
                return NewState;
                break;
            case "Update Popupdata":
                NewState.PopupData=action.PopupData;
                NewState.status="UpdatePopupdata";
                return NewState;
                break;
            case "Update CollecList":
                var mergedata=NewState.collecList.concat(action.collecList);
                NewState.collecList=mergedata;
                NewState.status="CollecUpdate";
                return NewState;
                break;
            case "Delete CollecList":

                 let filteredarray = NewState.collecList.filter(function(e) {
                         if(action.collecList.includes(e.id.toString())){return false;}else{return true;};
                  });
                  NewState.collecList=filteredarray;
                  NewState.status="CollecDelete";
                return NewState;
                break;
            default:   
                return CurrentState;
        }

  }

  
// Instantiating the store
const store = createStore(CreateComponent, {
    collecList:[],popularList:[],SearchList:[],PopupData:[],status:"initial load"
  });

//Subscriber Function 
function render(){
    let Storedata=store.getState();
   switch(Storedata.status){
       case "CreatePopularList":
            Storedata.status="done";
            poplistgen(5,"cardcust",Storedata.popularList,"NOdelete","");
            break;
       case "CreateCollecList":
            Storedata.status="done";
            let colleng=(Storedata.collecList.length>4)?5:Storedata.collecList.length;
            poplistgen(colleng,"collection",Storedata.collecList,"NOdelete","");        
            break;
       case "CreateSearchList":
            Storedata.status="done";
            poplistgen(Storedata.SearchList.length,"popbody",Storedata.SearchList,"NOdelete","Search Results");
            break;
       case "CreatePopupdata":
            Storedata.status="done";
            break;
       case "CollecUpdate":
            Storedata.status="done" 
            let collengone=(Storedata.collecList.length>4)?5:Storedata.collecList.length;
            poplistgen(collengone,"collection",Storedata.collecList,"NOdelete","");           
            break;
       case "CollecDelete":
            Storedata.status="done";
            console.log(Storedata.collecList);
            let collengtwo=(Storedata.collecList.length>4)?5:Storedata.collecList.length;
            poplistgen(collengtwo,"collection",Storedata.collecList,"NOdelete","");           
            break;
       default:
       Storedata.status="done" 

   }
}  

// Listen for changes
store.subscribe(render);



export { store }