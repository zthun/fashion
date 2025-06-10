import { useFashion } from "@zthun/fashion-boutique";
import type { IZFashion, ZFashionName } from "@zthun/fashion-theme";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";

export type FashionState = [
  IZFashion | undefined,
  ZFashionName | undefined,
  Dispatch<SetStateAction<ZFashionName>>,
];

export function useFashionState(initial?: ZFashionName): FashionState {
  const [name, setName] = useState<ZFashionName | undefined>(initial);
  const fashion = useFashion(name);
  return [fashion, name, setName];
}
