import type { IZMetadata } from "@zthun/helpful-query";
import type { IZComponentValue } from "../index.mjs";

export interface IZFormAuto extends IZComponentValue<any> {
  metadata?: IZMetadata[];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function ZFormAuto(_: IZFormAuto) {
  return <form className="ZFormAuto-root">Form Auto</form>;
}
