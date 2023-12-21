import { JSDOM } from "jsdom";
import Turndown from "turndown";

export const getDataForDay = async (day: number, year: number) => {
  const text = await fetch(`https://adventofcode.com/${year}/day/${day}`).then(
    (response) => response.text()
  );
  const document = new JSDOM(text).window.document;

  const $codes = document.querySelectorAll("code");

  return {
    markdown: new Turndown({}).turndown(
      document.querySelector("body")?.innerHTML || ""
    ),
  };
};
