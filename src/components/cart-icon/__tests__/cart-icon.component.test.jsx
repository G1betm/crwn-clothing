import { screen } from "@testing-library/dom";
import { renderWithProviders } from "../../../utils/tests/test.utils";
import CartIcon from "../cart-icon.component";

describe("Cart icon tests", () => {
  test("Uses preloaded state to render", () => {
    const initialCartItems = [
      { id: 1, name: "Item A", image: "test", price: 10, quantity: 1 },
      { id: 2, name: "Item B", image: "test2", price: 300, quantity: 2 },
    ];

    renderWithProviders(<CartIcon />, {
      preloadedState: {
        cart: {
          cartItems: initialCartItems,
        },
      },
    });

    const cartIconElement = screen.getByText("3");
    expect(cartIconElement).toBeInTheDocument();
  });
});
