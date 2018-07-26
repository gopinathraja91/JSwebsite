import {
  PopularList_Render, CollectionList_Render, Button_events, ImageInfo, Popuphtml
} from './render/renderpage.js';
import { store } from './ReduxStore/redxstore';

const _var = require('./variables.js');


PopularList_Render();
CollectionList_Render();
Popuphtml();
ImageInfo();
Button_events();
