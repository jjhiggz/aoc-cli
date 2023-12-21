import { features } from "./features";
import { getDataForDay } from "./getDataForDay";
import { writeFile } from "fs/promises";
import { solutionTemplate } from "./templates/solution.template";
import { testTemplate } from "./templates/test.template";
import { tsConfigTemplate } from "./templates/tsconfig.template";
import { format } from "prettier";
import { getFileImports } from "./templates/inputs.template";

export const buildFiles = async ({
  day,
  year,
  yearPath,
  dayPath,
  environment,
}: {
  day: number;
  year: number;
  dayPath: string;
  yearPath: string;
  environment: "vitest" | "bun";
}) => {
  if (features.buildMarkdownFromDay) {
    const data = await getDataForDay(day, year);
    await writeFile(`${dayPath}/problem-statement.md`, data.markdown, {
      encoding: "utf-8",
    });
  }
  await writeFile(
    `${dayPath}/solution.ts`,
    await solutionTemplate({ year, day }),
    {
      encoding: "utf-8",
    }
  );

  await writeFile(
    `${dayPath}/day-${day}.test.ts`,
    await testTemplate({ year, day, environment }),
    {
      encoding: "utf-8",
    }
  );

  await writeFile(`${dayPath}/example.txt`, "", {
    encoding: "utf-8",
  }).catch(() => null);

  await writeFile(`${dayPath}/real.txt`, "", {
    encoding: "utf-8",
  }).catch(() => null);

  await writeFile(`${dayPath}/tsconfig.json`, await tsConfigTemplate(), {
    encoding: "utf-8",
  }).catch(() => null);

  await writeFile(
    `${dayPath}/inputs.ts`,
    await format(await getFileImports({ environment, year, day }), {
      parser: "typescript",
    }),
    {
      encoding: "utf-8",
    }
  ).catch(() => null);
};
