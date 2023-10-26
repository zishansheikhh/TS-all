import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { ProductsProvider } from "./context/admin/products.context";
import { SellersProvider } from "./context/admin/sellers.context";
import { AdminAuthProvider } from "./context/admin/auth.context";
import { CustomersProvider } from "./context/admin/customers.context";
import { AdminNotificationsProvider } from "./context/admin/admin-notifications.context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* Admin */}
      <AdminAuthProvider>
        <AdminNotificationsProvider>
          <ProductsProvider>
            <SellersProvider>
              <CustomersProvider>
                <App />
              </CustomersProvider>
            </SellersProvider>
          </ProductsProvider>
        </AdminNotificationsProvider>
      </AdminAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
