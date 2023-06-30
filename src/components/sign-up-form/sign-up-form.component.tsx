import { useState, FormEvent, ChangeEvent } from "react";
import { AuthError, AuthErrorCodes } from "firebase/auth";
import { useDispatch } from "react-redux";
import { signUpStart } from "../../store/user/user.action";
import FormInput from "../form-input/form-input.component";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

import { SignInContainer } from "../sign-in-form/sign-in-form.styles.js";
import Button from "../button/button.component";

const SignUpForm = () => {
  const dispatch = useDispatch();
  const [formFileds, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFileds;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFileds, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password != confirmPassword) {
      alert("passwords do not match");
      return;
    }

    try {
      dispatch(signUpStart(email, password, displayName));

      resetFormFields();
    } catch (error) {
      if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
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