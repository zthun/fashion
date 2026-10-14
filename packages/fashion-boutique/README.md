# @zthun/fashion-boutique

A React UI component library for building web pages with a consistent look and
feel. It includes layout components, form controls, navigation, dialogs,
typography, and loading indicators.

Components use `@zthun/fashion-theme` for colors and `@zthun/fashion-tailor` for
sizing and responsive layouts. The package also exports hooks and contexts for
customizing themes, spacing, and device breakpoints.

## Installation

This package requires React 19 and React DOM 19 as peer dependencies.

```sh
# npm
npm install @zthun/fashion-boutique react@^19 react-dom@^19
# Yarn
yarn add @zthun/fashion-boutique react@^19 react-dom@^19
```

For a ready-made dark theme, install
[@zthun/fashion-theme-dark](../fashion-theme-dark/README.md). To explore the
components, run the [demo website](../fashion-web/README.md).

## Features

Import the public exports shown in each guide from `@zthun/fashion-boutique`.
Use `import type` for TypeScript interfaces. Source-only features are identified
in their guides.

For application-wide colors, wrap your components in `ZFashionThemeContext`; see
the [theme guide](./src/theme/README.md) for an example.

| Feature                                                  | Description                                                                            |
| -------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| [alert](./src/alert/README.md)                           | Display a themed feedback message with an optional heading and avatar.                 |
| [async](./src/async/README.md)                           | Render content according to whether asynchronous data is loading, loaded, or errored.  |
| [banner](./src/banner/README.md)                         | Display a themed page banner containing arbitrary content.                             |
| [banner-main](./src/banner-main/README.md)               | Compose a themed application shell with a title banner and padded main content.        |
| [boolean](./src/boolean/README.md)                       | Edit boolean values with a checkbox or switch.                                         |
| [box](./src/box/README.md)                               | Group content with themed borders, padding, margins, and responsive maximum widths.    |
| [breadcrumbs](./src/breadcrumbs/README.md)               | Build a breadcrumb trail from the current router pathname.                             |
| [breadcrumbs-outlet](./src/breadcrumbs-outlet/README.md) | Display breadcrumbs above the content of a nested route.                               |
| [bubble](./src/bubble/README.md)                         | Place content inside a circular themed container.                                      |
| [button](./src/button/README.md)                         | Trigger an action with a themed button containing a label and optional avatar.         |
| [card](./src/card/README.md)                             | Display content in a themed surface with an optional title and footer.                 |
| [carousel](./src/carousel/README.md)                     | Show one item at a time with forward and reverse navigation.                           |
| [chart](./src/chart/README.md)                           | Display progress as a portion of a total using a named data point.                     |
| [chip](./src/chip/README.md)                             | Display a compact themed label with optional prefix and suffix content.                |
| [choice](./src/choice/README.md)                         | Choose one or more values from a list of options.                                      |
| [component](./src/component/README.md)                   | Compose shared TypeScript prop interfaces for custom components.                       |
| [content-title](./src/content-title/README.md)           | Arrange a heading, subheading, avatar, and optional surrounding content.               |
| [dialog](./src/dialog/README.md)                         | Display content in a modal, drawer, or popup backed by the native dialog element.      |
| [divider](./src/divider/README.md)                       | Separate sections with a horizontal rule styled from the current theme.                |
| [form](./src/form/README.md)                             | Edit an object through metadata-driven fields and commit or reset its draft.           |
| [full-screen](./src/full-screen/README.md)               | Fill the containing positioned element with a padded content region.                   |
| [grid](./src/grid/README.md)                             | Arrange content using CSS Grid, responsive spans, or a twelve-column newspaper layout. |
| [grid-view](./src/grid-view/README.md)                   | Retrieve data from a data source and render the results in a grid.                     |
| [icon](./src/icon/README.md)                             | Render Font Awesome or Material icons with themed colors and responsive sizing.        |
| [image](./src/image/README.md)                           | Display an image with size presets and a configurable object fit.                      |
| [label](./src/label/README.md)                           | Label a control or arrange a label alongside its content.                              |
| [link](./src/link/README.md)                             | Display a themed anchor with a text or React node label.                               |
| [list](./src/list/README.md)                             | Display a themed list with optional interactive or highlighted items.                  |
| [not-found](./src/not-found/README.md)                   | Show a missing-page message and a button to return home.                               |
| [number](./src/number/README.md)                         | Edit a numeric value with text entry, spinner buttons, and arrow keys.                 |
| [pagination](./src/pagination/README.md)                 | Navigate pages and change page size for a data request.                                |
| [refresh](./src/refresh/README.md)                       | Request a fresh retrieval by rebuilding the current data request.                      |
| [router](./src/router/README.md)                         | Configure hash-based navigation and nested routes.                                     |
| [search](./src/search/README.md)                         | Update a data request with a search string and return to its first page.               |
| [stack](./src/stack/README.md)                           | Arrange content using Flexbox with configurable direction, gaps, and alignment.        |
| [suspense](./src/suspense/README.md)                     | Show an animated indicator while work is in progress.                                  |
| [text](./src/text/README.md)                             | Edit text with themed single-line and multiline inputs.                                |
| [theme](./src/theme/README.md)                           | Provide colors, spacing, and device breakpoints to Fashion components.                 |
| [tile](./src/tile/README.md)                             | Display an interactive themed box for a selectable action or item.                     |
| [typography](./src/typography/README.md)                 | Display headings and text with consistent sizes, weights, and theme colors.            |
| [wizard](./src/wizard/README.md)                         | Guide users through a series of pages with Previous, Next, and Finish controls.        |
| [you-tube](./src/you-tube/README.md)                     | Embed a YouTube video in a responsive container with a 16:9 aspect ratio.              |
