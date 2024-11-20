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

initAuthStateChangeListener(auth, (user) => {
  if (user) {
    store.dispatch(
      setUserData({
        email: user.email || "",
        isEmailVerified: user.emailVerified,
        userId: user.uid,
        firstName: user.displayName?.split(",")[1] || "",
        lastName: user.displayName?.split(",")[0] || "",
        phoneNumber: user.phoneNumber || "",
      })
    );
  } else {
    store.dispatch(clearUserData());
  }
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
