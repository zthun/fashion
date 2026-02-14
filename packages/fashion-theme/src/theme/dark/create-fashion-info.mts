import { ZFashionStateBuilder } from "../../fashion/fashion-state.mjs";
import { ZFashionBuilder } from "../../fashion/fashion.mjs";

export function createFashionInfo() {
  return new ZFashionBuilder()
    .name("Info")
    .idle(
      new ZFashionStateBuilder()
        .foreground("#0EA5E9")
        .background(
          "linear-gradient(90deg, #0A2433 0%, #0EA5E9 50%, #071A24 100%)",
        )
        .contrast("#E6F6FF")
        .border("#38BDF8")
        .build(),
    )
    .hover(
      new ZFashionStateBuilder()
        .background(
          "linear-gradient(90deg, #0B2B3D 0%, #38BDF8 50%, #081E2B 100%)",
        )
        .contrast("#FFFFFF")
        .border("#7DD3FC")
        .build(),
    )
    .focus(new ZFashionStateBuilder().border("#BAE6FD").build())
    .active(
      new ZFashionStateBuilder()
        .background(
          "linear-gradient(90deg, #071C28 0%, #0284C7 50%, #06151F 100%)",
        )
        .contrast("#E6F6FF")
        .border("#0EA5E9")
        .build(),
    )
    .build();
}
