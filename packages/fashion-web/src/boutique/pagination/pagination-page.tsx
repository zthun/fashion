import {
  useFashionTheme,
  ZBooleanSwitch,
  ZBox,
  ZCaption,
  ZChoiceSelect,
  ZGrid,
  ZH3,
  ZIconFontAwesome,
  ZPagination,
  ZPaginationSizesMultiplesOfFive,
  ZPaginationSizesMultiplesOfTwelve,
  ZParagraph,
  ZStack,
} from "@zthun/fashion-boutique";
import { ZSizeFixed } from "@zthun/fashion-tailor";
import { ZBrandDataSourceFactory } from "@zthun/helpful-brands";
import {
  ZDataRequestBuilder,
  ZDataSourceStatic,
  ZDataSourceStaticOptionsBuilder,
} from "@zthun/helpful-query";
import { useMemo, useState } from "react";

import { ZFashionRoutePagination } from "../../routes.mjs";
import { ZCardDemoComponent } from "../common/card-demo-component.js";

const SourceError = new ZDataSourceStatic(
  new Error("Something went wrong"),
  new ZDataSourceStaticOptionsBuilder().delay(500).build(),
);
const SourceBrands = ZBrandDataSourceFactory.create();
const OptionMultiplesOf5 = {
  name: "Multiples of 5",
  value: ZPaginationSizesMultiplesOfFive,
};
const OptionMultiplesOf12 = {
  name: "Multiples of 12",
  value: ZPaginationSizesMultiplesOfTwelve,
};
const Options = [OptionMultiplesOf5, OptionMultiplesOf12];

/**
 * Represents a demo for pagination.
 *
 * @returns
 *        The JSX to render the pagination page.
 */
export function ZPaginationPage() {
  const [error, setError] = useState(false);
  const source = useMemo(() => (error ? SourceError : SourceBrands), [error]);
  const { body } = useFashionTheme();

  const [sizes, setSizes] = useState(OptionMultiplesOf5);
  const [request, setRequest] = useState(
    new ZDataRequestBuilder().size(12).build(),
  );

  return (
    <ZCardDemoComponent
      className="ZPaginationPage-root"
      TitleProps={{
        heading: ZFashionRoutePagination.name,
        subHeading: ZFashionRoutePagination.description,
        avatar: (
          <ZIconFontAwesome
            name={ZFashionRoutePagination.avatar}
            width={ZSizeFixed.Medium}
          />
        ),
      }}
    >
      <ZBox margin={{ bottom: ZSizeFixed.Large }}>
        <ZH3>Description</ZH3>

        <ZParagraph>
          Pagination is all about only showing the user a subset of the data so
          they won't get overwhelmed. A pagination component helps users
          navigate through paged data, allowing them to select their page size,
          and to select their page number.
        </ZParagraph>

        <ZBox
          margin={{ top: ZSizeFixed.ExtraLarge, bottom: ZSizeFixed.ExtraLarge }}
        >
          <ZPagination
            dataSource={source}
            value={request}
            onValueChange={setRequest}
            sizes={sizes.value}
          />
        </ZBox>

        <ZGrid columns={{ xl: "1fr 1fr", sm: "1fr" }} gap={ZSizeFixed.Medium}>
          <ZBox fashion={body} padding={ZSizeFixed.Small}>
            <ZStack gap={ZSizeFixed.Medium}>
              <ZH3 compact>Request</ZH3>
              <ZCaption compact>
                {JSON.stringify(request, undefined, 4)}
              </ZCaption>
            </ZStack>
          </ZBox>

          <ZStack gap={ZSizeFixed.Medium}>
            <ZH3 compact>Options</ZH3>
            <ZBooleanSwitch
              label="Error"
              value={error}
              onValueChange={setError}
              name="error"
            />
            <ZChoiceSelect
              label="Sizes"
              options={Options}
              value={sizes}
              onValueChange={setSizes}
              renderOption={(o) => o.name}
              name="sizes"
              indelible
            />
          </ZStack>
        </ZGrid>
      </ZBox>
    </ZCardDemoComponent>
  );
}
