import {FC} from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";
import {
  clearItemFromCart,
  addItemToCart,
  removeItemFromCart,
} from "../../store/cart/cart.action";

import {
  ImageContainer,
  CheckoutItemContainer,
  BaseSpan,
  Quantity,
  Arrow,
  Value,
  RemoveButton,
} from "./checkout-item.styles";


import { CartItem } from "../../store/cart/cart.types";

type CheckoutItemProps = {
  cartItem: CartItem;
}

const CheckoutItem: FC<CheckoutItemProps> = ({ cartItem }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const { name, imageUrl, price, quantity } = cartItem;

  const clearItemHandler = () =>
    dispatch(clearItemFromCart(cartItems, cartItem));

  const incrementHandler = () => dispatch(addItemToCart(cartItems, cartItem));

  const decrementHandler = () =>
    dispatch(removeItemFromCart(cartItems, cartItem));

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <BaseSpan>{name}</BaseSpan>
      <Quantity>
        <Arrow onClick={decrementHandler}>&#10094;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={incrementHandler}>&#10095;</Arrow>
      </Quantity>
      <BaseSpan>${price}</BaseSpan>
      <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;
