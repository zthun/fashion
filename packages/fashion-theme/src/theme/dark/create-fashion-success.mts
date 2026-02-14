import { ZFashionStateBuilder } from "../../fashion/fashion-state.mjs";
import { ZFashionBuilder } from "../../fashion/fashion.mjs";

export function createFashionSuccess() {
  return new ZFashionBuilder()
    .name("Success")
    .idle(
      new ZFashionStateBuilder()
        .background(
          "linear-gradient(90deg, #0F3D2E 0%, #166534 50%, #0A2F22 100%)",
        )
        .contrast("#E6F8F2")
        .border("#22C55E")
        .build(),
    )
    .hover(
      new ZFashionStateBuilder()
        .background(
          "linear-gradient(90deg, #145C44 0%, #16A34A 50%, #0F3D2E 100%)",
        )
        .border("#34D399")
        .build(),
    )
    .focus(new ZFashionStateBuilder().border("#6EE7B7").build())
    .active(
      new ZFashionStateBuilder()
        .background(
          "linear-gradient(90deg, #0C2E23 0%, #14532D 50%, #08241B 100%)",
        )
        .border("#15803D")
        .build(),
    )
    .build();
}
