import { ensureFoldersExist } from "./ensure-folders-exist";
import { buildFiles } from "./build-files";
import { z } from "zod";

const argsSchema = z
  .object({
    month: z.coerce.number().min(1).max(12).optional(),
    day: z.coerce.number().min(1).max(31).optional(),
    year: z.coerce.number().min(2015).max(2023).optional(),
    environment: z.enum(["bun", "vitest"]).optional().default("bun"),
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

const defaultMonth = new Date().getMonth();
const isDecember = defaultMonth === 11;
const defaultDay = isDecember ? new Date().getDate() : 1;
const defaultYear = new Date().getFullYear();

// todo make these work with command line
const day = args.day ?? defaultDay;
const month = args.month ?? defaultMonth;
const year = args.year ?? defaultYear;

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
};

run();
