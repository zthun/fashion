import type { IZCard } from "@zthun/fashion-boutique";
import {
  useNavigate,
  ZButton,
  ZCard,
  ZIconFontAwesome,
} from "@zthun/fashion-boutique";
import { ZSizeFixed, ZSizeVaried } from "@zthun/fashion-tailor";
import { ZFashionRouteBoutique } from "../../routes.mjs";

export function ZCardDemoComponent(props: Omit<IZCard, "footer">) {
  const navigate = useNavigate();

  return (
    <ZCard
      {...props}
      TitleProps={{
        ...props.TitleProps,
        suffix: (
          <ZButton
            width={ZSizeVaried.Full}
            avatar={
              <ZIconFontAwesome
                name={ZFashionRouteBoutique.avatar}
                width={ZSizeFixed.Small}
              />
            }
            onClick={navigate.bind(null, "/boutique")}
            label="Back to the Boutique"
          />
        ),
      }}
    />
  );
}
