import { describe, expect, it } from "vitest";

import { createThemeDark } from "./create-theme-dark.mjs";

describe("Dark Theme", () => {
  it("should create the theme", () => {
    expect(createThemeDark()).toBeTruthy();
  });
});
