import { readdir, mkdir } from "node:fs/promises";

export const ensureFoldersExist = async ({
  yearPath,
  year,
  day,
  dayPath,
}: {
  yearPath: string;
  year: number;
  day: number;
  dayPath: string;
}) => {
  const doesYearExist = await readdir(yearPath + "/")
    .then((result) => {
      return true;
    })
    .catch(() => false);

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
};
