import { ZSizeFixed } from "@zthun/fashion-tailor";
import { ZDataRequestBuilder, type IZDataRequest } from "@zthun/helpful-query";
import { useAmbassadorState } from "@zthun/helpful-react";
import type { MouseEvent } from "react";
import { ZButton, type IZButton } from "../button/button.js";
import type { IZComponentValue } from "../component/component-value.mjs";
import { ZIconFontAwesome } from "../icon/icon-font-awesome.js";
import { useFashionTheme } from "../theme/fashion.mjs";

export interface IZRefresh extends IZComponentValue<IZDataRequest> {
  ButtonProps?: IZButton;
}

export function ZRefresh(props: IZRefresh) {
  const { secondary } = useFashionTheme();
  const { ButtonProps = {}, value, onValueChange } = props;

  const [, setRequest] = useAmbassadorState(
    value,
    onValueChange,
    new ZDataRequestBuilder().build(),
  );

  const handleActivate = (e: MouseEvent<HTMLButtonElement>) => {
    const { onClick } = ButtonProps;

    onClick?.call(null, e);
    setRequest((r) => new ZDataRequestBuilder().copy(r).build());
  };

  return (
    <ZButton
      fashion={secondary}
      label={<ZIconFontAwesome name="refresh" width={ZSizeFixed.ExtraSmall} />}
      {...ButtonProps}
      onClick={handleActivate}
    />
  );
}
