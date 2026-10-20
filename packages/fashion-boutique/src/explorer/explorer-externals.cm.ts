import { ZCircusBy, ZCircusComponentModel } from "@zthun/cirque";

import { ZLinkComponentModel } from "../link/link.cm.mjs";

export class ZExplorerExternalsComponentModel extends ZCircusComponentModel {
  public static readonly Selector = ".ZExplorerExternals-root";

  public links(): Promise<ZLinkComponentModel[]> {
    return ZCircusBy.all(this.driver, ZLinkComponentModel);
  }
}
