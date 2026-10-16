import { ZSizeFixed, ZSizeVaried } from "@zthun/fashion-tailor";
import { css, cssJoinDefined, ZOrientation } from "@zthun/helpful-fn";
import { useAmbassadorState } from "@zthun/helpful-react";
import type { ReactNode } from "react";
import { useCallback } from "react";

import { ZBox } from "../box/box.js";
import type { IZComponentHierarchy } from "../component/component-hierarchy.mjs";
import { ZIconFontAwesome } from "../icon/icon-font-awesome.js";
import { ZStack } from "../stack/stack.js";
import {
  useFashionDevice,
  useFashionTailor,
  useFashionTheme,
} from "../theme/fashion.mjs";
import { useCss } from "../theme/styled.js";
import { ZExplorerContext } from "./use-explorer.mjs";

export interface IZExplorer extends IZComponentHierarchy {
  expanded?: boolean;
  sidebar?: ReactNode;

  onExpandedChange?: (value: boolean) => void;
}

export function ZExplorer({
  children,
  expanded,
  onExpandedChange,
  sidebar,
}: IZExplorer) {
  const [_expanded, setExpanded] = useAmbassadorState(
    expanded,
    onExpandedChange,
    false,
  );

  const handleToggle = useCallback(() => setExpanded((x) => !x), [setExpanded]);
  const handleClose = useCallback(() => setExpanded(false), [setExpanded]);

  const { surface } = useFashionTheme();
  const device = useFashionDevice();

  const expand = "16rem";
  const collapse = "4rem";
  const width = _expanded ? expand : collapse;
  const tailor = useFashionTailor();
  const gap = tailor.gap(ZSizeFixed.Medium);

  const _className = useCss(css`
    .ZExplorer-backdrop {
      display: none;
      position: fixed;
      inset: 0;
      width: 100%;
      height: 100%;
      padding: 0;
      border: 0;
      background: rgba(0, 0, 0, 0.33);
      z-index: 5000;
    }

    .ZExplorer-nav {
      position: fixed;
      top: 0;
      bottom: 0;
      width: ${width};
      z-index: 5001;
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

    ${device.break(ZSizeFixed.Medium)} {
      .ZExplorer-backdrop {
        display: block;
      }

      .ZExplorer-sidebar {
        box-shadow: 0.5rem 0 0.5rem rgba(0, 0, 0, 0.33);
      }

      .ZExplorer-main {
        padding-left: calc(${collapse} + ${gap});
      }
    }
  `);

  return (
    <ZExplorerContext value={{ expanded: _expanded }}>
      <div className={cssJoinDefined("ZExplorer-root", _className)}>
        {_expanded && (
          <button
            type="button"
            className="ZExplorer-backdrop"
            aria-label="Close sidebar"
            onClick={handleClose}
          />
        )}
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
                {sidebar}
              </article>
            </ZStack>
          </ZBox>
        </nav>

        <main className="ZExplorer-main">{children}</main>
      </div>
    </ZExplorerContext>
  );
}
