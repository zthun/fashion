import {
  useFashionTheme,
  ZBox,
  ZChartProgress,
  ZDataPointBuilder,
  ZGrid,
  ZH4,
  ZParagraph,
} from "@zthun/fashion-boutique";
import { ZSizeFixed } from "@zthun/fashion-tailor";
import { useMemo } from "react";

export function ZChartPageProgress() {
  const { success, error, tertiary, warning, component } = useFashionTheme();

  const hp = useMemo(
    () => new ZDataPointBuilder(300, 1000).name("HP").fashion(success).build(),
    [success],
  );
  const atk = useMemo(
    () => new ZDataPointBuilder(74, 255).name("Attack").fashion(error).build(),
    [error],
  );
  const def = useMemo(
    () => new ZDataPointBuilder(90, 255).name("Defense").build(),
    [],
  );
  const int = useMemo(
    () =>
      new ZDataPointBuilder(22, 255)
        .name("Intelligence")
        .fashion(tertiary)
        .build(),
    [tertiary],
  );
  const spd = useMemo(
    () => new ZDataPointBuilder(67, 128).name("Speed").fashion(warning).build(),
    [warning],
  );

  return (
    <ZBox
      className="ZChartPage-progress"
      fashion={component}
      padding={ZSizeFixed.Medium}
      border={{ width: ZSizeFixed.Small }}
    >
      <ZH4>Progress Chart</ZH4>
      <ZParagraph>
        A progress chart is the most basic of charts. It is just a bar that
        shows a current value out of a possible maximum value. Each chart can
        have its own individual range.
      </ZParagraph>

      <ZGrid gap={ZSizeFixed.Small}>
        <ZChartProgress points={hp} height={ZSizeFixed.ExtraSmall} name="hp" />
        <ZChartProgress points={atk} height={ZSizeFixed.Small} name="attack" />
        <ZChartProgress points={def} name="defense" />
        <ZChartProgress
          points={int}
          height={ZSizeFixed.Large}
          name="intelligence"
        />
        <ZChartProgress
          points={spd}
          height={ZSizeFixed.ExtraLarge}
          name="speed"
        />
      </ZGrid>
    </ZBox>
  );
}
