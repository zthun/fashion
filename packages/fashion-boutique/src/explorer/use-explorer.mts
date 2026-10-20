import { createContext, use } from "react";

export interface IZExplorerState {
  expanded?: boolean;
}

export const ZExplorerContext = createContext<IZExplorerState>({});

export const useExplorer = () => use(ZExplorerContext);
