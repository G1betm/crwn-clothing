import { useState, FormEvent, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { AuthError, AuthErrorCodes } from "firebase/auth";
import FormInput from "../form-input/form-input.component";
import {
  googleSignInStart,
  emailSignInStart,
} from "../../store/user/user.action";

const defaultFormFields = {
  email: "",
  password: "",
};

import { SignInContainer, ButtonsContainer } from "./sign-in-form.styles";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

const SignInForm = () => {
  const dispatch = useDispatch();
  const [formFileds, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFileds;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
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
    dispatch(googleSignInStart());
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      dispatch(emailSignInStart(email, password));

      resetFormFields();
    } catch (error) {
      if (
        (error as AuthError).code == AuthErrorCodes.INVALID_PASSWORD ||
        (error as AuthError).code == AuthErrorCodes.INVALID_EMAIL
      ) {
        alert("Invalid Email or Password");
      } else {
        console.log("Some error occured", error);
      }
    }
  };

  return (
    <SignInContainer>
      <h2> Alredy have an account ? </h2>
      <span> Sign in with your email and password </span>
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
        <ButtonsContainer>
          <Button type="Submit"> Sign In </Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={signInWithGoogle}
          >
            Google Sign In
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;