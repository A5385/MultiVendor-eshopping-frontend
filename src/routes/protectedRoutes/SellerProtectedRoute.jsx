/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import Loader from "../../components/website/layout/Loader";

const SellerProtectedRoute = ({ children }) => {
  const { isLoading, isSeller } = useSelector((state) => state.seller);

  if (isLoading === true) {
    return <Loader />;
  } else {
    if (!isSeller) {
      return <Navigate to={`/login-shop`} replace />;
    }
  }
  return children;
};

export default SellerProtectedRoute;
