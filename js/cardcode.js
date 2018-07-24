const _var = require('./variables.js');
import { PopularList_Render,CollectionList_Render,Button_events,ImageInfo,Popuphtml } from "../render/renderpage.js"
import {createStore} from 'redux';

// Reducer
function CreateComponent(state={items:[]}, action) {
    switch(action.type) {
      case 'Create Components':
        return {items: "Inital Load"};
        break;
      default:
        return state;
    }
  }

  
// Instantiating the store
const store = createStore(CreateComponent, {
    items:[
      "Load Popular List",
      "Load Collection List"
    ]
  });

  
// Listen for changes
store.subscribe(() => {
    PopularList_Render();    
    CollectionList_Render();
    Popuphtml();
    ImageInfo();
    Button_events();
});

// Trigger Events
store.dispatch({type: 'Create Components', item: "Initial Load"});




    
    
 






