const $ = require('jquery');
const localVar = require('../variables.js');

function ajaxcall(ApiUrl, Apikey, DataType, DataArr, Datastate) {
  switch (Datastate) {
    case 'GetDate':

      const data = $.parseJSON($.ajax({
        url: `${ApiUrl}api_key=${Apikey}&language=en-US`,
        dataType: 'json',
        async: false,
      }).responseText);
      if (DataType === 'Json') {
        return data.results;
      }
      return data;

      break;


      // post data to local server
    case 'SaveData':
      for (let i = 0; i < DataArr.length; i++) {
        $.post(localVar.BaseServerUrl,
          DataArr[i],
          (data1, status) => {
            console.log(data1 + status);
          });
      }
      break;


      // delete data from local server
    case 'deleteDate':
      for (let i = 0; i < DataArr.length; i++) {
        $.ajax({
          url: `${localVar.BaseServerUrl}/${DataArr[i].id}`,
          type: 'DELETE',
          success(response) {
            console.log(response);
          },

        });
      }
      break;
    default:
  }
  return true;
}


export default ajaxcall;
