import { answer1day2, answer2day2 } from "./solution";
import { expect, describe, it } from "bun:test";

import { inputs } from "./inputs";
const { exampleInput, realInput } = inputs;

describe("day2Part 1", () => {
  it("should get me the correct answer for the example", () => {
    // ! DELETE THIS
    // @ts-ignore
    expect(answer1day2(exampleInput)).toEqual(true);
  });

  it.skip("should get me the correct answer for the real", () => {
    // ! DELETE THIS
    // @ts-ignore
    expect(answer1day2(realInput)).toEqual(0);
  });
});

describe.skip("day2Part 2", () => {
  it("should get me the correct answer for the example", () => {
    // ! DELETE THIS
    // @ts-ignore
    expect(answer2day2(exampleInput)).toEqual(true);
  });

  it.skip("should get me the correct answer for the real", () => {
    // ! DELETE THIS
    // @ts-ignore
    expect(answer2day2(realInput)).toEqual(0);
  });
});
