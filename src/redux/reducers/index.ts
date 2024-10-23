import { combineReducers } from "@reduxjs/toolkit";
import subjectReducer from "./subjectReducer";
import errorReducer from "./errorReducer";
import indicatorsReducer from "./indicatorReducer";

export default combineReducers({
  subject: subjectReducer,
  error: errorReducer,
  indicators: indicatorsReducer,
});
