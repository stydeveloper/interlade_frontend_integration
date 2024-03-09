"use client";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const withToast = (WrappedComponent) => {
  const WithToast = (props) => {
    return (
      <div>
        <WrappedComponent {...props} />
        <ToastContainer style={{ marginTop: "40px" }} position="top-right" />
      </div>
    );
  };

  // Set the display name for the HOC
  WithToast.displayName = `WithToast(${
    WrappedComponent.displayName || WrappedComponent.name
  })`;

  return WithToast;
};

export default withToast;
