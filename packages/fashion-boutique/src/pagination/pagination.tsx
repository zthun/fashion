import { ZSizeFixed } from "@zthun/fashion-tailor";
import {
  cssJoinDefined,
  firstDefined,
  firstTruthy,
  ZOrientation,
} from "@zthun/helpful-fn";
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
  extends IZComponentDataSource,
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
    const { size, page } = request;
    const _size = firstTruthy(Infinity, size);
    const _page = firstDefined(1, page);
    const _totalPages = _size === Infinity ? 1 : Math.ceil(count / _size);

    const handlePageChange = (page: number) =>
      setRequest((r) => new ZDataRequestBuilder().copy(r).page(page).build());

    const handleSizeChange = (size: number) =>
      setRequest((r) => new ZDataRequestBuilder().copy(r).size(size).build());

    const renderSize = (val: number) => {
      return val === Infinity ? infinity : String(val);
    };

    return (
      <ZGrid columns={{ xl: "auto 1fr auto" }} align={{ items: "center" }}>
        <ZStack
          orientation={ZOrientation.Horizontal}
          gap={ZSizeFixed.ExtraSmall}
          align={{ items: "center" }}
        >
          <ZCaption compact>Show</ZCaption>
          <ZChoiceSelect
            value={_size}
            options={sizes}
            indelible
            onValueChange={handleSizeChange}
            name="size"
            display={renderSize}
          />
          <ZCaption compact>items per page</ZCaption>
        </ZStack>

        <ZStack
          orientation={ZOrientation.Horizontal}
          justify={{ content: "center" }}
          align={{ items: "center" }}
        >
          <ZCaption compact>({count} items)</ZCaption>
        </ZStack>

        <ZGrid
          columns="auto 7rem auto"
          align={{ items: "center" }}
          gap={ZSizeFixed.ExtraSmall}
        >
          <ZCaption compact>Page</ZCaption>
          <ZNumberInput
            value={_page}
            onValueChange={handlePageChange}
            min={1}
            max={_totalPages}
            name="page"
          />
          <ZCaption compact>of {_totalPages}</ZCaption>
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
