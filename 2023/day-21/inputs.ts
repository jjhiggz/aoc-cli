const folderPath = import.meta.dir;
const exampleInput = await Bun.file(`${folderPath}/example.txt`).text();
const realInput = await Bun.file(`${folderPath}/real.txt`)
  .text()
  .catch(() => null);

export const inputs = {
  exampleInput,
  realInput,
};
