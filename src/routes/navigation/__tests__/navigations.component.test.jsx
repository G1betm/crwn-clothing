import { screen, fireEvent } from "@testing-library/dom";
// import reactRedux from "../useDispatch";
import * as reactRedux from "react-redux";
import { renderWithProviders } from "../../../utils/tests/test.utils";
import Navigation from "../navigation.component";
import { signOutStart } from "../../../store/user/user.action";

describe("Navigation tests", () => {
  it("It should rended Sign In link if there is no currentUser", () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        user: {
          currentUser: null,
        },
      },
    });

    const signOutLink = screen.queryByText(/sign out/i);
    expect(signOutLink).toBeNull();

    const signInLink = screen.getByText(/sign in/i);
    expect(signInLink).toBeInTheDocument();
  });

  it("It should not rended Sign In link if there is no currentUser", () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        user: {
          currentUser: {},
        },
      },
    });

    const signInLink = screen.queryByText(/sign in/i);
    expect(signInLink).toBeNull();

    const signOutLink = screen.getByText(/sign out/i);
    expect(signOutLink).toBeInTheDocument();
  });

  it("It should be render CartDropdown if isCartOpen is true", () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        cart: {
          isCartOpen: true,
          cartItems: [],
        },
      },
    });

    const goToCheckoutButtonElement = screen.getByText(/go to checkout/i);
    expect(goToCheckoutButtonElement).toBeInTheDocument();
  });

  it("It should be not render CartDropdown if isCartOpen is false", () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        cart: {
          isCartOpen: false,
          cartItems: [],
        },
      },
    });

    const goToCheckoutButtonElement = screen.queryByText(/go to checkout/i);
    expect(goToCheckoutButtonElement).toBeNull();
  });

  // it("It should dispatch SignOutStart when clicking on the Sign Out Link", async () => {
  //   const mockDispatch = vi.fn();
  //   vi.spyOn(reactRedux, "useDispatch").mockReturnValue(mockDispatch);

  //   renderWithProviders(<Navigation />, {
  //     preloadedState: {
  //       user: {
  //         currentUser: {},
  //       },
  //     },
  //   });

  //   const signOutLink = screen.getByText(/sign out/i);
  //   expect(signOutLink).toBeInTheDocument();

  //   // await fireEvent.click(signOutLink);
  //   // expect(mockDispatch).toHaveBeenCalled();
  //   // expect(mockDispatch).toHaveBeenCalledWith(signOutStart);
  // });
});
