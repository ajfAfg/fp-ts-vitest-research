import * as String from "fp-ts/String";

import * as Option from "fp-ts/Option";

export const equalStrings = (s1: string, s2: string): boolean =>
  String.Eq.equals(s1, s2);

export const getValue = <T>(option: Option.Option<T>): T => {
  if (Option.isSome(option)) {
    return option.value;
  } else {
    throw new Error();
  }
};
