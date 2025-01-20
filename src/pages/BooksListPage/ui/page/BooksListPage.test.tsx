import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { RenderTest } from "resources/test/RenderTest/RenderTest";
import { Suspense } from "react";
import { BooksListPage } from "../..";

describe("Проверка компонента <BooksListPage />", () => {
  test("тест на присутствие компонента", async () => {
    RenderTest(
      <Suspense fallback={<div>Loading... </div>}>
        <BooksListPage />
      </Suspense>
    );

    // Wait for lazy component to load
    // screen.debug();
    // const lazyElement = await screen.findByText("Книги");
    // expect(lazyElement).toBeInTheDocument();
    // expect(screen.getByTestId("BooksListPage")).toBeInTheDocument();

    // Wait for lazy component to load
    // const lazyElement = await waitFor(() => screen.getByTestId("BooksListPage"), { timeout: 1000 });
    // expect(lazyElement).toBeInTheDocument();
  });
});
