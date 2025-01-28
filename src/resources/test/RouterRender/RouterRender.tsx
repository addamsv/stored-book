import { render } from "@testing-library/react";
import { ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";

export interface IRouterRender {
  route: string;
}

export const RouterRender = (Component: ReactNode, options: IRouterRender) => {
  const { route } = options;

  return render(
    <MemoryRouter initialEntries={[]}>
      {Component}
    </MemoryRouter>
  );
};
