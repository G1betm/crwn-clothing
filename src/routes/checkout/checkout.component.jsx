import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderItem,
  CheckoutTotal,
} from "./checkout.styles.jsx";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";

const Checkout = () => {
  const { cartItems, cartTotal } = useContext(CartContext);

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
    </CheckoutContainer>
  );
};

export default Checkout;
