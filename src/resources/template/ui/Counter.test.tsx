import { fireEvent, render, screen } from "@testing-library/react";
import { RenderTest } from "resources/test/RenderTest/RenderTest";

describe("Проверка компонента <Counter />", () => {
  test("тест на присутствие компонента", () => {
    // RenderTest(<Counter />);
    // expect(screen.getByTestId("counter")).toBeInTheDocument();
  });

  test("тест на задание глобального стейта", () => {
    // RenderTest(<Counter />, { initialState: { counter: { value: 5 } } });
    // expect(screen.getByTestId("counter-value")).toHaveTextContent("5");
  });

  test("тест на декремент", () => {
    // RenderTest(<Counter />, { initialState: { counter: { value: 5 } } });
    // expect(screen.getByTestId("counter-value")).toHaveTextContent("5");
    // const btn = screen.getByTestId("counter-dec-button");
    // // userEvent.click(btn);
    // fireEvent.click(btn);
    // expect(screen.getByTestId("counter-value")).toHaveTextContent("4");
    // // screen.debug();
  });

  test("тест на инкремент", () => {
    // RenderTest(<Counter />, { initialState: { counter: { value: 5 } } });
    // expect(screen.getByTestId("counter-value")).toHaveTextContent("5");
    // const btn = screen.getByTestId("counter-inc-button");
    // fireEvent.click(btn);
    // expect(screen.getByTestId("counter-value")).toHaveTextContent("6");
    // screen.debug();
  });
});
