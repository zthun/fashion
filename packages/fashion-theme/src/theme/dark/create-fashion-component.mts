import { ZFashionStateBuilder } from "../../fashion/fashion-state.mjs";
import { ZFashionBuilder } from "../../fashion/fashion.mjs";

export function createFashionComponent() {
  return new ZFashionBuilder()
    .name("Component")
    .idle(
      new ZFashionStateBuilder()
        .foreground("#2A3A50")
        .background("linear-gradient(180deg, #2F425C 0%, #233246 100%)")
        .contrast("#E6EDF3")
        .border("#3A4D69")
        .build(),
    )
    .hover(
      new ZFashionStateBuilder()
        .foreground("#344B6A")
        .background("linear-gradient(180deg, #365072 0%, #273852 100%)")
        .contrast("#FFFFFF")
        .border("#4B6385")
        .build(),
    )
    .focus(
      new ZFashionStateBuilder()
        .foreground("#2A3A50")
        .border("#409CFF")
        .build(),
    )
    .active(
      new ZFashionStateBuilder()
        .foreground("#223246")
        .background("linear-gradient(180deg, #273852 0%, #1D2A3B 100%)")
        .contrast("#E6EDF3")
        .border("#2B5FB5")
        .build(),
    )
    .build();
}
