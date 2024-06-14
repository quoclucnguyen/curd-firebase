import { Button } from "antd-mobile";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import app from "../../firebase";
import { useUserStore } from "../../stores/useAuthStore";

const auth = getAuth(app);

const LoginPage = () => {
  const navicate = useNavigate();
  const provider = new GoogleAuthProvider();
  const { user, setUser } = useUserStore();

  if (user) {
    navicate("/");
  }

  return (
    <div>
      <Button
        onClick={() => {
          signInWithPopup(auth, provider)
            .then((result) => {
              console.log(result.user);
              setUser(result.user);
              navicate("/");
            })
            .catch((error) => {
              console.log(error.message);
            });
        }}
      >
        Login
      </Button>
    </div>
  );
};

export default LoginPage;
