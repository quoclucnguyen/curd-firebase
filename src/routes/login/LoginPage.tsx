import { Button } from "antd-mobile";
import {
  GoogleAuthProvider,
  browserLocalPersistence,
  getAuth,
  setPersistence,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import app from "../../firebase";

const auth = getAuth(app);

const LoginPage = () => {
  const navicate = useNavigate();
  const provider = new GoogleAuthProvider();

  if (auth.currentUser) {
    navicate("/");
  }

  return (
    <div>
      <Button
        onClick={() => {
          setPersistence(auth, browserLocalPersistence).then(() => {
            signInWithPopup(auth, provider)
              .then(() => {
                navicate("/");
              })
              .catch((error) => {
                console.log(error.message);
              });
          });
        }}
      >
        Login
      </Button>
    </div>
  );
};

export default LoginPage;
