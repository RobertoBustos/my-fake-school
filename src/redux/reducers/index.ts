import { combineReducers } from "@reduxjs/toolkit";
import subjectReducer from "@reducers/subjectReducer";
import indicatorsReducer from "@reducers/indicatorReducer";

export default combineReducers({
  subject: subjectReducer,
  indicators: indicatorsReducer,
});
