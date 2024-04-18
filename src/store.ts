import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user";
import accessTokenReducer from "./reducers/token";

const rootReducer = combineReducers({
    user: userReducer,
    accessToken: accessTokenReducer,
});

const store = configureStore({
    reducer: rootReducer,
})

export default store;