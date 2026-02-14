import { ZFashionStateBuilder } from "../../fashion/fashion-state.mjs";
import { ZFashionBuilder } from "../../fashion/fashion.mjs";

export function createFashionDark() {
  return new ZFashionBuilder()
    .name("Dark")
    .idle(
      new ZFashionStateBuilder()
        .background("linear-gradient(180deg, #0A1016 0%, #070C11 100%)")
        .contrast("#E6EDF3")
        .border("#0F1620")
        .build(),
    )
    .hover(
      new ZFashionStateBuilder()
        .background("linear-gradient(180deg, #0C141C 0%, #091018 100%)")
        .border("#1A2432")
        .build(),
    )
    .focus(new ZFashionStateBuilder().border("#409CFF").build())
    .active(
      new ZFashionStateBuilder()
        .background("linear-gradient(180deg, #070C11 0%, #05090D 100%)")
        .border("#2B5FB5")
        .build(),
    )
    .build();
}
