import { ZSizeVaried } from "@zthun/fashion-tailor";
import {
  ZHttpCodeClient,
  getHttpCodeDescription,
  getHttpCodeName,
} from "@zthun/webigail-http";
import { ZButton } from "../button/button.js";
import { ZCard } from "../card/card.js";
import { ZFullScreen } from "../full-screen/full-screen.js";
import { ZGrid } from "../grid/grid.js";
import { useNavigate } from "../router/router-dom.mjs";
import { useFashionTheme } from "../theme/fashion.mjs";
import { ZParagraph } from "../typography/typography.js";
import { ZSadFace } from "./sad-face.js";

export interface IZNotFound {
  home?: string;
}

export function ZNotFound(props: IZNotFound) {
  const { home = "/" } = props;
  const description = getHttpCodeDescription(ZHttpCodeClient.NotFound);
  const name = getHttpCodeName(ZHttpCodeClient.NotFound);
  const title = `${name} (${ZHttpCodeClient.NotFound})`;
  const navigate = useNavigate();
  const { error } = useFashionTheme();

  return (
    <ZFullScreen>
      <ZGrid
        className="ZNotFound-root"
        justify={{ content: "center" }}
        align={{ content: "center" }}
        height={ZSizeVaried.Full}
      >
        <ZCard
          TitleProps={{
            avatar: <ZSadFace />,
            heading: title,
          }}
          footer={
            <ZButton
              className="ZNotFound-back"
              name="return-home"
              label="Return home"
              width={ZSizeVaried.Full}
              fashion={error}
              onClick={() => navigate(home)}
            />
          }
        >
          <ZParagraph className="ZNotFound-description">
            {description}
          </ZParagraph>
        </ZCard>
      </ZGrid>
    </ZFullScreen>
  );
}
