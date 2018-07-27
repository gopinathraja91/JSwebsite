import ajaxcall from '../services/ajaxservice';
import store from '../ReduxStore/redxstore';

const $ = require('jquery');
const localVar = require('../variables.js');

function Addcollection() {
  const statedata = store.getState();
  const selected = [];
  $('.popbody input:checked').each(function () {
    selected.push($(this).attr('name'));
  });
  const filterObj = statedata.PopupData.filter(e => selected.includes(e.id.toString()));

  ajaxcall(localVar.BaseServerUrl, localVar.Apikey, 'DataType', filterObj, 'SaveData');
  store.dispatch({ type: 'Update CollecList', collecList: filterObj });
}

function DelCollecList() {
  const selected = [];
  const statedata = store.getState();
  $('.popbody input:checked').each(function () {
    selected.push($(this).attr('name'));
  });
  const filterObj = statedata.PopupData.filter(e => selected.includes(e.id.toString()));
  ajaxcall(localVar.BaseServerUrl, localVar.Apikey, 'DataType', filterObj, 'deleteDate');
  store.dispatch({ type: 'Delete CollecList', collecList: selected });
}


export { Addcollection, DelCollecList };
