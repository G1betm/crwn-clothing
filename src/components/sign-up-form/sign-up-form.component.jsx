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
    <div>
      <h1>Sight up with your email and password</h1>
      <form onSubmit={handleFormSubmit}>
        <label>Display Name</label>
        <FormInput
          label="Display Name"
          required
          type="text"
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

        <label>Email</label>
        <FormInput
          label="Email"
          required
          type="email"
          onChange={handleChange}
          name="email"
          value={email}
        />

        <label>Password</label>
        <FormInput
          label="Password"
          required
          type="password"
          onChange={handleChange}
          name="password"
          value={password}
        />

        <label>Confirm Password</label>
        <FormInput
          label="Confirm Password"
          required
          type="password"
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />

        <button type="Submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
