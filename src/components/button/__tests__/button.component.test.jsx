import { render, screen } from "@testing-library/react";
import Button, { BUTTON_TYPE_CLASSES } from "../button.component";

describe("button tests", () => {
  it("should render base button when nothing is passed", () => {
    render(<Button style={{ backgroundColor: "#000" }}>Test</Button>);

    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toHaveStyle("background-color: #000");
  });

  it("should render google button", () => {
    render(
      <Button
        buttonType={BUTTON_TYPE_CLASSES.google}
        style={{ backgroundColor: "#4285f4" }}
      />
    );

    const googleButton = screen.getByRole("button");
    expect(googleButton).toHaveStyle("background-color: #4285f4");
  });

  it("should render inverted button", () => {
    render(
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        style={{ backgroundColor: "#fff" }}
      />
    );

    const invertedButton = screen.getByRole("button");
    expect(invertedButton).toHaveStyle("background-color: #fff");
  });

  it("should be disabled when isLoading is true", () => {
    render(<Button isLoading={true} />);

    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeDisabled();
  });
});
