# Theme

[Back to Fashion Boutique](../../README.md)

Provide colors, spacing, and device breakpoints to Fashion components.

## Exports

| Export                                                | Description                                                |
| ----------------------------------------------------- | ---------------------------------------------------------- |
| `ZFashionThemeContext / useFashionTheme / useFashion` | Theme context and color scheme hooks.                      |
| `ZFashionTailorContext / useFashionTailor`            | Spacing and border sizing context and hook.                |
| `ZFashionDeviceContext / useFashionDevice`            | Responsive breakpoint context and hook.                    |
| `ZStyled / IZStyled`                                  | Applies global body background and text colors.            |
| `useCss / useGlobalCss / useKeyframes`                | Generate styles, inject global CSS, and define animations. |

The default theme comes from `ZFashionThemeBuilder`. Override it with a context
provider; the example uses the separately installed `@zthun/fashion-theme-dark`
package.

## Usage

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
