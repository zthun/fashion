import { ZFashionStateBuilder } from "../../fashion/fashion-state.mjs";
import { ZFashionBuilder } from "../../fashion/fashion.mjs";

export function createFashionSecondary() {
  return new ZFashionBuilder()
    .name("Secondary")
    .idle(
      new ZFashionStateBuilder()
        .background(
          "linear-gradient(90deg, #1B5FAF 0%, #409CFF 50%, #2563EB 100%)",
        )
        .contrast("#FFFFFF")
        .border("#409CFF")
        .build(),
    )
    .hover(
      new ZFashionStateBuilder()
        .background(
          "linear-gradient(90deg, #2563EB 0%, #55A8FF 50%, #2B5FB5 100%)",
        )
        .contrast("#FFFFFF")
        .border("#55A8FF")
        .build(),
    )
    .focus(
      new ZFashionStateBuilder().contrast("#FFFFFF").border("#9AD5FF").build(),
    )
    .active(
      new ZFashionStateBuilder()
        .background(
          "linear-gradient(90deg, #16498F 0%, #2B5FB5 50%, #1B4ED8 100%)",
        )
        .contrast("#E6EDF3")
        .border("#2B5FB5")
        .build(),
    )
    .build();
}
