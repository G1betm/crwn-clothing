import { useState, useContext } from "react";
import {
  signInWithGooglePopup,
  createUserDocFromAuth,
  signInAuthWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils.js";
import FormInput from "../form-input/form-input.component.jsx";

import { UserContext } from "../../contexts/user.context.jsx";

const defaultFormFields = {
  email: "",
  password: "",
};

import "./sign-in-form.styles.scss";
import Button from "../button/button.component.jsx";

const SignInForm = () => {
  const [formFileds, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFileds;

  const { setCurrentUser } = useContext(UserContext);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({
      ...formFileds,
      [name]: value,
    });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocFromAuth(user);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { user } = await signInAuthWithEmailAndPassword(email, password);
      setCurrentUser(user);
      resetFormFields();
    } catch (error) {
      if (
        error.code == "auth/wrong-password" ||
        error.code == "auth/user-not-found"
      ) {
        alert("Invalid Email or Password");
      } else {
        console.log("Some error occured", error.message);
      }
    }
  };

  return (
    <div className="sign-up-container">
      <h2> Alredy have an account ? </h2>{" "}
      <span> Sign in with your email and password </span>{" "}
      <form onSubmit={handleFormSubmit}>
        <FormInput
          label="Email"
          required
          type="email"
          onChange={handleChange}
          name="email"
          value={email}
        />
        <FormInput
          label="Password"
          required
          type="password"
          onChange={handleChange}
          name="password"
          value={password}
        />
        <div className="buttons-container">
          <Button type="Submit"> Sign In </Button>{" "}
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            Google Sign In{" "}
          </Button>{" "}
        </div>{" "}
      </form>{" "}
    </div>
  );
};

export default SignInForm;
