import { format } from "prettier";

// import the testing utils depending on the tooling
export const getTestingUtils = (library: "bun" | "vitest") => {
  switch (library) {
    case "bun":
      return `import { expect, describe, it } from "bun:test";`;
    case "vitest":
      return `
      import { expect, describe, it } from "vitest";
      import { readFile } from "fs/promises";
    `;
  }
};

// import the functions that you will be testing
export const getFunctionImports = ({
  library,
  year,
  day,
}: {
  library: "bun" | "vitest";
  year: number;
  day: number;
}) => {
  return `import { answer1day${day}, answer2day${day} } from "./solution";`;
};

// This will be the test file
export const testTemplate = ({
  day,
  environment,
  year,
}: {
  day: number;
  environment: "bun" | "vitest";
  year: number;
}) => {
  const beforeFormat = [
    getFunctionImports({ library: environment, day, year }),
    getTestingUtils(environment),
    `
    import { inputs } from "./inputs";
    const {exampleInput, realInput} = inputs
    `,
    `
describe("day${day}Part 1", () => {

    it("should get me the correct answer for the example", () => {
        // ! DELETE THIS
        // @ts-ignore
        expect(answer1day${day}(exampleInput)).toEqual(true)
    })

    it.skip("should get me the correct answer for the real", () => {
        // ! DELETE THIS
        // @ts-ignore
        expect(answer1day${day}(realInput)).toEqual(0)
    })

})

describe.skip("day${day}Part 2", () => {

    it("should get me the correct answer for the example", () => {
        // ! DELETE THIS
        // @ts-ignore
        expect(answer2day${day}(exampleInput)).toEqual(true)
    })

    it.skip("should get me the correct answer for the real", () => {
        // ! DELETE THIS
        // @ts-ignore
        expect(answer2day${day}(realInput)).toEqual(0)
    })

})
 `,
  ].join("\n");

  return format(beforeFormat, { parser: "typescript" });
};
