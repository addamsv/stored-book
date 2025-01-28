import { fireEvent, render, screen } from "@testing-library/react";
import { RenderTest } from "resources/test/RenderTest/RenderTest";
import { Sidebar } from "./Sidebar";

describe("Проверка компонента <Sidebar />", () => {
  test("тест на присутствие компонента <Sidebar />", () => {
    RenderTest(<Sidebar />);
    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
  });

  test("тест на сворачивание  <Sidebar />", () => {
    RenderTest(<Sidebar />);
    expect(screen.getByTestId("sidebar")).toHaveClass("collapsed");
    const btn = screen.getByTestId("toggle-sidebar-btn");
    fireEvent.click(btn);
    expect(screen.getByTestId("sidebar")).not.toHaveClass("collapsed");
    // screen.debug();
  });
});
