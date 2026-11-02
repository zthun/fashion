import { useCallback } from "react";

import { useLocation } from "./router-dom.mjs";

/**
 * How the match comparison should work.
 */
export enum ZRouteMatchStrategy {
  /**
   * Pathname must match path exactly.
   */
  Exact = "exact",
  /**
   * Pathname must start with path.
   */
  StartsWith = "starts-with",
}

/**
 * Options for route matching.
 */
export interface IZRouteMatchOptions {
  /**
   * The current match strategy.
   */
  strategy?: ZRouteMatchStrategy;
}

/**
 * Returns a method that returns if the current route matches any of the  given pathnames.
 *
 * The match strategy determines the equivalence check.  The returned method is O(n) where
 * n is the number of routes to match against.  If you know a static list of routes, use
 * useRouteMatch instead which caches the results across renders until the pathname changes.
 * If you only have 1 or 2 routes to check, you can just call this method directly without
 * any real hit to performance.
 *
 * @returns
 *         A stable function which takes two arguments, a path and a
 *         {@link ZRouteMatchStrategy} value and returns whether the current
 *         location pathname matches the given path.  
 */
export function useRouteMatcher() {
  const { pathname } = useLocation();

  return useCallback(
    (paths: string[], options: IZRouteMatchOptions = {}) => {
      const { strategy = ZRouteMatchStrategy.StartsWith } = options;

      const _path = paths.map((path) =>
        path
          .split("/")
          .filter((x) => !!x)
          .join("/")
          .toUpperCase(),
      );

      const _pathname = pathname
        .split("/")
        .filter((x) => !!x)
        .join("/")
        .toUpperCase();

      return _path.some((p) =>
        strategy === ZRouteMatchStrategy.Exact
          ? _pathname === p
          : _pathname.startsWith(p),
      );
    },
    [pathname],
  );
}
