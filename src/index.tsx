import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "@redux/store";
import router from "@router/index";
import "@config/i18next";
import "bootstrap/dist/css/bootstrap.min.css";
import reportWebVitals from "./reportWebVitals";
import "@config/remoteConfig";
import { auth, initAuthStateChangeListener } from "@config/auth";
import { clearUserData, setUserData } from "@redux/actions";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

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
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

// eslint-disable-next-line react-hooks/rules-of-hooks

// If you want to start measuring performance in your app, pass a function
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals(loggerFunction); ------> example to log results
reportWebVitals();
