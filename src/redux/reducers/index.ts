import { combineReducers } from "@reduxjs/toolkit";
import subjectReducer from "@reducers/subjectReducer";
import indicatorsReducer from "@reducers/indicatorReducer";
import authReducer from "@reducers/authReducer";

export default combineReducers({
  subject: subjectReducer,
  indicators: indicatorsReducer,
  auth: authReducer
});
