import { combineReducers } from 'redux'

import { stack } from './navigation';
import NeetReducer from './NeetReducer'
const rootReducer = combineReducers({
    stack,NeetReducer
   
})

export default rootReducer