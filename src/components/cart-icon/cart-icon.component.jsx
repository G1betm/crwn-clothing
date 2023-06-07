import { useContext } from "react";
import { CartButton, ShoppingIcon, ItemCount } from "./cart-icon.styles.jsx";
import { CartContext } from "../../contexts/cart.context";

const CartIcon = () => {
  const { cartCount, isCartOpen, setIsCartOpen } = useContext(CartContext);

  const toggleCartOpen = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <CartButton onClick={toggleCartOpen}>
      <ShoppingIcon />
      <ItemCount>{cartCount}</ItemCount>
    </CartButton>
  );
};

export default CartIcon;
