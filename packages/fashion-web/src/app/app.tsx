import {
  useNavigate,
  ZBannerMain,
  ZButton,
  ZFashionThemeContext,
  ZH1,
  ZIconFontAwesome,
  ZImage,
  ZNotFound,
  ZRoute,
  ZRouteMap,
  ZStack,
} from "@zthun/fashion-boutique";
import { ZSizeFixed } from "@zthun/fashion-tailor";
import { createThemeDark, createThemeLight } from "@zthun/fashion-theme";
import { ZOrientation } from "@zthun/helpful-fn";
import { useState } from "react";
import { ZAlertPage } from "../boutique/alert/alert-page.js";
import { ZBooleanPage } from "../boutique/boolean/boolean-page.js";
import { ZBoutiquePage } from "../boutique/boutique-page.js";
import { ZBubblePage } from "../boutique/bubble/bubble-page.js";
import { ZButtonPage } from "../boutique/button/button-page.js";
import { ZCardPage } from "../boutique/card/card-page.js";
import { ZCarouselPage } from "../boutique/carousel/carousel-page.js";
import { ZChartPage } from "../boutique/chart/chart-page.js";
import { ZChoicePage } from "../boutique/choice/choice-page.js";
import { ZDrawerPage } from "../boutique/drawer/drawer-page.js";
import { ZFormPage } from "../boutique/form/form-page.js";
import { ZGridViewPage } from "../boutique/grid-view/grid-view-page.js";
import { ZImagePage } from "../boutique/image/image-page.js";
import { ZListPage } from "../boutique/list/list-page.js";
import { ZModalPage } from "../boutique/modal/modal-page.js";
import { ZNumberPage } from "../boutique/number/number-page.js";
import { ZPaginationPage } from "../boutique/pagination/pagination-page.js";
import { ZPopupPage } from "../boutique/popup/popup-page.js";
import { ZSuspensePage } from "../boutique/suspense/suspense-page.js";
import { ZTextPage } from "../boutique/text/text-page.js";
import { ZTypographyPage } from "../boutique/typography/typography-page.js";
import { ZWizardPage } from "../boutique/wizard/wizard-page.js";
import { ZYouTubePage } from "../boutique/you-tube/you-tube-page.js";
import { ZHomePage } from "../home/home-page.js";
import {
  ZFashionRouteAlert,
  ZFashionRouteBoolean,
  ZFashionRouteBoutique,
  ZFashionRouteBubble,
  ZFashionRouteButton,
  ZFashionRouteCard,
  ZFashionRouteCarousel,
  ZFashionRouteChart,
  ZFashionRouteChoice,
  ZFashionRouteDrawer,
  ZFashionRouteForm,
  ZFashionRouteGridView,
  ZFashionRouteHome,
  ZFashionRouteImage,
  ZFashionRouteList,
  ZFashionRouteModal,
  ZFashionRouteNumber,
  ZFashionRoutePagination,
  ZFashionRoutePopup,
  ZFashionRouteSuspense,
  ZFashionRouteText,
  ZFashionRouteTheme,
  ZFashionRouteTypography,
  ZFashionRouteWizard,
  ZFashionRouteYouTube,
} from "../routes.mjs";
import { ZThemePage } from "../theme/theme-page.js";

const lightTheme = createThemeLight();
const darkTheme = createThemeDark();

/**
 * Represents the root entry point into the application.
 *
 * @returns
 *        The jsx to render the fashion web application.
 */
export function ZFashionApp() {
  const navigate = useNavigate();
  const avatar = <ZImage src={ZFashionRouteHome.avatar} />;
  const [theme, setTheme] = useState(darkTheme);

  const heading = <ZH1 compact>{ZFashionRouteHome.name}</ZH1>;
  const subHeading = ZFashionRouteHome.description;

  const toggleTheme = () => {
    setTheme((t) => (t === lightTheme ? darkTheme : lightTheme));
  };

  const suffix = (
    <ZStack orientation={ZOrientation.Horizontal} gap={ZSizeFixed.ExtraSmall}>
      <ZButton
        label={<ZIconFontAwesome name="home" width={ZSizeFixed.ExtraSmall} />}
        onClick={navigate.bind(null, "/")}
      />
      <ZButton
        label={
          <ZIconFontAwesome name="lightbulb" width={ZSizeFixed.ExtraSmall} />
        }
        onClick={toggleTheme}
        tooltip={
          theme === lightTheme
            ? "Switch to dark theme"
            : "Switch to light theme"
        }
      />
    </ZStack>
  );

  return (
    <ZFashionThemeContext.Provider value={theme}>
      <ZBannerMain TitleProps={{ avatar, heading, subHeading, suffix }}>
        <ZRouteMap>
          <ZRoute path={ZFashionRouteHome.path} element={<ZHomePage />} />
          <ZRoute path={ZFashionRouteTheme.path} element={<ZThemePage />} />
          <ZRoute path={ZFashionRouteBoutique.path}>
            <ZRoute path={ZFashionRouteAlert.path} element={<ZAlertPage />} />
            <ZRoute
              path={ZFashionRouteBoolean.path}
              element={<ZBooleanPage />}
            />
            <ZRoute path={ZFashionRouteBubble.path} element={<ZBubblePage />} />
            <ZRoute path={ZFashionRouteButton.path} element={<ZButtonPage />} />
            <ZRoute path={ZFashionRouteCard.path} element={<ZCardPage />} />
            <ZRoute
              path={ZFashionRouteCarousel.path}
              element={<ZCarouselPage />}
            />
            <ZRoute path={ZFashionRouteChart.path} element={<ZChartPage />} />
            <ZRoute path={ZFashionRouteChoice.path} element={<ZChoicePage />} />
            <ZRoute path={ZFashionRouteDrawer.path} element={<ZDrawerPage />} />
            <ZRoute path={ZFashionRouteForm.path} element={<ZFormPage />} />
            <ZRoute
              path={ZFashionRouteGridView.path}
              element={<ZGridViewPage />}
            />
            <ZRoute path={ZFashionRouteImage.path} element={<ZImagePage />} />
            <ZRoute path={ZFashionRouteList.path} element={<ZListPage />} />
            <ZRoute path={ZFashionRouteModal.path} element={<ZModalPage />} />
            <ZRoute path={ZFashionRouteNumber.path} element={<ZNumberPage />} />
            <ZRoute
              path={ZFashionRoutePagination.path}
              element={<ZPaginationPage />}
            />
            <ZRoute path={ZFashionRoutePopup.path} element={<ZPopupPage />} />
            <ZRoute
              path={ZFashionRouteSuspense.path}
              element={<ZSuspensePage />}
            />
            <ZRoute path={ZFashionRouteText.path} element={<ZTextPage />} />
            <ZRoute
              path={ZFashionRouteTypography.path}
              element={<ZTypographyPage />}
            />
            <ZRoute path={ZFashionRouteWizard.path} element={<ZWizardPage />} />
            <ZRoute
              path={ZFashionRouteYouTube.path}
              element={<ZYouTubePage />}
            />
            <ZRoute path="" element={<ZBoutiquePage />} />
          </ZRoute>
          <ZRoute path="*" element={<ZNotFound />} />
        </ZRouteMap>
      </ZBannerMain>
    </ZFashionThemeContext.Provider>
  );
}
