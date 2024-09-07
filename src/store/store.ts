import { configureStore } from "@reduxjs/toolkit";
import languageReducer from './languageReducer'
import userReducer from "./userReducer";

export const store = configureStore({
    reducer: {
       language:  languageReducer,
       userList: userReducer,
    }
})