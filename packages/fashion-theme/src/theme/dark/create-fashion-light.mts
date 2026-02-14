import { ZFashionStateBuilder } from "../../fashion/fashion-state.mjs";
import { ZFashionBuilder } from "../../fashion/fashion.mjs";

export function createFashionLight() {
  return new ZFashionBuilder()
    .name("Light")
    .idle(
      new ZFashionStateBuilder()
        .main("linear-gradient(180deg, #2A3442 0%, #1F2937 100%)")
        .contrast("#FFFFFF")
        .border("#3A4A5F")
        .build(),
    )
    .hover(
      new ZFashionStateBuilder()
        .main("linear-gradient(180deg, #323E4E 0%, #253142 100%)")
        .border("#4B5F78")
        .build(),
    )
    .focus(new ZFashionStateBuilder().border("#409CFF").build())
    .active(
      new ZFashionStateBuilder()
        .main("linear-gradient(180deg, #1F2937 0%, #18212D 100%)")
        .border("#2B5FB5")
        .build(),
    )
    .build();
}
