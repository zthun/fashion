import { ZSizeFixed, ZSizeVaried } from "@zthun/fashion-tailor";
import { css, cssJoinDefined, ZOrientation } from "@zthun/helpful-fn";
import { useAmbassadorState } from "@zthun/helpful-react";
import type { ReactNode } from "react";
import { useCallback } from "react";

import { ZBox } from "../box/box.js";
import type { IZComponentHierarchy } from "../component/component-hierarchy.mjs";
import { ZIconFontAwesome } from "../icon/icon-font-awesome.js";
import { ZStack } from "../stack/stack.js";
import { useFashionTailor, useFashionTheme } from "../theme/fashion.mjs";
import { useCss } from "../theme/styled.js";
import { ZExplorerContext } from "./use-explorer.mjs";

export interface IZExplorer extends IZComponentHierarchy {
  expanded?: boolean;
  navigation?: ReactNode;

  onExpandedChange?: (value: boolean) => void;
}

export function ZExplorer({
  children,
  expanded,
  onExpandedChange,
  navigation,
}: IZExplorer) {
  const [_expanded, setExpanded] = useAmbassadorState(
    expanded,
    onExpandedChange,
    true,
  );

  const handleToggle = useCallback(() => setExpanded((x) => !x), [setExpanded]);

  const { surface } = useFashionTheme();

  const expand = "16rem";
  const collapse = "4rem";
  const width = _expanded ? expand : collapse;
  const tailor = useFashionTailor();
  const gap = tailor.gap(ZSizeFixed.Medium);

  const _className = useCss(css`
    .ZExplorer-nav {
      position: fixed;
      top: 0;
      bottom: 0;
      width: ${width};
    }

    .ZExplorer-sidebar {
      box-sizing: border-box;
      height: 100%;
      width: 100%;
      overflow: auto;
    }

    /* Two gaps are for the nav left gap and the right gap offset by the width */
    .ZExplorer-main {
      padding: ${gap};
      padding-left: calc(${width} + ${gap} + ${gap});
    }
  `);

  return (
    <ZExplorerContext value={{ expanded: _expanded }}>
      <div className={cssJoinDefined("ZExplorer-root", _className)}>
        <nav className="ZExplorer-nav">
          <ZBox
            className="ZExplorer-sidebar"
            fashion={surface}
            padding={ZSizeFixed.ExtraSmall}
          >
            <ZStack
              gap={ZSizeFixed.Small}
              width={ZSizeVaried.Full}
              height={ZSizeVaried.Full}
            >
              <header className="ZExplorer-sidebar-header">
                <ZStack
                  orientation={ZOrientation.Horizontal}
                  justify={{ content: _expanded ? "flex-end" : "center" }}
                  width={ZSizeVaried.Full}
                >
                  <ZIconFontAwesome
                    name={_expanded ? "minus" : "expand"}
                    width={ZSizeFixed.ExtraSmall}
                    onClick={handleToggle}
                  />
                </ZStack>
              </header>
              <article
                style={{ flexGrow: 1 }}
                className="ZExplorer-sidebar-content"
              >
                {navigation}
              </article>
            </ZStack>
          </ZBox>
        </nav>

        <main className="ZExplorer-main">{children}</main>
      </div>
    </ZExplorerContext>
  );
}
