import {
  CartItemContainer,
  CartItemDetails,
  CartItemName,
  CartItemQuantity,
} from "./cart-item.styles.jsx";

const CartItem = ({ cartItem }) => {
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
