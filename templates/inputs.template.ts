// The imports for the txt inputs
export const getFileImports = ({
  library,
  year,
  day,
}: {
  library: "bun" | "vitest";
  year: number;
  day: number;
}) => {
  switch (library) {
    case "bun":
      return `
                const folderPath = import.meta.dir
                const exampleInput = await Bun.file(\`\${folderPath}/example.txt\`).text()
                const realInput = await Bun.file(\`\${folderPath}/real.txt\`).text().catch(() => null)

                export const inputs = {
                    exampleInput,
                    realInput
                }
            `;

    case "vitest":
      return `
                const folderPath = import.meta.dir
                const exampleInput = await readFile(\`\${folderPath}/example.txt\`, {enc: "utf-8"})
                const realInput = await readFile(\`\${folderPath}/real.txt\`, {enc: "utf-8"}).catch(() => null)

                export const inputs = {
                    exampleInput,
                    realInput
                }
      `;
  }
};
