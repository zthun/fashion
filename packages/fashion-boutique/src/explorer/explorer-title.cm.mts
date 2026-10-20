import type { IZCircusDriver } from "@zthun/cirque";
import { ZCircusBy, ZCircusComponentModel } from "@zthun/cirque";
import { optional } from "@zthun/helpful-fn";

import { ZIconComponentModel } from "../icon/icon.cm.mjs";
import { ZImageComponentModel } from "../image/image.cm.mjs";

export class ZExplorerTitleComponentModel extends ZCircusComponentModel {
  public static readonly Selector = ".ZExplorerTitle-root";

  public icon(): Promise<ZIconComponentModel | null> {
    return ZCircusBy.optional(this.driver, ZIconComponentModel);
  }

  public image(): Promise<ZImageComponentModel | null> {
    return ZCircusBy.optional(this.driver, ZImageComponentModel);
  }

  public heading(): Promise<IZCircusDriver | null> {
    return optional(this.driver.select(".ZExplorerTitle-heading"));
  }
}
