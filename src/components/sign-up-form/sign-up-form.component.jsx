import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocFromAuth,
} from "../../utils/firebase/firebase.utils.js";
import FormInput from "../form-input/form-input.component.jsx";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

import { SignInContainer } from "../sign-in-form/sign-in-form.styles.jsx";
import Button from "../button/button.component.jsx";

const SignUpForm = () => {
  const [formFileds, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFileds;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFileds, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (password != confirmPassword) {
      alert("passwords do not match");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocFromAuth(user, { displayName });

      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      } else {
        console.log("some error occured", error);
      }
    }
  };

  return (
    <SignInContainer>
      <h2>Don't have an account?</h2>
      <span>Sight up with your email and password</span>
      <form onSubmit={handleFormSubmit}>
        <FormInput
          label="Display Name"
          required
          type="text"
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

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

        <FormInput
          label="Confirm Password"
          required
          type="password"
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />

        <Button type="Submit">Sign Up</Button>
      </form>
    </SignInContainer>
  );
};

export default SignUpForm;
