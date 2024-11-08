import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { ImagesReducer } from "./features/imagesSlice";

export const makeStore = () => {
  return configureStore({
    reducer: combineReducers({
      images: ImagesReducer,
    }),
  });
};
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
