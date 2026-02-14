import { ZFashionStateBuilder } from "../../fashion/fashion-state.mjs";
import { ZFashionBuilder } from "../../fashion/fashion.mjs";

export function createFashionError() {
  return new ZFashionBuilder()
    .name("Error")
    .idle(
      new ZFashionStateBuilder()
        .foreground("#B91C1C")
        /*
        .background(
          "linear-gradient(90deg, #3A1216 0%, #B91C1C 50%, #250A0D 100%)",
        )
          */
        .contrast("#FFECEC")
        .border("#EF4444")
        .build(),
    )
    .hover(
      new ZFashionStateBuilder()
        .background(
          "linear-gradient(90deg, #4A151B 0%, #DC2626 50%, #2A0B0F 100%)",
        )
        .contrast("#FFFFFF")
        .border("#F87171")
        .build(),
    )
    .focus(new ZFashionStateBuilder().border("#FCA5A5").build())
    .active(
      new ZFashionStateBuilder()
        .background(
          "linear-gradient(90deg, #2F0F13 0%, #991B1B 50%, #1B070A 100%)",
        )
        .contrast("#FFECEC")
        .border("#DC2626")
        .build(),
    )
    .build();
}
