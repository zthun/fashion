import { ZSizeFixed } from "@zthun/fashion-tailor";
import { cssJoinDefined } from "@zthun/helpful-fn";
import type { IZDataRequest } from "@zthun/helpful-query";
import { ZDataRequestBuilder, ZDataSourceStatic } from "@zthun/helpful-query";
import {
  isStateLoading,
  useAmbassadorState,
  useAsyncState,
} from "@zthun/helpful-react";
import type { ReactNode } from "react";
import { ZAlert } from "../alert/alert.js";
import { ZAsyncDataError } from "../async/async-data-error.js";
import { ZAsyncDataLoaded } from "../async/async-data-loaded.js";
import type { IZComponentDataSource } from "../component/component-data-source.mjs";
import type { IZComponentFooter } from "../component/component-footer.mjs";
import type { IZComponentHeading } from "../component/component-heading.mjs";
import type { IZComponentStyle } from "../component/component-style.mjs";
import type { IZComponentValueReadonly } from "../component/component-value.mjs";
import type { IZGrid } from "../grid/grid.js";
import { ZGrid } from "../grid/grid.js";
import { ZIconFontAwesome } from "../icon/icon-font-awesome.js";
import { ZStack } from "../stack/stack.js";
import { ZSuspenseProgress } from "../suspense/suspense-progress.js";
import type { IZSuspense } from "../suspense/suspense.mjs";
import { useFashionTheme } from "../theme/fashion.mjs";
import { ZH5 } from "../typography/typography.js";

export interface IZGridView<T = any>
  extends IZComponentStyle,
    IZComponentDataSource<T>,
    IZComponentValueReadonly<IZDataRequest>,
    IZComponentHeading,
    IZComponentFooter {
  GridProps?: Omit<IZGrid, "children">;
  SuspenseProps?: Omit<IZSuspense, "disabled" | "name">;

  renderItem: (item: T, index: number) => ReactNode;
  renderError?: (error: Error) => ReactNode;
}

const EmptyDataSource = new ZDataSourceStatic([]);

export function ZGridView<T = any>(props: IZGridView<T>) {
  const {
    GridProps,
    SuspenseProps,
    renderItem,
    heading,
    subHeading,
    footer,
    dataSource = EmptyDataSource,
    className,
    value,
  } = props;
  const [request] = useAmbassadorState(
    value,
    undefined,
    new ZDataRequestBuilder().build(),
  );
  const [data] = useAsyncState(
    () => dataSource.retrieve(request),
    [dataSource, request],
  );

  const theme = useFashionTheme();

  const renderView = (view: T[]) => {
    return (
      <ZStack gap={ZSizeFixed.Small}>
        <ZGrid {...GridProps}>
          {view.map((item, index) => renderItem(item, index))}
        </ZGrid>
      </ZStack>
    );
  };

  const renderError = (e: Error) => {
    return (
      <ZAlert
        className={cssJoinDefined("ZGridView-error")}
        name="grid-error"
        message={e.message}
        fashion={theme.error}
        heading={<ZH5 compact>Error</ZH5>}
        avatar={
          <ZIconFontAwesome
            name="circle-exclamation"
            width={ZSizeFixed.Small}
          />
        }
      />
    );
  };

  return (
    <ZStack
      className={cssJoinDefined("ZGridView-root", className)}
      gap={ZSizeFixed.Medium}
    >
      {heading}
      {subHeading}
      <ZSuspenseProgress
        {...SuspenseProps}
        name="grid-loading"
        disabled={!isStateLoading(data)}
      />
      <ZAsyncDataError value={data}>{renderError}</ZAsyncDataError>
      <ZAsyncDataLoaded value={data}>{renderView}</ZAsyncDataLoaded>
      {footer}
    </ZStack>
  );
}
