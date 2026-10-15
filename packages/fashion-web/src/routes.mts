import {
  ZAvatarFontAwesomeBuilder,
  ZAvatarImageBuilder,
  ZRouteBuilder,
} from "@zthun/fashion-boutique";

export const ZFashionRouteHome = new ZRouteBuilder()
  .name("Fashion")
  .path("")
  .description("Build Something Pretty")
  .avatar(new ZAvatarImageBuilder().src("/images/svg/fashion.svg").build())
  .build();

export const ZFashionRouteTheme = new ZRouteBuilder()
  .name("Theme")
  .path("theme")
  .description("Define Colors")
  .avatar(new ZAvatarFontAwesomeBuilder().name("palette").build())
  .build();

export const ZFashionRouteBoutique = new ZRouteBuilder()
  .name("Boutique")
  .path("boutique")
  .description("Components for React")
  .avatar(new ZAvatarFontAwesomeBuilder().name("store").build())
  .build();

export const ZFashionRouteAlert = new ZRouteBuilder()
  .name("Alert")
  .path("alert")
  .description("Colorful User Feedback")
  .avatar(new ZAvatarFontAwesomeBuilder().name("warning").build())
  .build();

export const ZFashionRouteBoolean = new ZRouteBuilder()
  .name("Boolean")
  .path("boolean")
  .description("Basic Togglers")
  .avatar(new ZAvatarFontAwesomeBuilder().name("toggle-off").build())
  .build();

export const ZFashionRouteBubble = new ZRouteBuilder()
  .name("Bubble")
  .path("bubble")
  .description("Content in a Circle")
  .avatar(new ZAvatarFontAwesomeBuilder().name("circle").build())
  .build();

export const ZFashionRouteButton = new ZRouteBuilder()
  .name("Button")
  .path("button")
  .description("Click To Activate")
  .avatar(new ZAvatarFontAwesomeBuilder().name("circle-dot").build())
  .build();

export const ZFashionRouteCarousel = new ZRouteBuilder()
  .name("Carousel")
  .path("carousel")
  .description("Merry-Go-Round Content")
  .avatar(new ZAvatarFontAwesomeBuilder().name("horse").build())
  .build();

export const ZFashionRouteChart = new ZRouteBuilder()
  .name("Chart")
  .path("chart")
  .description("Visualizations")
  .avatar(new ZAvatarFontAwesomeBuilder().name("chart-pie").build())
  .build();

export const ZFashionRouteChoice = new ZRouteBuilder()
  .name("Choice")
  .path("choice")
  .description("Choose From an Option List")
  .avatar(new ZAvatarFontAwesomeBuilder().name("hand-pointer").build())
  .build();

export const ZFashionRouteDrawer = new ZRouteBuilder()
  .name("Drawer")
  .path("drawer")
  .description("Pop Out Navigation")
  .avatar(new ZAvatarFontAwesomeBuilder().name("inbox").build())
  .build();

export const ZFashionRouteForm = new ZRouteBuilder()
  .name("Form")
  .path("form")
  .description("Generate and Submit Forms")
  .avatar(new ZAvatarFontAwesomeBuilder().name("computer-mouse").build())
  .build();

export const ZFashionRouteGridView = new ZRouteBuilder()
  .name("Grid View")
  .path("grid-view")
  .description("Paginated Grid With Built In Navigation")
  .avatar(new ZAvatarFontAwesomeBuilder().name("grip").build())
  .build();

export const ZFashionRouteImage = new ZRouteBuilder()
  .name("Image")
  .path("image")
  .description("Show raster or vector graphics")
  .avatar(new ZAvatarFontAwesomeBuilder().name("image").build())
  .build();

export const ZFashionRouteList = new ZRouteBuilder()
  .name("List")
  .path("list")
  .description("Line Items")
  .avatar(new ZAvatarFontAwesomeBuilder().name("list").build())
  .build();

export const ZFashionRouteModal = new ZRouteBuilder()
  .name("Modal")
  .path("modal")
  .description("Window Container")
  .avatar(new ZAvatarFontAwesomeBuilder().name("window-maximize").build())
  .build();

export const ZFashionRouteNumber = new ZRouteBuilder()
  .name("Number")
  .path("number")
  .description("Numeric Spinners")
  .avatar(new ZAvatarFontAwesomeBuilder().name("5").build())
  .build();

export const ZFashionRoutePagination = new ZRouteBuilder()
  .name("Pagination")
  .path("pagination")
  .description("Paged data")
  .avatar(new ZAvatarFontAwesomeBuilder().name("book").build())
  .build();

export const ZFashionRoutePopup = new ZRouteBuilder()
  .name("Popup")
  .path("popup")
  .description("Pop content")
  .avatar(new ZAvatarFontAwesomeBuilder().name("comment").build())
  .build();

export const ZFashionRouteSuspense = new ZRouteBuilder()
  .name("Suspense")
  .path("suspense")
  .description("Loading and Waiting")
  .avatar(new ZAvatarFontAwesomeBuilder().name("spinner").build())
  .build();

export const ZFashionRouteText = new ZRouteBuilder()
  .name("Text")
  .path("text")
  .description("Characters, Sentences, and Paragraphs")
  .avatar(new ZAvatarFontAwesomeBuilder().name("font").build())
  .build();

export const ZFashionRouteTypography = new ZRouteBuilder()
  .name("Typography")
  .path("typography")
  .description("Standard Page Structures")
  .avatar(new ZAvatarFontAwesomeBuilder().name("mountain-sun").build())
  .build();

export const ZFashionRouteWizard = new ZRouteBuilder()
  .name("Wizard")
  .path("wizard")
  .description("Step by Step Navigation")
  .avatar(new ZAvatarFontAwesomeBuilder().name("hat-wizard").build())
  .build();

export const ZFashionRouteYouTube = new ZRouteBuilder()
  .name("YouTube")
  .path("you-tube")
  .description("Embed YouTube videos")
  .avatar(
    new ZAvatarFontAwesomeBuilder().name("youtube").family("brands").build(),
  )
  .build();

export const ZFashionRouteAllComponents = [
  ZFashionRouteAlert,
  ZFashionRouteBoolean,
  ZFashionRouteBubble,
  ZFashionRouteButton,
  ZFashionRouteCarousel,
  ZFashionRouteChart,
  ZFashionRouteChoice,
  ZFashionRouteDrawer,
  ZFashionRouteForm,
  ZFashionRouteGridView,
  ZFashionRouteImage,
  ZFashionRouteList,
  ZFashionRouteModal,
  ZFashionRouteNumber,
  ZFashionRoutePagination,
  ZFashionRoutePopup,
  ZFashionRouteSuspense,
  ZFashionRouteText,
  ZFashionRouteTypography,
  ZFashionRouteWizard,
  ZFashionRouteYouTube,
];
