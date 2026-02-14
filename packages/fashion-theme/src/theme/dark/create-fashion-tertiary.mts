import { ZFashionStateBuilder } from "../../fashion/fashion-state.mjs";
import { ZFashionBuilder } from "../../fashion/fashion.mjs";

export function createFashionTertiary() {
  return new ZFashionBuilder()
    .name("Tertiary")
    .idle(
      new ZFashionStateBuilder()
        .foreground("#22D3EE")
        /*
        .background(
          "linear-gradient(90deg, #0B3A44 0%, #22D3EE 50%, #0E7490 100%)",
        )
          */
        .contrast("#081018")
        .border("#22D3EE")
        .build(),
    )
    .hover(
      new ZFashionStateBuilder()
        .foreground("#67E8F9")
        .background(
          "linear-gradient(90deg, #0E4A57 0%, #67E8F9 50%, #0891B2 100%)",
        )
        .contrast("#081018")
        .border("#67E8F9")
        .build(),
    )
    .focus(
      new ZFashionStateBuilder()
        .foreground("#22D3EE")
        .border("#BAE6FD")
        .build(),
    )
    .active(
      new ZFashionStateBuilder()
        .foreground("#0EA5B7")
        .background(
          "linear-gradient(90deg, #082C33 0%, #0EA5B7 50%, #0E7490 100%)",
        )
        .contrast("#081018")
        .border("#0EA5B7")
        .build(),
    )
    .build();
}
