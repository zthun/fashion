import { ZFashionStateBuilder } from "../../fashion/fashion-state.mjs";
import { ZFashionBuilder } from "../../fashion/fashion.mjs";

export function createFashionComponent() {
  return new ZFashionBuilder()
    .name("Component")
    .idle(
      new ZFashionStateBuilder()
        .foreground("#1A2330")
        .background("linear-gradient(180deg, #1A2330 0%, #151D28 100%)")
        .contrast("#E6EDF3")
        .border("#2B394D")
        .build(),
    )
    .hover(
      new ZFashionStateBuilder()
        .background("linear-gradient(180deg, #1F2A3A 0%, #182233 100%)")
        .contrast("#FFFFFF")
        .border("#3A4D69")
        .build(),
    )
    .focus(new ZFashionStateBuilder().border("#409CFF").build())
    .active(
      new ZFashionStateBuilder()
        .background("linear-gradient(180deg, #161E2A 0%, #111824 100%)")
        .border("#2B5FB5")
        .build(),
    )
    .build();
}
