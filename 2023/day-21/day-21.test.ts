import { answer1day21, answer2day21 } from "./solution";
import { expect, describe, it } from "bun:test";

import { inputs } from "./inputs";
const { exampleInput, realInput } = inputs;

describe("day21Part 1", () => {
  it("should get me the correct answer for the example", () => {
    // ! DELETE THIS
    // @ts-ignore
    expect(answer1day21(exampleInput)).toEqual(true);
  });

  it.skip("should get me the correct answer for the real", () => {
    // ! DELETE THIS
    // @ts-ignore
    expect(answer1day21(realInput)).toEqual(0);
  });
});

describe.skip("day21Part 2", () => {
  it("should get me the correct answer for the example", () => {
    // ! DELETE THIS
    // @ts-ignore
    expect(answer2day21(exampleInput)).toEqual(true);
  });

  it.skip("should get me the correct answer for the real", () => {
    // ! DELETE THIS
    // @ts-ignore
    expect(answer2day21(realInput)).toEqual(0);
  });
});
