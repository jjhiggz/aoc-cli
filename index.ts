import { ensureFoldersExist } from "./ensure-folders-exist";
import { execSync } from "child_process";
import { buildFiles } from "./build-files";
import { z } from "zod";
import { getDefaultEnvironment } from "./get-default-environment";

const argsSchema = z
  .object({
    openEditorToFolder: z.coerce.boolean().optional().default(true),
    month: z.coerce
      .number()
      .min(1)
      .max(12)
      .optional()
      .default(new Date().getMonth()),
    day: z.coerce
      .number()
      .min(1)
      .max(31)
      .optional()
      .default(new Date().getDate()),
    year: z.coerce
      .number()
      .min(2015)
      .max(2023)
      .optional()
      .default(new Date().getFullYear()),
    environment: z
      .enum(["bun", "vitest"])
      .optional()
      .default(await getDefaultEnvironment()),
  })
  .strict();

const args = argsSchema.parse(
  process.argv.reduce(
    (acc, arg) => {
      if (!arg.startsWith("--")) return acc;
      const sanitized = arg.replace("--", "");
      const [key, value] = sanitized.split("=");

      return { ...acc, [key]: value };
    },
    {} as Record<string, string>
  )
);

// todo make these work with command line
const day = args.day;
const month = args.month;
const year = args.year;

console.log(args);

const yearPath = `${year}`;
const dayPath = `${yearPath}/day-${day}`;

const run = async () => {
  await ensureFoldersExist({
    day,
    year,
    yearPath,
    dayPath,
  });

  await buildFiles({
    day,
    dayPath,
    year,
    yearPath,
    environment: args.environment,
  });

  if (args.openEditorToFolder) {
    execSync(`$EDITOR ${dayPath}`);
  }
};

run();
