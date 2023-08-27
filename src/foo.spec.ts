import { describe, expect, it } from "vitest";
import { equalStrings } from "./foo";

describe("equalStrings", () => {
  it("二つの文字列が等しいとき true を返す", async () => {
    expect(equalStrings("foo", "foo")).toBeTruthy();
  });
});
