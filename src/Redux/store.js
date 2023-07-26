import {createStore,combineReducers,applyMiddleware} from"redux"
import thunk from "redux-thunk"
import { AllUserReducer } from "./AllUserRedux/AllUserReducer";
import { LoginReducer } from "./LoginReducer/LoginReducer";
const rootReducer=combineReducers({
 AllUserReducer,
 LoginReducer
})
export const store= createStore(rootReducer,applyMiddleware(thunk));