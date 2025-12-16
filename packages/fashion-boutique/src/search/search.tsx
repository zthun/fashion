import { ZSizeFixed } from "@zthun/fashion-tailor";
import { ZDataRequestBuilder, type IZDataRequest } from "@zthun/helpful-query";
import { useAmbassadorState } from "@zthun/helpful-react";
import type { IZComponentLabel } from "../component/component-label.mjs";
import type { IZComponentName } from "../component/component-name.mjs";
import type { IZComponentValue } from "../component/component-value.mjs";
import { ZIconFontAwesome } from "../icon/icon-font-awesome.js";
import { ZTextInput } from "../text/text-input.js";

export interface IZSearch
  extends IZComponentValue<IZDataRequest>, IZComponentLabel, IZComponentName {}

export function ZSearch(props: IZSearch) {
  const { label = "Search", name, value, onValueChange } = props;

  const [request, setRequest] = useAmbassadorState(
    value,
    onValueChange,
    new ZDataRequestBuilder().build(),
  );

  const handleSearch = (search: string) => {
    setRequest((r) =>
      new ZDataRequestBuilder().copy(r).search(search).page(1).build(),
    );
  };

  return (
    <ZTextInput
      label={label}
      className="ZRequestSearch-root"
      value={request.search}
      onValueChange={handleSearch}
      suffix={<ZIconFontAwesome name="search" width={ZSizeFixed.ExtraSmall} />}
      name={name}
    />
  );
}
