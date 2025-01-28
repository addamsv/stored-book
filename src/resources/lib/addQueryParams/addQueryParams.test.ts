import { getQueryParams } from "./addQueryParams";

describe("get add query params", () => {
  test("с 1 параметром", () => {
    const winParams = getQueryParams({
      key1: "val1"
    });
    expect(winParams).toBe("key1=val1");
  });

  test("с 2 параметроми", () => {
    const winParams = getQueryParams({
      key1: "val1",
      key2: "val2"
    });
    expect(winParams).toBe("key1=val1&key2=val2");
  });

  test("с undef", () => {
    const winParams = getQueryParams({
      key1: "val1",
      keyUnd: undefined,
      key2: "val2"
    });
    expect(winParams).toBe("key1=val1&key2=val2");
  });

  // test("дополнительный класс", () => {
  //   expect(classes("woo-hoo-wrapper", {}, ["class1", "class2"]))
  //     .toBe("woo-hoo-wrapper class1 class2");
  // });

  // test("с дополнительным классом", () => {
  //   expect(classes(
  //     "woo-hoo-wrapper",
  //     { hovered: true, scrollable: true },
  //     ["class1", "class2"],
  //   )).toBe("woo-hoo-wrapper class1 class2 hovered scrollable");
  // });

  // test("с дополнительным классом: false", () => {
  //   expect(classes(
  //     "woo-hoo-wrapper",
  //     { hovered: true, scrollable: false },
  //     ["class1", "class2"],
  //   )).toBe("woo-hoo-wrapper class1 class2 hovered");
  // });

  // test("с дополнительным классом: undefined", () => {
  //   expect(classes(
  //     "woo-hoo-wrapper",
  //     { hovered: true, scrollable: undefined },
  //     ["class1", "class2"],
  //   )).toBe("woo-hoo-wrapper class1 class2 hovered");
  // });
});
