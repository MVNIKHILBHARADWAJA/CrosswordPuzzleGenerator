import { Navigate, useNavigate } from "react-router-dom";
import { useUser } from "../context/Context";

const ForwardingRoute = ({ children }) => {
  let {person}=useUser();
  const navigate=useNavigate();

  return person ? children : <Navigate to="/login" replace /> ;
};

export default ForwardingRoute;