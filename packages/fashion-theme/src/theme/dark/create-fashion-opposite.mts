import { ZFashionBuilder } from "../../fashion/fashion.mjs";
import { createFashionLight } from "./create-fashion-light.mjs";

export function createFashionOpposite() {
  return new ZFashionBuilder()
    .copy(createFashionLight())
    .name("Opposite")
    .build();
}
