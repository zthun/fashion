import {
  ZBooleanSwitch,
  ZBox,
  ZCard,
  ZGrid,
  ZGridView,
  ZH3,
  ZIconFontAwesome,
  ZPagination,
  ZPaginationSizesMultiplesOfFive,
  ZParagraph,
  ZRefresh,
  ZSearch,
  ZStack,
} from "@zthun/fashion-boutique";
import { ZSizeFixed } from "@zthun/fashion-tailor";
import type { IZBrand } from "@zthun/helpful-brands";
import { ZBrandKnown } from "@zthun/helpful-brands";
import { ZOrientation } from "@zthun/helpful-fn";
import {
  ZDataRequestBuilder,
  ZDataSearchFields,
  ZDataSourceStatic,
  ZDataSourceStaticOptionsBuilder,
} from "@zthun/helpful-query";
import { useState } from "react";

import { ZFashionRouteGridView } from "../../routes.mjs";
import { ZCardDemoComponent } from "../common/card-demo-component.js";

const ZBrandDataSourceOptions = new ZDataSourceStaticOptionsBuilder()
  .search(new ZDataSearchFields(["id", "name"]))
  .delay(1000)
  .build();
const ZBrandDataSource = new ZDataSourceStatic(
  ZBrandKnown.all(),
  ZBrandDataSourceOptions,
);
const ZErrorDataSource = new ZDataSourceStatic(
  new Error("Unable to load brands.  An unexpected error occurred."),
  ZBrandDataSourceOptions,
);

/**
 * Represents a demo for grid views.
 *
 * @returns The JSX to render the page.
 */
export function ZGridViewPage() {
  const [request, setRequest] = useState(() =>
    new ZDataRequestBuilder().size(25).page(1).build(),
  );
  const [dataSource, setDataSource] = useState(ZBrandDataSource);
  const renderItem = (item: IZBrand) => (
    <ZCard
      key={item.id}
      TitleProps={{
        heading: item.name,
        avatar: <ZIconFontAwesome name="hashtag" />,
      }}
    >
      <ZStack
        justify={{ content: "center" }}
        orientation={ZOrientation.Horizontal}
      >
        <ZIconFontAwesome
          family="brands"
          name={item.id}
          width={{ xl: ZSizeFixed.Large, xs: ZSizeFixed.Medium }}
        />
      </ZStack>
    </ZCard>
  );

  const toggleDataSource = () => {
    setDataSource((d) =>
      d === ZBrandDataSource ? ZErrorDataSource : ZBrandDataSource,
    );
  };

  return (
    <ZCardDemoComponent
      className="ZGridViewPage-root"
      TitleProps={{
        heading: ZFashionRouteGridView.name,
        subHeading: ZFashionRouteGridView.description,
        avatar: (
          <ZIconFontAwesome
            name={ZFashionRouteGridView.avatar}
            width={ZSizeFixed.Medium}
          />
        ),
      }}
    >
      <ZBox margin={{ bottom: ZSizeFixed.Large }}>
        <ZH3>Description</ZH3>

        <ZParagraph>
          You will eventually need to deal with large amounts of list data. The
          recommended way to display this data is with a grid view in the
          fashion system. Other options can include tables, but it is better to
          use something that is more mobile friendly in general and grid views
          tend to be very responsive to this effort.
        </ZParagraph>
      </ZBox>

      <ZGridView
        GridProps={{
          gap: ZSizeFixed.Small,
          columns: {
            xl: "1fr 1fr 1fr 1fr 1fr",
            lg: "1fr 1fr 1fr 1fr",
            md: "1fr 1fr 1fr",
            sm: "1fr 1fr",
            xs: "1fr",
          },
        }}
        heading={
          <ZGrid
            columns="1fr auto"
            align={{ items: "end" }}
            gap={ZSizeFixed.Small}
          >
            <ZSearch value={request} onValueChange={setRequest} />
            <ZRefresh value={request} onValueChange={setRequest} />
          </ZGrid>
        }
        footer={
          <ZPagination
            value={request}
            onValueChange={setRequest}
            dataSource={dataSource}
            sizes={ZPaginationSizesMultiplesOfFive}
          />
        }
        renderItem={renderItem}
        dataSource={dataSource}
        value={request}
      />

      <ZBox margin={{ top: ZSizeFixed.Large }}>
        <ZH3>Options</ZH3>

        <ZGrid gap={ZSizeFixed.Small}>
          <ZBooleanSwitch
            label="Error"
            value={dataSource === ZErrorDataSource}
            onValueChange={toggleDataSource}
          />
        </ZGrid>
      </ZBox>
    </ZCardDemoComponent>
  );
}
