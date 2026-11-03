import { ZUrlBuilder } from "@zthun/webigail-url";
import { cloneDeep, isUndefined, omitBy } from "lodash-es";

import type { IZAvatarDescriptor } from "../avatar/avatar-descriptor.mjs";
import { ZAvatarFontAwesomeBuilder } from "../avatar/avatar-font-awesome.mjs";

/**
 * Represents some kind of endpoint.
 */
export interface IZRoute {
  /**
   * The route path.
   *
   * This is the key of the route and should be unique to itself.
   * The route path can be a UI hash route, pathname route, full
   * url or file path.  The representation of this route path
   * is up to you.
   */
  path: string;

  /**
   * The display name of the route.
   */
  name?: string;

  /**
   * General description of the route content.
   */
  description?: string;

  /**
   * An avatar representation of the route.
   */
  avatar?: IZAvatarDescriptor;
}

/**
 * Represents a builder for an {@link IZRoute} object.
 */
export class ZRouteBuilder {
  private _route: IZRoute = { path: "" };

  /**
   * Specifies the route path.
   *
   * @param path -
   *        The route path.
   *
   * @returns
   *        This object.
   */
  public path(path: string): this {
    this._route.path = path;
    return this;
  }

  /**
   * Sets the display name of the route.
   *
   * @param name -
   *        The name.
   *
   * @returns
   *        This object.
   */
  public name(name: string): this {
    this._route.name = name;
    return this;
  }

  /**
   * Sets the description of the route.
   *
   * @param description -
   *        The route description.
   *
   * @returns
   *        This object.
   */
  public description(description: string): this {
    this._route.description = description;
    return this;
  }

  /**
   * Sets the avatar of the route.
   *
   * @param avatar -
   *        The avatar.
   *
   * @returns
   *        This object.
   */
  public avatar(avatar: IZAvatarDescriptor): this {
    this._route.avatar = avatar;
    return this;
  }

  /**
   * Sets the route descriptor to github.
   *
   * This sets the avatar to fontawesome's github brand icon,
   * path to the url to the target project, scope, or root, and the
   * name to "Github"
   *
   * @returns
   *        This object.
   */
  public github(): this;

  /**
   * Sets the route descriptor to github.
   *
   * This sets the avatar to fontawesome's github brand icon,
   * path to the url to the target project, scope, or root, and the
   * name to "Github"
   *
   * @param scope -
   *        The user or organization.
   *
   * @returns
   *        This object.
   */
  public github(scope: string): this;

  /**
   * Sets the route descriptor to github.
   *
   * This sets the avatar to fontawesome's github brand icon,
   * path to the url to the target project, scope, or root, and the
   * name to "Github"
   *
   * @param scope -
   *        The user or organization.
   * @param project
   *        The target project.
   *
   * @returns
   *        This object.
   */
  public github(scope: string, project: string): this;

  public github(scope?: string, project?: string): this {
    const url = new ZUrlBuilder().github(scope!, project!).build();
    const avatar = new ZAvatarFontAwesomeBuilder()
      .family("brands")
      .name("github")
      .build();

    return this.avatar(avatar).path(url).name("Github");
  }

  /**
   * Copies another route option to this object.
   *
   * @param other -
   *        The route option to copy.
   *
   * @returns
   *        This object.
   */
  public copy(other: IZRoute): this {
    this._route = cloneDeep(other);
    return this;
  }

  /**
   * Returns the route option.
   *
   * @returns
   *      A shallow copy of the built route object.
   */
  public build(): IZRoute {
    const route = cloneDeep(this._route);
    return omitBy(route, isUndefined) as IZRoute;
  }
}
