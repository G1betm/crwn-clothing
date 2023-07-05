import { screen } from "@testing-library/dom";
import { renderWithProviders } from "../../../utils/tests/test.utils";

import Category from "../category.component";

vi.mock("react-router-dom", async () => {
  const mod = await vi.importActual("react-router-dom");

  return {
    ...mod,
    useParams: () => ({
      category: "mens",
    }),
  };
});

describe("category tests", () => {
  test("It should be render a Spinner if isLoading is true", () => {
    renderWithProviders(<Category />, {
      preloadedState: {
        categories: {
          isLoading: true,
          categories: [],
        },
      },
    });

    const spinnerElement = screen.getByTestId("spinner");
    expect(spinnerElement).toBeInTheDocument();
  });

  test("It should render Categories if isLoading is false", () => {
    renderWithProviders(<Category />, {
      preloadedState: {
        categories: {
          isLoading: false,
          categories: [
            {
              title: "mens",
              items: [
                { id: 1, name: "Product 1" },
                { id: 2, name: "Product 2" },
                { id: 3, name: "Product 3" },
              ],
            },
          ],
        },
      },
    });

    const spinnerElement = screen.queryByTestId("spinner");
    expect(spinnerElement).toBeNull();

    const productElement = screen.getByText(/product 1/i);
    expect(productElement).toBeInTheDocument();
  });
});
