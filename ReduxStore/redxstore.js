import {createStore} from 'redux';
import { PopularList_Render,CollectionList_Render } from "../render/renderpage.js"

// Reducer
function CreateComponent(CurrentState, action) {
        let NewState=CurrentState;
        switch(action.type) {
            case "Create PopularList":
                const s = [...NewState.popularList, ...action.popularList]
                NewState.popularList=s;
                return NewState;
                break;
            case "Create CollecList":
                NewState.collecList=action.collecList;
                return NewState;
                break;
            case "Search Component":
                NewState.SearchList=action.SearchList;
                return NewState;
                break;
            case "Update Popupdata":
                NewState.PopupData=action.PopupData;
                return NewState;
                break;
            case "Update CollecList":
                var mergedata=NewState.collecList.concat(action.collecList);
                NewState.collecList=mergedata;
                NewState.status="CollecUpdate";
                return NewState;
                break;
            case "Delete CollecList":
                let filteredPeople = NewState.collecList.filter(function(e) {
                        if(action.collecList.includes(e.id.toString())){}else{return true;};
                  });
                  NewState.collecList=filteredPeople;
                  NewState.collecList="CollecDelete";
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

   
function render(){
   let Storedata=store.getState();
  
   if(Storedata.status == "CollecUpdate"){
        Storedata.status = "Updated";
        CollectionList_Render();
   }else if(Storedata.status == "CollecDelete"){
        Storedata.status = "Updated";
        CollectionList_Render();
   }
}  

// Listen for changes
store.subscribe(render);



export { store }