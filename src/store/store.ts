import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { ImagesReducer } from "./features/imagesSlice";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";

// const persistConfig = {
//   key: "root",
//   storage,
// };

// const rootReducer = combineReducers({
//   images: ImagesReducer,
// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
  return configureStore({
    reducer: combineReducers({
      images: ImagesReducer,
    }),
  });
};
// export const persistor = persistStore(makeStore);
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
