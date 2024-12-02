import authReducer from "@reducers/authReducer";
import indicatorsReducer from "@reducers/indicatorReducer";
import subjectReducer from "@reducers/subjectReducer";
import { combineReducers } from "@reduxjs/toolkit";

export default combineReducers({
    subject: subjectReducer,
    indicators: indicatorsReducer,
    auth: authReducer
});
