import { ZFashionStateBuilder } from "../../fashion/fashion-state.mjs";
import { ZFashionBuilder } from "../../fashion/fashion.mjs";

export function createFashionWarning() {
  return new ZFashionBuilder()
    .name("Warning")
    .idle(
      new ZFashionStateBuilder()
        .main("linear-gradient(90deg, #3B2A10 0%, #B45309 50%, #2A1B0A 100%)")
        .contrast("#FFF4E6")
        .border("#F59E0B")
        .build(),
    )
    .hover(
      new ZFashionStateBuilder()
        .main("linear-gradient(90deg, #4A3313 0%, #D97706 50%, #2F1E0B 100%)")
        .contrast("#FFFFFF")
        .border("#FDBA74")
        .build(),
    )
    .focus(new ZFashionStateBuilder().border("#FDE68A").build())
    .active(
      new ZFashionStateBuilder()
        .main("linear-gradient(90deg, #2F220D 0%, #92400E 50%, #1F1508 100%)")
        .contrast("#FFF4E6")
        .border("#D97706")
        .build(),
    )
    .build();
}
