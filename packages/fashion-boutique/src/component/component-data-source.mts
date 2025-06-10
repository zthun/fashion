import type { IZDataSource } from "@zthun/helpful-query";

export interface IZComponentDataSource<T = any> {
  dataSource?: IZDataSource<T>;
}
