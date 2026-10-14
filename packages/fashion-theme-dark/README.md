# @zthun/fashion-theme-dark

The default dark theme for the Fashion system. It provides color schemes for
primary, secondary, and tertiary components; success, warning, error, and info
states; page areas; and contrasting colors.

The package exports a ready-to-use theme object as its default export.

## Installation

```sh
# npm
npm install @zthun/fashion-theme-dark
# Yarn
yarn add @zthun/fashion-theme-dark
```

## Usage

With `@zthun/fashion-boutique` installed, provide the theme through
`ZFashionThemeContext`:

```tsx
import {
  ZButton,
  ZFashionThemeContext,
  ZStyled,
} from "@zthun/fashion-boutique";
import themeDark from "@zthun/fashion-theme-dark";

export function App() {
  return (
    <ZFashionThemeContext value={themeDark}>
      <ZStyled>
        <ZButton label="Get started" />
      </ZStyled>
    </ZFashionThemeContext>
  );
}
```

`ZStyled` applies the theme's body background and text colors to the page.
