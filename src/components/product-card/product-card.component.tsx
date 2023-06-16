import { FC } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";

import {
  ProductCardContainer,
  ProductCardFooter,
  ProductCardName,
  ProductCardPrice,
} from "./product-card.styles.jsx";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import { CategoryItem } from '../../store/categories/categories.types';

type ProductCardProps = {
  product: CategoryItem;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const { name, imageUrl, price } = product;

  const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={`${name}`} />
      <ProductCardFooter>
        <ProductCardName>{name}</ProductCardName>
        <ProductCardPrice>{price}</ProductCardPrice>
      </ProductCardFooter>

      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={addProductToCart}
      >
        Add To Cart
      </Button>
    </ProductCardContainer>
  );
};

export default ProductCard;
