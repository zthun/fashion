import { ZFashionBuilder, ZFashionStateBuilder } from "@zthun/fashion-theme";

export function createFashionLight() {
  return new ZFashionBuilder()
    .name("Light")
    .idle(
      new ZFashionStateBuilder()
        .foreground("#F3F6FA")
        //.background("linear-gradient(180deg, #FFFFFF 0%, #EEF2F7 100%)")
        .contrast("#0B1118")
        .border("#CBD5E1")
        .build(),
    )
    .hover(
      new ZFashionStateBuilder()
        .foreground("#FFFFFF")
        .background("linear-gradient(180deg, #FFFFFF 0%, #E8EEF6 100%)")
        .contrast("#0B1118")
        .border("#94A3B8")
        .build(),
    )
    .focus(
      new ZFashionStateBuilder()
        .foreground("#F3F6FA")
        .border("#409CFF")
        .build(),
    )
    .active(
      new ZFashionStateBuilder()
        .foreground("#E8EEF6")
        .background("linear-gradient(180deg, #F1F5F9 0%, #E2E8F0 100%)")
        .contrast("#0B1118")
        .border("#64748B")
        .build(),
    )
    .build();
}
