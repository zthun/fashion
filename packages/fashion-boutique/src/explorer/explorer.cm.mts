import type { IZCircusDriver } from "@zthun/cirque";
import { ZCircusActBuilder, ZCircusComponentModel } from "@zthun/cirque";
import { optional, sleep } from "@zthun/helpful-fn";

export class ZExplorerComponentModel extends ZCircusComponentModel {
  public static readonly Selector = ".ZExplorer-root";

  public toggler(): Promise<IZCircusDriver> {
    return this.driver.select(".ZExplorer-sidebar-toggler");
  }

  public async expanded(): Promise<boolean> {
    const expanded = await this.driver.attribute("data-expanded");

    return expanded === "true";
  }

  public async open(opened: boolean = true) {
    const expanded = await this.expanded();

    if (expanded === opened) {
      // Already in the state we want to be in.
      return;
    }

    const toggle = await this.toggler();

    const act = new ZCircusActBuilder().click().build();
    await toggle.perform(act);

    // Wait for animations to complete.
    await sleep(500);
  }

  public sidebar(): Promise<IZCircusDriver> {
    return this.driver.select(".ZExplorer-sidebar-content");
  }

  public main(): Promise<IZCircusDriver> {
    return this.driver.select(".ZExplorer-main");
  }

  public backdrop(): Promise<IZCircusDriver | null> {
    return optional(this.driver.select(".ZExplorer-backdrop"), null);
  }
}
