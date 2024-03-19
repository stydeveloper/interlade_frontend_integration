// FilterProvider.js
import React, { useState } from "react";

export const FilterContext = React.createContext();
// import "react-toastify/dist/ReactToastify.css";

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    carrierName: null,
    status: null,
    shipperName: null,
    consigneeName: null,
    driverName: null,
    search: null,
    date: {
      from: null,
      to: null,
    },
  });

  const [selectedFilters, setSelectedFilters] = useState([]);

  return (
    <FilterContext.Provider
      value={{ filters, setFilters, selectedFilters, setSelectedFilters }}
    >
      {children}
    </FilterContext.Provider>
  );
};
