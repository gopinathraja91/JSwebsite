import { createStore } from 'redux';
import { poplistgen } from '../render/renderpage';

// Reducer
function CreateComponent(CurrentState, action) {
  const NewState = CurrentState;
  switch (action.type) {
    case 'Create PopularList':
      const s = [...NewState.popularList, ...action.popularList];
      NewState.popularList = s;
      NewState.status = 'CreatePopularList';
      return NewState;
    case 'Create CollecList':
      NewState.collecList = action.collecList;
      NewState.status = 'CreateCollecList';
      return NewState;
    case 'Search Component':
      NewState.SearchList = action.SearchList;
      NewState.status = 'CreateSearchList';
      return NewState;
    case 'Update Popupdata':
      NewState.PopupData = action.PopupData;
      NewState.status = 'UpdatePopupdata';
      return NewState;
    case 'Update CollecList':
      const mergedata = NewState.collecList.concat(action.collecList);
      NewState.collecList = mergedata;
      NewState.status = 'CollecUpdate';
      return NewState;
    case 'Delete CollecList':
      const filteredarray = NewState.collecList.filter((e) => {
        if (action.collecList.includes(e.id.toString())) { return false; } return true;
      });
      NewState.collecList = filteredarray;
      NewState.status = 'CollecDelete';
      return NewState;
    default:
      return CurrentState;
  }
}


// Instantiating the store
const store = createStore(CreateComponent, {
  collecList: [], popularList: [], SearchList: [], PopupData: [], status: 'initial load',
});

// Subscriber Function
function render() {
  const Storedata = store.getState();
  switch (Storedata.status) {
    case 'CreatePopularList':
      Storedata.status = 'done';
      poplistgen(5, 'cardcust', Storedata.popularList, 'NOdelete', '');
      break;
    case 'CreateCollecList':
      Storedata.status = 'done';
      const colleng = (Storedata.collecList.length > 4) ? 5 : Storedata.collecList.length;
      poplistgen(colleng, 'collection', Storedata.collecList, 'NOdelete', '');
      break;
    case 'CreateSearchList':
      Storedata.status = 'done';
      poplistgen(Storedata.SearchList.length, 'popbody', Storedata.SearchList, 'NOdelete', 'Search Results');
      break;
    case 'CreatePopupdata':
      Storedata.status = 'done';
      break;
    case 'CollecUpdate':
      Storedata.status = 'done';
      const collengone = (Storedata.collecList.length > 4) ? 5 : Storedata.collecList.length;
      poplistgen(collengone, 'collection', Storedata.collecList, 'NOdelete', '');
      break;
    case 'CollecDelete':
      Storedata.status = 'done';
      console.log(Storedata.collecList);
      const collengtwo = (Storedata.collecList.length > 4) ? 5 : Storedata.collecList.length;
      poplistgen(collengtwo, 'collection', Storedata.collecList, 'NOdelete', '');
      break;
    default:
      Storedata.status = 'done';
  }
}

// Listen for changes
store.subscribe(render);


export default store;
