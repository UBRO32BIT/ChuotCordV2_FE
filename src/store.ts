import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./redux/slices/userSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import guildsSlice from "./redux/slices/guildsSlice";

const rootReducer = combineReducers({
    user: userSlice,
    guilds: guildsSlice,
});

const persistConfig = {
    key: 'root',
    storage,
  }

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
})
export const persistor = persistStore(store);