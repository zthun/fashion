import { ZSizeFixed } from "@zthun/fashion-tailor";
import { cssJoinDefined, ZOrientation } from "@zthun/helpful-fn";
import type { IZDataRequest } from "@zthun/helpful-query";
import { ZDataRequestBuilder, ZDataSourceStatic } from "@zthun/helpful-query";
import {
  isStateLoading,
  useAmbassadorState,
  useAsyncState,
} from "@zthun/helpful-react";
import { ZAsyncDataError } from "../async/async-data-error.js";
import { ZAsyncDataLoaded } from "../async/async-data-loaded.js";
import { ZBox } from "../box/box.js";
import { ZChoiceSelect } from "../choice/choice-select.js";
import type { IZComponentDataSource } from "../component/component-data-source.mjs";
import type { IZComponentStyle } from "../component/component-style.mjs";
import type { IZComponentValue } from "../component/component-value.mjs";
import { ZGrid } from "../grid/grid.js";
import { ZIconFontAwesome } from "../icon/icon-font-awesome.js";
import { ZNumberInput } from "../number/number-input.js";
import { ZStack } from "../stack/stack.js";
import { ZSuspenseProgress } from "../suspense/suspense-progress.js";
import { useFashionTheme } from "../theme/fashion.mjs";
import { ZCaption } from "../typography/typography.js";

export interface IZPagination
  extends
    IZComponentDataSource,
    IZComponentValue<IZDataRequest>,
    IZComponentStyle {
  /**
   * The sizes that appear in the size choice.
   */
  sizes?: number[];

  /**
   * The text value to render for infinity.
   *
   * Defaults to all.
   */
  infinity?: string;
}

export const ZPaginationSizesMultiplesOfFive = [25, 50, 100, 200];
export const ZPaginationSizesMultiplesOfTwelve = [24, 48, 96, 192];

// Since the grid view is my most common usage of this,
// a twelve based page size works best.
const DefaultSizes = ZPaginationSizesMultiplesOfTwelve;
const DefaultRequest = new ZDataRequestBuilder().size(24).build();
const EmptySource = new ZDataSourceStatic([]);

export function ZPagination(props: IZPagination) {
  const {
    className,
    dataSource = EmptySource,
    infinity = "All",
    value,
    onValueChange,
    sizes = DefaultSizes,
  } = props;

  const { error, component } = useFashionTheme();

  const [request, setRequest] = useAmbassadorState(
    value,
    onValueChange,
    DefaultRequest,
  );

  const [count] = useAsyncState(
    () => dataSource.count(request),
    [dataSource, request.filter, request.search],
  );

  const renderError = (e: Error) => {
    return (
      <ZBox
        className="ZPagination-error"
        fashion={error}
        padding={ZSizeFixed.ExtraSmall}
        border={{ width: ZSizeFixed.ExtraSmall }}
        data-name="error"
      >
        <ZGrid
          columns="auto 1fr"
          align={{ items: "center" }}
          gap={ZSizeFixed.ExtraSmall}
        >
          <ZIconFontAwesome
            name="exclamation-circle"
            width={ZSizeFixed.Small}
          />
          <ZCaption className="ZPagination-error-message" compact>
            {e.message}
          </ZCaption>
        </ZGrid>
      </ZBox>
    );
  };

  const renderPagination = (count: number) => {
    const { size = Infinity, page = 1 } = request;
    const _totalPages = size === Infinity ? 1 : Math.ceil(count / size);

    const handlePageChange = (page: number) =>
      setRequest((r) => new ZDataRequestBuilder().copy(r).page(page).build());

    const handleSizeChange = (size: number) =>
      setRequest((r) => new ZDataRequestBuilder().copy(r).size(size).build());

    const renderSize = (val: number) => {
      return val === Infinity ? infinity : String(val);
    };

    return (
      <ZGrid
        columns={{ xl: "1fr auto", sm: "1fr" }}
        align={{ items: "center" }}
        gap={ZSizeFixed.Medium}
      >
        <ZStack
          orientation={ZOrientation.Horizontal}
          align={{ items: "center" }}
        >
          <ZCaption compact>{count} items</ZCaption>
        </ZStack>

        <ZGrid
          columns={{ xl: "7rem auto 7rem auto", sm: "1fr auto 1fr auto" }}
          gap={ZSizeFixed.ExtraSmall}
          align={{ items: "center" }}
        >
          <ZChoiceSelect
            value={size}
            options={sizes}
            indelible
            onValueChange={handleSizeChange}
            name="size"
            display={renderSize}
          />
          <ZCaption compact>items on page</ZCaption>
          <ZNumberInput
            value={page}
            onValueChange={handlePageChange}
            min={1}
            max={_totalPages}
            name="page"
          />
          <ZCaption compact>/ {_totalPages}</ZCaption>
        </ZGrid>
      </ZGrid>
    );
  };

  return (
    <ZBox
      className={cssJoinDefined("ZPagination-root", className)}
      fashion={component}
      padding={ZSizeFixed.ExtraSmall}
      border={{ radius: ZSizeFixed.ExtraSmall }}
    >
      <ZSuspenseProgress disabled={!isStateLoading(count)} />
      <ZAsyncDataError value={count}>{renderError}</ZAsyncDataError>
      <ZAsyncDataLoaded value={count}>{renderPagination}</ZAsyncDataLoaded>
    </ZBox>
  );
}
