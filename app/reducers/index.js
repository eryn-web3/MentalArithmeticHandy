// @flow
import { combineReducers } from 'redux';

import nav from './navigation';
import apisettings from './apisettings';
import lang from './lang';

const rootReducer = combineReducers({
  nav,
  apisettings,
  lang
});

export default rootReducer;
