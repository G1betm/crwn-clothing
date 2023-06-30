import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 20px 40px;
    font-family: 'Roboto Condensed', sans-serif;

    
    @media screen and (max-width: 800px) {
      padding: 20px;
    }
  }

  * {
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    color: #000;
  }


  img {
    max-width: 100%;
    height: auto;
  }
`;
