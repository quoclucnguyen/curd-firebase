import { getAuth } from "firebase/auth";
import { Navigate, useLocation } from "react-router-dom";
import app from "./firebase";

export default function RequireAuth({
  children,
}: {
  readonly children: JSX.Element;
}) {
  const auth = getAuth(app);
  const location = useLocation();

  if (!auth.currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
