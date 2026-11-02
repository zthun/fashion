import {
  ZAvatar,
  ZDivider,
  ZExplorer,
  ZExplorerTreeNode,
  ZExplorerTreeNodeRoute,
  ZFashionThemeContext,
  ZFlex,
  ZNavigate,
  ZNotFound,
  ZRoute,
  ZRouteMap,
  ZStack,
  ZStyled,
} from "@zthun/fashion-boutique";
import { ZSizeFixed, ZSizeVaried } from "@zthun/fashion-tailor";
import ZThemeDark from "@zthun/fashion-theme-dark";

import { ZAlertPage } from "../boutique/alert/alert-page.js";
import { ZBooleanPage } from "../boutique/boolean/boolean-page.js";
import { ZBubblePage } from "../boutique/bubble/bubble-page.js";
import { ZButtonPage } from "../boutique/button/button-page.js";
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
import {
  ZFashionRouteAlert,
  ZFashionRouteAllComponents,
  ZFashionRouteBoolean,
  ZFashionRouteBoutique,
  ZFashionRouteBubble,
  ZFashionRouteButton,
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

/**
 * Represents the root entry point into the application.
 *
 * @returns
 *        The jsx to render the fashion web application.
 */
export function ZFashionApp() {
  const renderHeading = () => (
    <ZExplorerTreeNode
      nonInteractive
      avatar={
        <ZAvatar
          value={ZFashionRouteHome.avatar}
          height={ZSizeFixed.Small}
          width={ZSizeFixed.Small}
        />
      }
      prefix={ZFashionRouteHome.name}
    />
  );

  const renderTheme = () => {
    return <ZExplorerTreeNodeRoute value={ZFashionRouteTheme} />;
  };

  const renderBoutique = () => {
    return (
      <ZExplorerTreeNode
        avatar={
          <ZAvatar
            value={ZFashionRouteBoutique.avatar}
            width={ZSizeFixed.ExtraSmall}
          />
        }
        prefix="Boutique"
      >
        {ZFashionRouteAllComponents.map((c) => (
          <ZExplorerTreeNodeRoute value={c} key={c.path} />
        ))}
      </ZExplorerTreeNode>
    );
  };

  return (
    <ZFashionThemeContext value={ZThemeDark}>
      <ZStyled className="ZFashionApp-root">
        <ZExplorer
          sidebar={
            <ZStack height={ZSizeVaried.Full}>
              {renderHeading()}
              <ZDivider />
              <ZFlex grow={1}>
                {renderTheme()}
                {renderBoutique()}
              </ZFlex>
            </ZStack>
          }
        >
          <ZRouteMap>
            <ZRoute path={ZFashionRouteTheme.path} element={<ZThemePage />} />
            <ZRoute path={ZFashionRouteAlert.path} element={<ZAlertPage />} />
            <ZRoute
              path={ZFashionRouteBoolean.path}
              element={<ZBooleanPage />}
            />
            <ZRoute path={ZFashionRouteBubble.path} element={<ZBubblePage />} />
            <ZRoute path={ZFashionRouteButton.path} element={<ZButtonPage />} />
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
            <ZRoute
              path=""
              element={<ZNavigate to={ZFashionRouteTheme.path} />}
            />
            <ZRoute path="*" element={<ZNotFound />} />
          </ZRouteMap>
        </ZExplorer>
      </ZStyled>
    </ZFashionThemeContext>
  );
}
