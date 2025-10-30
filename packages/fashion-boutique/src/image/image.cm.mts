import { ZCircusComponentModel } from "@zthun/cirque";

/**
 * Represents the component model for an image source.
 */
export class ZImageComponentModel extends ZCircusComponentModel {
  public static readonly Selector = ".ZImage-root";

  /**
   * Gets the image name.
   *
   * @returns
   *        The name of the image.
   */
  public name(): Promise<string | null> {
    return this.driver.attribute("data-name");
  }

  private async isTag(wanted: "DIV" | "SVG" | "IMG"): Promise<boolean> {
    const tag = await this.driver.tag();

    return tag.toUpperCase().localeCompare(wanted.toUpperCase()) === 0;
  }

  /**
   * Gets a value that determines if this image is using an svg element.
   *
   * @returns
   *        True if the underlying image source is an svg.
   */
  public svg = this.isTag.bind(this, "SVG");

  /**
   * Gets a value that determines if this image is using an img element.
   *
   * @returns
   *        True if the underlying image source is an img.
   */
  public img = this.isTag.bind(this, "IMG");

  /**
   * Gets a value that determines if the image is empty.
   *
   * @returns
   *        True if the underlying image is empty.
   */
  public empty = this.isTag.bind(this, "DIV");
}
