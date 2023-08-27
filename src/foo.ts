import * as String from "fp-ts/String";

export const equalStrings = (s1: string, s2: string): boolean =>
  String.Eq.equals(s1, s2);
