import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const withToast = (WrappedComponent) => {
  return (props) => {
    return (
      <>
        <WrappedComponent {...props} />
        <ToastContainer position="top-right" />
      </>
    );
  };
};

export default withToast;
