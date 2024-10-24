import { combineReducers } from "@reduxjs/toolkit";
import subjectReducer from "./subjectReducer";
import indicatorsReducer from "./indicatorReducer";

export default combineReducers({
  subject: subjectReducer,
  indicators: indicatorsReducer,
});
