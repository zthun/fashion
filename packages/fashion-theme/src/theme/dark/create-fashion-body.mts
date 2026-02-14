import { ZFashionStateBuilder } from "../../fashion/fashion-state.mjs";
import { ZFashionBuilder } from "../../fashion/fashion.mjs";

export function createFashionBody() {
  return new ZFashionBuilder()
    .name("Body")
    .idle(
      new ZFashionStateBuilder()
        .foreground("#0E141B")
        .background("linear-gradient(180deg, #0F1620 0%, #0C1218 100%)")
        .contrast("#E6EDF3")
        .border("#0C1218")
        .build(),
    )
    .hover(
      new ZFashionStateBuilder()
        .background("linear-gradient(180deg, #101A26 0%, #0D141C 100%)")
        .border("#1A2432")
        .build(),
    )
    .focus(new ZFashionStateBuilder().border("#409CFF").build())
    .active(
      new ZFashionStateBuilder()
        .background("linear-gradient(180deg, #0D141C 0%, #0A1016 100%)")
        .border("#2B5FB5")
        .build(),
    )
    .build();
}
