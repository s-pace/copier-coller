import fs from "fs";
import { marked } from "marked";
import path from "path";
import { parse } from "yaml";

const SEPARATOR = "---";
export const getMarkdownFiles = () => {
  const markdownDir = path.join(process.cwd(), "markdowns");
  const fileNames = fs.readdirSync(markdownDir);

  return fileNames.map((fileName) => {
    const filePath = path.join(markdownDir, fileName);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const [_, yamlMeta, markdown] = fileContents.split(SEPARATOR);
    // No meta tag for this article
    if (_ !== "")
      return {
        fileName,
        // If no meta tags were provided
        content: marked(_),
      };
    try {
      const meta = parse(yamlMeta);
      return {
        fileName,
        // If no meta tags were provided
        content: marked(markdown),
        meta,
      };
    } catch (error) {
      console.error("Could not parse YAML meta");
      throw error;
    }
  });
};
