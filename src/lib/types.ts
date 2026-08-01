import type { ComponentType } from "react";

export interface SlideDef {
  id: number;
  act: string;
  title: string; // used in nav / a11y, not necessarily rendered
  Component: ComponentType;
}
