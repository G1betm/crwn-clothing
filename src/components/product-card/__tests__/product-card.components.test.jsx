import { screen, fireEvent } from "@testing-library/dom";
import { renderWithProviders } from "../../../utils/tests/test.utils";
import ProductCard from "../product-card.component";

describe("Product card tests", () => {
  test("it should add the rpoduct item when Product card button is clicked ", async () => {
    const mockProduct = {
      id: 1,
      imageUrl: "test",
      name: "Item A",
      price: 200,
    };

    const { store } = renderWithProviders(
      <ProductCard product={mockProduct} />,
      {
        preloadedState: {
          cart: {
            cartItems: [],
          },
        },
      }
    );

    const addToCartElement = screen.getByText(/add to cart/i);
    await fireEvent.click(addToCartElement);

    expect(store.getState().cart.cartItems.length).toBe(1);
  });
});
