import { readFile } from "fs/promises";
export const getDefaultEnvironment = async () => {
  const bunLock = await readFile("bun.lockb", { encoding: "utf-8" }).catch(
    () => null
  );
  if (!bunLock) return "vitest" as const;
  return "bun" as const;
};
