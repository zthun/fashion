import { ZSizeFixed } from "@zthun/fashion-tailor";
import { cssJoinDefined } from "@zthun/helpful-fn";
import type { IZDataRequest } from "@zthun/helpful-query";
import { ZDataRequestBuilder, ZDataSourceStatic } from "@zthun/helpful-query";
import {
  isStateErrored,
  isStateLoading,
  useAmbassadorState,
  useMoreViewState,
} from "@zthun/helpful-react";
import type { ReactNode } from "react";
import { ZAlert } from "../alert/alert.js";
import type { IZButton } from "../button/button.js";
import { ZButton } from "../button/button.js";
import type { IZComponentDataSource } from "../component/component-data-source.mjs";
import type { IZComponentHeight } from "../component/component-height.mjs";
import type { IZComponentLoading } from "../component/component-loading.mjs";
import type { IZComponentStyle } from "../component/component-style.mjs";
import type { IZComponentValue } from "../component/component-value.mjs";
import type { IZComponentWidth } from "../component/component-width.mjs";
import type { IZGrid } from "../grid/grid.js";
import { ZGrid } from "../grid/grid.js";
import { ZIconFontAwesome } from "../icon/icon-font-awesome.js";
import { ZStack } from "../stack/stack.js";
import { ZSuspenseProgress } from "../suspense/suspense-progress.js";
import type { IZSuspense } from "../suspense/suspense.mjs";
import { ZTextInput } from "../text/text-input.js";
import type { IZText } from "../text/text.js";
import { useFashionTheme } from "../theme/fashion.mjs";
import { ZH5 } from "../typography/typography.js";

export interface IZGridView<T = any>
  extends IZComponentStyle,
    IZComponentDataSource<T>,
    IZComponentValue<IZDataRequest> {
  GridProps?: Omit<IZGrid, "children">;
  SuspenseProps?: Omit<
    IZSuspense,
    keyof IZComponentLoading | keyof IZComponentWidth | keyof IZComponentHeight
  >;
  SearchProps?:
    | Omit<IZText, "value" | "onValueChange" | "className" | "name">
    | false;
  MoreProps?: Omit<IZButton, "onClick" | "name">;

  renderItem: (item: T, index: number) => ReactNode;
  renderError?: (error: Error) => ReactNode;
}

const EmptyDataSource = new ZDataSourceStatic([]);
const DefaultPageSize = 12;
const DefaultRequest = new ZDataRequestBuilder()
  .size(DefaultPageSize)
  .page(1)
  .build();

export function ZGridView<T = any>(props: IZGridView<T>) {
  const {
    GridProps,
    SearchProps,
    SuspenseProps,
    MoreProps,
    renderItem,
    dataSource = EmptyDataSource,
    className,
    value,
    onValueChange,
  } = props;
  const [request, setRequest] = useAmbassadorState(
    value,
    onValueChange,
    DefaultRequest,
  );
  const { view, last, complete, more } = useMoreViewState(dataSource, request);
  const theme = useFashionTheme();

  const renderSearch = () => {
    if (SearchProps === false) {
      return null;
    }

    const handleSearch = (search: string) => {
      setRequest((r) =>
        new ZDataRequestBuilder().copy(r).search(search).page(1).build(),
      );
    };

    return (
      <ZTextInput
        label="Search"
        {...SearchProps}
        className="ZGridView-search"
        value={request.search}
        onValueChange={handleSearch}
        name="search"
      />
    );
  };

  const renderView = () => {
    return (
      <ZGrid {...GridProps}>
        {view.map((item, index) => renderItem(item, index))}
      </ZGrid>
    );
  };

  const renderError = () => {
    if (!isStateErrored(last)) {
      return;
    }

    return (
      <ZAlert
        className={cssJoinDefined("ZGridView-error")}
        name="grid-error"
        message={last.message}
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

  const renderMore = () => {
    return (
      <>
        <ZSuspenseProgress
          {...SuspenseProps}
          className="ZGridView-loading"
          height={ZSizeFixed.Medium}
          disabled={!isStateLoading(last)}
          name="grid-loading"
        />
        {!complete && (
          <ZButton
            label="More..."
            disabled={isStateLoading(last) || isStateErrored(last)}
            fashion={theme.secondary}
            {...MoreProps}
            className={cssJoinDefined("ZGridView-more", MoreProps?.className)}
            onClick={more}
            name="grid-more"
          />
        )}
      </>
    );
  };

  return (
    <ZStack
      className={cssJoinDefined("ZGridView-root", className)}
      gap={ZSizeFixed.Medium}
    >
      {renderSearch()}
      {renderView()}
      {renderError()}
      {renderMore()}
    </ZStack>
  );
}
