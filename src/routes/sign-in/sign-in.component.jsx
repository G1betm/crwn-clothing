import SignUpForm from "../../components/sign-up-form/sign-up-form.component.jsx";
import {
  signInWithGooglePopup,
  createUserDocFromAuth,
} from "../../utils/firebase/firebase.utils.js";

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocFromAuth(user);
  };

  return (
    <div>
      <h1>Sign in</h1>
      <SignUpForm />
      <button onClick={logGoogleUser}>Sign In With Google</button>
    </div>
  );
};

export default SignIn;
