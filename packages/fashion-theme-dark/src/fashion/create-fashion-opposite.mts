import { ZFashionBuilder } from "@zthun/fashion-theme";

import { createFashionLight } from "./create-fashion-light.mjs";

export function createFashionOpposite() {
  return new ZFashionBuilder()
    .copy(createFashionLight())
    .name("Opposite")
    .build();
}
