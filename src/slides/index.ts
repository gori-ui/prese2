import { act1 } from "./act1";
import { act2 } from "./act2";
import { act3 } from "./act3";
import { act4 } from "./act4";
import type { SlideDef } from "../lib/types";

export const deck: SlideDef[] = [...act1, ...act2, ...act3, ...act4];
