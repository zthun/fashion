import { createContext, use } from "react";

export interface IZExplorerApi {
  expanded?: boolean;

  toggle?: (expanded?: boolean) => void;
}

export const ZExplorerContext = createContext<IZExplorerApi>({});
export const useExplorer = () => use(ZExplorerContext);
