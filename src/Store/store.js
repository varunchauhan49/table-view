import { applyMiddleware, createStore } from "redux"

import promise from "redux-promise-middleware";
import thunk from "redux-thunk"

import reducer from "../Reducers"

const middleware = applyMiddleware(  promise(),  thunk);

export default createStore(reducer, middleware)