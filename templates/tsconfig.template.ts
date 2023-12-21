import { format } from "prettier";

// This is necessary because   if we open this problem in a seperate window, we need to extend from the outside
// so that way we have access to the correct configuration and also can import any Advent Of Code generic utils
// For example I have a "JonMatrix" class that I can dump in "/aoc-solutsions"
// but when I am working its much more convenient to open "/aoc-solutions/2023/day-1"
// so I don't have to flip through a bunch of files
export const tsConfigTemplate = ({
  environment,
}: {
  environment: "node" | "bun";
}) => {
  return format(
    `
{
  "extends": "../../tsconfig.json",
  "include": ["../../**/*.ts"]
}
    `,
    { parser: "json" }
  );
};
