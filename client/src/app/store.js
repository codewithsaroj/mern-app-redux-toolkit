import {configureStore} from "@reduxjs/toolkit";
import employeeReducer from "../features/employeeSlice"


const store = configureStore({
  reducer:{
    employee : employeeReducer
  }
})

export default store;