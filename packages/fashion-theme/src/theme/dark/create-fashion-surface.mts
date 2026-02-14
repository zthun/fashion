import { ZFashionStateBuilder } from "../../fashion/fashion-state.mjs";
import { ZFashionBuilder } from "../../fashion/fashion.mjs";

export function createFashionSurface() {
  return new ZFashionBuilder()
    .name("Surface")
    .idle(
      new ZFashionStateBuilder()
        .background("linear-gradient(180deg, #1C2634 0%, #16202C 100%)")
        .contrast("#E6EDF3")
        .border("#2B394D")
        .build(),
    )
    .hover(
      new ZFashionStateBuilder()
        .background("linear-gradient(180deg, #222E3E 0%, #1A2634 100%)")
        .border("#3A4D69")
        .build(),
    )
    .focus(new ZFashionStateBuilder().border("#409CFF").build())
    .active(
      new ZFashionStateBuilder()
        .background("linear-gradient(180deg, #18212D 0%, #131B25 100%)")
        .border("#2B5FB5")
        .build(),
    )
    .build();
}
