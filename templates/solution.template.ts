import { format } from "prettier";

//  The template for the file that will build the solution
export const solutionTemplate = ({
  year,
  day,
}: {
  year: number;
  day: number;
}) =>
  format(
    `
         // write code here
         export const answer1day${day} = (input: string) => {
            console.log(input)
            // todo
         }

         export const answer2day${day} = (input: string) => {
            console.log(input)
            // todo
         }
    `,
    { parser: "typescript" }
  );
