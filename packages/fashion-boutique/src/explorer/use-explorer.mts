import { createContext, use } from "react";

export interface IZExplorerApi {
  expanded?: boolean;

  expand?: () => void;
  collapse?: () => void;
  toggle?: () => void;
}

export const ZExplorerContext = createContext<IZExplorerApi>({});
export const useExplorer = () => use(ZExplorerContext);
