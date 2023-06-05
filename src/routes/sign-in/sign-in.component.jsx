import { signInWithGooglePopup } from "../../utils/firebase/firebase.utils.js";

const SignIn = () => {
  const logGooglUser = async () => {
    const response = await signInWithGooglePopup();
    console.log(response);
  };
  return (
    <div>
      <h1>Sign in</h1>
      <button onClick={logGooglUser}>Sign In With Google</button>
    </div>
  );
};

export default SignIn;
