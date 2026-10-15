import { cloneDeep, isUndefined, omitBy } from "lodash-es";

import type { IZAvatarDescriptor } from "../avatar/avatar-descriptor.mjs";

/**
 * Represents  a ui routed path.
 */
export interface IZRoute {
  /**
   * The route path.
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
 * Represents a builder for an api option.
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
