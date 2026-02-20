import {
  ZButton,
  ZGrid,
  ZH3,
  ZIconFontAwesome,
  ZParagraph,
  ZPopup,
} from "@zthun/fashion-boutique";
import { ZSizeFixed, ZSizeVaried } from "@zthun/fashion-tailor";
import type { MouseEvent } from "react";
import { useState } from "react";
import { ZFashionRoutePopup } from "../../routes.mjs";
import { ZCardDemoComponent } from "../common/card-demo-component.js";

export function ZPopupPage() {
  const [open, setOpen] = useState(false);
  const [attach, setAttach] = useState<HTMLElement>();

  const openPopup = (e: MouseEvent<HTMLElement>) => {
    setAttach(e.currentTarget);
    setOpen(true);
  };

  return (
    <ZCardDemoComponent
      className="ZPopupPage-root"
      TitleProps={{
        heading: ZFashionRoutePopup.name,
        subHeading: ZFashionRoutePopup.description,
        avatar: (
          <ZIconFontAwesome
            name={ZFashionRoutePopup.avatar}
            width={ZSizeFixed.Medium}
          />
        ),
      }}
    >
      <ZH3>Description</ZH3>

      <ZParagraph>
        Popups are similar to drawers in that they let you extend the content to
        the user without having to show everything all at once. While some
        components, such as the Choice and Drawer, come with their own internal
        popup mechanism, the popup component lets you put anything you want in a
        popup and gives you an API to display that content whenever certain
        conditions are met.
      </ZParagraph>

      <ZGrid columns={{ xl: "0.25fr", md: "0.5fr", sm: "1fr" }}>
        <ZButton
          outline
          label="Open Popup"
          onClick={openPopup}
          width={ZSizeVaried.Full}
          name="open-popup"
        />
      </ZGrid>

      <ZPopup
        attach={attach}
        onClose={setOpen.bind(null, false)}
        open={open}
        renderHeader={() => <ZH3 compact>Popup</ZH3>}
        renderFooter={() => (
          <ZButton
            name="close-popup"
            label="Close Popup"
            onClick={setOpen.bind(null, false)}
          />
        )}
      >
        <ZParagraph compact>
          You can put anything you want in popup content.
        </ZParagraph>
      </ZPopup>
    </ZCardDemoComponent>
  );
}
