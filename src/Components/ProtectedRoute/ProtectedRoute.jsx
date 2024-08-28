import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  if (localStorage.getItem("userToken")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}
