import { ZCircusBy, ZCircusComponentModel } from "@zthun/cirque";
import { ZPaginationComponentModel } from "@zthun/fashion-boutique";

export class ZPaginationPageComponentModel extends ZCircusComponentModel {
  public static readonly Selector = ".ZPaginationPage-root";

  public pagination(): Promise<ZPaginationComponentModel> {
    return ZCircusBy.first(this.driver, ZPaginationComponentModel);
  }
}
