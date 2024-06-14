import { useUserStore } from "../../stores/useAuthStore";

const DashboardPage = () => {
  const { user } = useUserStore();

  return (
    <>
      <h3>DashboardPage</h3>
      <p>User: {user?.displayName}</p>
    </>
  );
};

export default DashboardPage;
