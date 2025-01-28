import { render, screen } from "@testing-library/react";
import { Button, ButtonTheme } from "./Button";

describe("Проверка компонента-кнопки", () => {
  test("тест на присутствие компонента", () => {
    render(<Button>text</Button>);
    expect(screen.getByText("text")).toBeInTheDocument();
  });

  test("тест на присутствие класса \"red\" в кнопке", () => {
    render(<Button theme={ButtonTheme.RED}>text</Button>);
    expect(screen.getByText("text")).toHaveClass("red");
    // screen.debug();
  });
});
