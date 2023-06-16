import {FC} from 'react';

import {
  CartItemContainer,
  CartItemDetails,
  CartItemName,
  CartItemQuantity,
} from "./cart-item.styles";

import { CartItem as TCartItem } from '../../store/cart/cart.types';

type CartItemProps = {
  cartItem: TCartItem
}

const CartItem: FC<CartItemProps> = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <CartItemContainer>
      <img src={imageUrl} alt={`${name}`} />
      <CartItemDetails>
        <CartItemName>{name}</CartItemName>
        <CartItemQuantity>
          {quantity} x ${price}
        </CartItemQuantity>
      </CartItemDetails>
    </CartItemContainer>
  );
};

export default CartItem;
