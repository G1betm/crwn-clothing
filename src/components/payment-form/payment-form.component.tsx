import { useState, FormEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCartTotal } from "../../store/cart/cart.selector";
import { selectUserReducer } from "../../store/user/user.selector";
import {StripeCardElement} from "@stripe/stripe-js";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { BUTTON_TYPE_CLASSES } from "../button/button.component";
import {
  PaymentFormContainer,
  FormContainer,
  PaymentButton,
} from "./payment-form.styles";

import { clearCart } from "../../store/cart/cart.action";

const ifValidCardElement = (card: StripeCardElement | null): card is StripeCardElement => card !== null;

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  const amount = useSelector(selectCartTotal);
  const currentUser = useSelector(selectUserReducer);

  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [isPaymentCompeted, setIsPaymentCompeted] = useState(false);

  const paymentHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessingPayment(true);

    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: amount * 100 }),
    }).then((res) => res.json());

    const clientSecret = response.paymentIntent.client_secret;
    const cardDetails = elements.getElement(CardElement);

    if(!ifValidCardElement(cardDetails)) return;

    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardDetails,
        billing_details: {
          name: currentUser ? currentUser.displayName : "guest",
        },
      },
    });

    setIsProcessingPayment(false);

    if (paymentResult.error) {
      alert(paymentResult.error);
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        dispatch(clearCart());
        setIsPaymentCompeted(true);
      }
    }
  };

  return (
    <PaymentFormContainer>
      {isPaymentCompeted ? (
        <h1>Thank you for your order!</h1>
      ) : (
        <FormContainer onSubmit={paymentHandler}>
          <h2>Credit Card Payment:</h2>
          <CardElement />
          <PaymentButton
            isLoading={isProcessingPayment}
            buttonType={BUTTON_TYPE_CLASSES.inverted}
          >
            Pay Now
          </PaymentButton>
        </FormContainer>
      )}
    </PaymentFormContainer>
  );
};

export default PaymentForm;
