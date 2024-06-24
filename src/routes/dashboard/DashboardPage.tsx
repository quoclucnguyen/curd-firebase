import { getAuth } from "firebase/auth";
import app from "../../firebase";
const auth = getAuth(app);

const DashboardPage = () => {
  return (
    <>
      <h3>DashboardPage</h3>
      <p>User: {auth.currentUser?.displayName}</p>
    </>
  );
};

export default DashboardPage;
