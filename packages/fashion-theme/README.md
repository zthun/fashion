# @zthun/fashion-theme

Color utilities and builders for creating coordinated component colors and
themes.

`ZFashionStateBuilder` defines colors for a component state. `ZFashionBuilder`
combines idle, hover, focus, and active states, while `ZFashionThemeBuilder`
groups these color schemes into a theme. `ZColorPicker` resolves colors for each
state.

The package also includes RGB, HSL, and hexadecimal color helpers, along with
brightness, luminance, and contrast calculations.

## Installation

```sh
# npm
npm install @zthun/fashion-theme
# Yarn
yarn add @zthun/fashion-theme
```

## Features

Import the public exports shown in each feature guide from
`@zthun/fashion-theme`. Type-only exports can be imported with `import type`.

| Feature                            | Description                                                                                     |
| ---------------------------------- | ----------------------------------------------------------------------------------------------- |
| [color](./src/color/README.md)     | Construct CSS colors and calculate brightness, luminance, and contrast from numeric RGB values. |
| [fashion](./src/fashion/README.md) | Build coordinated color schemes for idle, hover, focus, and active component states.            |
| [theme](./src/theme/README.md)     | Group component color schemes into a named application theme.                                   |
