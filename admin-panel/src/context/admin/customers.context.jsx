import { useContext, useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { httpGetAllCustomersDetails } from "../../utils/nodejs/admin";
import { AdminAuthContext } from "./auth.context";

export const CustomersContext = createContext({
  customersList: [],
  setCustomersList: () => {},
});

export const CustomersProvider = ({ children }) => {
  const { isAdminLogin } = useContext(AdminAuthContext);
  const [customersList, setCustomersList] = useState([]);

  useEffect(() => {
    const getCustomersArray = async () => {
      if (isAdminLogin) {
        const customersArray = await httpGetAllCustomersDetails();
        console.log(customersArray);
        setCustomersList(customersArray);
      }
    };
    getCustomersArray()
  }, [isAdminLogin]);

  const value = { customersList, setCustomersList };

  return (
    <CustomersContext.Provider value={value}>
      {children}
    </CustomersContext.Provider>
  );
};
