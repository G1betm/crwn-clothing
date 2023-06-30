import styled from "styled-components";

export const CategoryContainer = styled.div`
  display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;

  @media screen and (min-width: 801px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 50px 20px;
  }
`;

export const CategoryTitle = styled.h2`
  text-align: center;
  text-transform: uppercase;
  font-size: 38px;
  margin-bottom: 25px;
  cursor: pointer;
`;
