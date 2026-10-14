# Wizard

[Back to Fashion Boutique](../../README.md)

Guide users through a series of pages with Previous, Next, and Finish controls.

## Exports

| Export               | Description                                  |
| -------------------- | -------------------------------------------- |
| `ZWizard / IZWizard` | Page navigation in a card layout.            |
| `IZWizardPage`       | Page metadata read from child element props. |

The `value` page index starts at zero. Child `data-name` and `data-description`
props supply the title; `data-next-disabled` blocks advancing or finishing.
Provide a Finish button callback to complete the flow.

## Usage

```tsx
import { ZWizard } from "@zthun/fashion-boutique";
import { useState } from "react";

export function Setup() {
  const [finished, setFinished] = useState(false);
  if (finished) return <p>Setup complete.</p>;
  return (
    <ZWizard
      FinishButtonProps={{ label: "Finish", onClick: () => setFinished(true) }}
    >
      <section
        data-name="Welcome"
        data-description="Start here"
        data-next-disabled={false}
      >
        Welcome to setup.
      </section>
      <section data-name="Review" data-next-disabled={false}>
        Review your choices.
      </section>
    </ZWizard>
  );
}
```
