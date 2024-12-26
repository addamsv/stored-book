import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { RenderTest } from "shared/lib/test/RenderTest/RenderTest";
import { Suspense } from "react";
import { BooksListPage } from "..";

describe("Проверка компонента <BooksListPage />", () => {
  test("тест на присутствие компонента", async () => {
    RenderTest(
      <Suspense fallback={<div>Loading... </div>}>
        <BooksListPage />
      </Suspense>
    );

    // Wait for lazy component to load
    // const lazyElement = await screen.findByText("Книги");
    // expect(lazyElement).toBeInTheDocument();
    // expect(screen.getByTestId("BooksListPage")).toBeInTheDocument();

    // Wait for lazy component to load
    const lazyElement = await waitFor(() => screen.getByTestId("BooksListPage"));
    expect(lazyElement).toBeInTheDocument();
  });

  // test("тест на задание глобального стейта", () => {
  //   RenderTest(<Counter />, { initialState: { counter: { value: 5 } } });
  //   expect(screen.getByTestId("counter-value")).toHaveTextContent("5");
  // });

  // test("тест на декремент", () => {
  //   RenderTest(<Counter />, { initialState: { counter: { value: 5 } } });
  //   expect(screen.getByTestId("counter-value")).toHaveTextContent("5");
  //   const btn = screen.getByTestId("counter-dec-button");
  //   // userEvent.click(btn);
  //   fireEvent.click(btn);
  //   expect(screen.getByTestId("counter-value")).toHaveTextContent("4");
  //   // screen.debug();
  // });

  // test("тест на инкремент", () => {
  //   RenderTest(<Counter />, { initialState: { counter: { value: 5 } } });
  //   expect(screen.getByTestId("counter-value")).toHaveTextContent("5");
  //   const btn = screen.getByTestId("counter-inc-button");
  //   fireEvent.click(btn);
  //   expect(screen.getByTestId("counter-value")).toHaveTextContent("6");
  //   screen.debug();
  // });
});
