import { cssJoinDefined } from "@zthun/helpful-fn";
import type { IZDataRequest } from "@zthun/helpful-query";
import type { IZComponentDataSource } from "../component/component-data-source.mjs";
import type { IZComponentStyle } from "../component/component-style.mjs";
import type { IZComponentValue } from "../component/component-value.mjs";

export interface IZPagination
  extends IZComponentDataSource,
    IZComponentValue<IZDataRequest>,
    IZComponentStyle {}

export function ZPagination(props: IZPagination) {
  const { className } = props;

  return (
    <div className={cssJoinDefined("ZPagination-root", className)}>
      Pagination
    </div>
  );
}
