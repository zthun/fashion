import type { IZCircusDriver } from "@zthun/cirque";
import { ZCircusActBuilder, ZCircusComponentModel } from "@zthun/cirque";
import { firstDefined } from "@zthun/helpful-fn";
import { first } from "lodash-es";

export class ZExplorerTreeNodeComponentModel extends ZCircusComponentModel {
  public static readonly Selector = ".ZExplorerTreeNode-root";

  public async expander(): Promise<IZCircusDriver | null> {
    const expander = await this.driver.query(".ZExplorerTreeNode-expander");
    return firstDefined(null, first(expander));
  }

  public async content(): Promise<IZCircusDriver> {
    return this.driver.select(".ZExplorerTreeNode-content");
  }

  public async expanded(): Promise<boolean> {
    const expanded = await this.driver.attribute("data-expanded");
    return expanded !== "false";
  }

  public async highlighted(): Promise<boolean> {
    const highlighted = await this.driver.attribute("data-highlighted");
    return highlighted !== "false";
  }

  public async toggle(expanded?: boolean): Promise<void> {
    const current = await this.expanded();

    if (expanded === current) {
      return;
    }

    const content = await this.content();

    try {
      const act = new ZCircusActBuilder().click().build();
      await content.perform(act);
    } catch {
      // Happens if nonInteractive is true.
      return;
    }
  }

  public click = this.toggle.bind(this, undefined);

  public async avatar(): Promise<IZCircusDriver | null> {
    const content = await this.content();
    const avatar = await content.query(":scope > .ZExplorerTreeNode-avatar");
    return firstDefined(null, first(avatar));
  }

  public async heading(): Promise<IZCircusDriver | null> {
    const content = await this.content();
    const heading = await content.query(":scope > .ZExplorerTreeNode-heading");
    return firstDefined(null, first(heading));
  }
}
