import { classes } from "./classes";

describe("CSS classes handler fn test", () => {
  test("с 1 параметром", () => {
    expect(classes("woo-hoo-wrapper")).toBe("woo-hoo-wrapper");
  });

  test("дополнительный класс", () => {
    expect(classes("woo-hoo-wrapper", {}, ["class1", "class2"]))
      .toBe("woo-hoo-wrapper class1 class2");
  });

  test("с дополнительным классом", () => {
    expect(classes(
      "woo-hoo-wrapper",
      { hovered: true, scrollable: true },
      ["class1", "class2"],
    )).toBe("woo-hoo-wrapper class1 class2 hovered scrollable");
  });

  test("с дополнительным классом: false", () => {
    expect(classes(
      "woo-hoo-wrapper",
      { hovered: true, scrollable: false },
      ["class1", "class2"],
    )).toBe("woo-hoo-wrapper class1 class2 hovered");
  });

  test("с дополнительным классом: undefined", () => {
    expect(classes(
      "woo-hoo-wrapper",
      { hovered: true, scrollable: undefined },
      ["class1", "class2"],
    )).toBe("woo-hoo-wrapper class1 class2 hovered");
  });
});
