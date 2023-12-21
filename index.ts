import { JSDOM } from "jsdom";
import { execSync } from "node:child_process";
import turndown from "turndown";
import { features } from "./features";
import { mkdir, writeFile, readdir } from "fs/promises";
import { solutionTemplate } from "./templates/solution.template";
import { testTemplate } from "./templates/test.template";
import { tsConfigTemplate } from "./templates/tsconfig.template";
import { format } from "prettier";
import { getFileImports } from "./templates/inputs.template";

const defaultMonth = new Date().getMonth();
const isDecember = defaultMonth === 11;
const defaultDay = isDecember ? new Date().getDate() : 1;
const defaultYear = new Date().getFullYear();

// todo make these work with command line
const day = defaultDay;
const month = defaultMonth;
const year = 2023;

const getDataForDay = async (day: number, year: number) => {
  const text = await fetch(`https://adventofcode.com/${year}/day/${day}`).then(
    (response) => response.text()
  );
  const document = new JSDOM(text).window.document;

  const $codes = document.querySelectorAll("code");

  return {
    markdown: new turndown({}).turndown(
      document.querySelector("body")?.innerHTML || ""
    ),
  };
};

if (features.buildMarkdownFromDay) {
  const data = await getDataForDay(day, year);
  await writeFile("", data.markdown, { encoding: "utf-8" });
}

const doesYearExist = await readdir(yearPath + "/")
  .then((result) => {
    return true;
  })
  .catch(() => false);

const yearPath = `${year}`;
const dayPath = `${yearPath}/day-${day}`;
const indexFile = `${dayPath}/index.ts`;

const doesDayExist = await readdir(dayPath + "/")
  .then(() => true)
  .catch(() => false);

if (!doesYearExist) {
  await mkdir(yearPath).catch(() => {
    throw new Error(
      `Could not create year folder for ${year}, it is likely that you have a  file named ${year} and you should delete it`
    );
  });
}

if (!doesDayExist) {
  await mkdir(dayPath);
}

const buildBoilerPlateFromDay = async (day: number, year: number) => {
  await writeFile(
    `${dayPath}/solution.ts`,
    await solutionTemplate({ year, day }),
    {
      encoding: "utf-8",
    }
  );

  await writeFile(
    `${dayPath}/day-${day}.test.ts`,
    await testTemplate({ year, day, library: "bun" }),
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

  await writeFile(
    `${dayPath}/tsconfig.json`,
    await tsConfigTemplate({ environment: "bun" }),
    {
      encoding: "utf-8",
    }
  ).catch(() => null);

  await writeFile(
    `${dayPath}/inputs.ts`,
    await format(await getFileImports({ library: "bun", year, day }), {
      parser: "typescript",
    }),
    {
      encoding: "utf-8",
    }
  ).catch(() => null);

  execSync(`$EDITOR ${dayPath}`);
};

buildBoilerPlateFromDay(day, year);
