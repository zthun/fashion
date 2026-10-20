import { ZCircusComponentModel } from "@zthun/cirque";

import { ZListComponentModel } from "../list/list.cm.mjs";

export class ZExplorerListNavComponentModel extends ZCircusComponentModel {
  public static readonly Selector = ".ZExplorerListNav-root";

  public list(): Promise<ZListComponentModel> {
    return Promise.resolve(new ZListComponentModel(this.driver));
  }
}
