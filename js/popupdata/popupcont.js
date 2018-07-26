import { poplistgen } from '../render/renderpage.js';
import { store } from '../ReduxStore/redxstore';


function poplistall(delbtnstatus, headcont) {
  const statedata = store.getState();
  let arrdata;
  if (headcont == 'Popular Lists') {
    arrdata = statedata.popularList;
  } else {
    arrdata = statedata.collecList;
  }

  $('#DialogOpen').trigger('click');
  poplistgen(arrdata.length, 'popbody', arrdata, delbtnstatus, headcont);
}

export { poplistall };
