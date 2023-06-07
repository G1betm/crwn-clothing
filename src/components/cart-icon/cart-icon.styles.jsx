import styled from "styled-components";
import { ReactComponent as ShoppingSvg } from "../../assets/shopping-bag.svg";

export const CartButton = styled.button`
  width: 45px;
  height: 45px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
  background-color: transparent;
  border: none;
`;

export const ShoppingIcon = styled(ShoppingSvg)`
  width: 24px;
  height: 24px;
`;

export const ItemCount = styled.span`
  position: absolute;
  font-size: 10px;
  font-weight: bold;
  bottom: 14px;
`;
