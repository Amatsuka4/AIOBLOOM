import { describe, expect, it } from "vitest";
import { commands } from "../commands/index.js";

describe("commands", () => {
  it("has no duplicate command names", () => {
    const names = commands.map((c) => c.data.name);
    expect(new Set(names).size).toBe(names.length);
  });
});
