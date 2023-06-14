import { useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartTotal,
} from "../../store/cart/cart.selector.js";
import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderItem,
  CheckoutTotal,
} from "./checkout.styles.jsx";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import PaymentForm from "../../components/payment-form/payment-form.component.jsx";

const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <HeaderItem>
          <span>Product</span>
        </HeaderItem>
        <HeaderItem>
          <span>Description</span>
        </HeaderItem>
        <HeaderItem>
          <span>Quantity</span>
        </HeaderItem>
        <HeaderItem>
          <span>Price</span>
        </HeaderItem>
        <HeaderItem>Remove</HeaderItem>
      </CheckoutHeader>
      {cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}

      <CheckoutTotal>Total: ${cartTotal}</CheckoutTotal>

      <PaymentForm />
    </CheckoutContainer>
  );
};

export default Checkout;
