import { ZFashionStateBuilder } from "../../fashion/fashion-state.mjs";
import { ZFashionBuilder } from "../../fashion/fashion.mjs";

export function createFashionPrimary() {
  return new ZFashionBuilder()
    .name("Primary")
    .idle(
      new ZFashionStateBuilder()
        .foreground("#1E3A66")
        .background(
          "linear-gradient(90deg, #0B1B2E 0%, #1E3A66 45%, #060B14 100%)",
        )
        .contrast("#E6EDF3")
        .border("#243E66")
        .build(),
    )
    .hover(
      new ZFashionStateBuilder()
        .foreground("#2A4B80")
        .background(
          "linear-gradient(90deg, #0D223A 0%, #2A4B80 45%, #070E1A 100%)",
        )
        .contrast("#FFFFFF")
        .border("#3B6AAE")
        .build(),
    )
    .focus(
      new ZFashionStateBuilder()
        .foreground("#1E3A66")
        .contrast("#E6EDF3")
        .border("#409CFF")
        .build(),
    )
    .active(
      new ZFashionStateBuilder()
        .foreground("#162D52")
        .background(
          "linear-gradient(90deg, #091526 0%, #162D52 45%, #04070D 100%)",
        )
        .contrast("#E6EDF3")
        .border("#2B5FB5")
        .build(),
    )
    .build();
}
