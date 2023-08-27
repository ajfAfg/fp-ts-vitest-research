import { describe, expect, it } from "vitest";
// import { equalStrings } from "./foo";
import { getValue } from "./foo";

// describe("equalStrings", () => {
//   it("二つの文字列が等しいとき true を返す", async () => {
//     expect(equalStrings("foo", "foo")).toBeTruthy();
//   });
// });

describe("getValue", () => {
  it("Some でタグづけられたオブジェクトが持つ値を得られる", async () => {
    expect(getValue({ _tag: "Some", value: 1 })).toBe(1);
  });
});
