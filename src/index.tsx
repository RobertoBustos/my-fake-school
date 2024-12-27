import {
  activate,
  auth,
  fetchConfig,
  firebaseApp,
  getAll,
  getAnalytics,
  getRemoteConfig,
  initAuthStateChangeListener,
  isAnalyticsSupported,
  isRemoteConfigSupported,
} from "@config/index";
import store from "@redux/store";
import router from "@router/index";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

import {
  clearUserData,
  registerFeatureFlags,
  setAnalytics,
  setUserData,
} from "@actions/index";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

isAnalyticsSupported().then((isSupported) => {
  if (isSupported) {
    const analytics = getAnalytics(firebaseApp);
    store.dispatch(setAnalytics(analytics));
  }
});

isRemoteConfigSupported().then((isSupported) => {
  if (isSupported) {
    const remoteConfig = getRemoteConfig(firebaseApp);
    fetchConfig(remoteConfig).then(() => {
      activate(remoteConfig).then(() => {
        const featureFlags = getAll(remoteConfig);
        console.log(
          `remote config initialized with status ${remoteConfig.lastFetchStatus} and with these feature flags ${JSON.stringify(featureFlags)}`
        );
        console.log("featureFlags", featureFlags);
        store.dispatch(registerFeatureFlags(featureFlags));
      });
    });
  }
});

initAuthStateChangeListener(auth, (user) => {
  if (user && user !== null) {
    store.dispatch(
      setUserData({
        userId: user.uid,
        email: user.email || "",
        displayName: user.displayName || "",
        phoneNumber: user.phoneNumber || "",
        isEmailVerified: user.emailVerified,
        photoURL: user.photoURL,
      })
    );
  } else {
    store.dispatch(clearUserData());
  }
});

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
    </Provider>
  </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals(loggerFunction); ------> example to log results
reportWebVitals();
