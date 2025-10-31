import { ZSizeFixed } from "@zthun/fashion-tailor";

import {
  ZBox,
  ZCard,
  ZH3,
  ZIconFontAwesome,
  ZPagination,
  ZParagraph,
} from "@zthun/fashion-boutique";
import { ZBrandDataSourceFactory } from "@zthun/helpful-brands";
import { ZDataRequestBuilder } from "@zthun/helpful-query";
import { useMemo, useState } from "react";
import { ZFashionRoutePagination } from "../../routes.mjs";

/**
 * Represents a demo for pagination.
 *
 * @returns
 *        The JSX to render the pagination page.
 */
export function ZPaginationPage() {
  const source = useMemo(() => ZBrandDataSourceFactory.create(), []);
  const [request, setRequest] = useState(new ZDataRequestBuilder().build());

  return (
    <ZCard
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
          />
        </ZBox>
      </ZBox>
    </ZCard>
  );
}
