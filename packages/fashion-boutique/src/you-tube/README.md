# YouTube

[Back to Fashion Boutique](../../README.md)

Embed a YouTube video in a responsive container with a 16:9 aspect ratio.

## Exports

| Export                           | Description                                             |
| -------------------------------- | ------------------------------------------------------- |
| `ZYouTubeVideo / IZYouTubeVideo` | YouTube embed with identity, name, and className props. |

`identity` is the video ID, not a full URL. `name` supplies the iframe title.

## Usage

```tsx
import { ZYouTubeVideo } from "@zthun/fashion-boutique";

export function Video() {
  return <ZYouTubeVideo identity="jNQXAC9IVRw" name="Me at the zoo" />;
}
```
