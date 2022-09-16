import textToImage from "text-to-image";
import ImageDataURI from "image-data-uri";
import { markdownTable } from "markdown-table";
import { writeFile } from "fs/promises";
import icons from "../LinearIcons.js";

async function main() {
  const table = [];
  let output = "# Cheat Sheet\n";
  let cellCount = 0;
  let tableRow = [];
  for (const [key, char] of Object.entries(icons)) {
    try {
      const dataUri = await textToImage.generate(char, {
        maxWidth: 64,
        maxHeight: 64,
        fontSize: 40,
        fontFamily: "Linearicons",
        fontPath: "LinearIcons.ttf",
        lineHeight: 1,
        margin: 10,
        bgColor: "white",
        textColor: "black",
        textAlign: "center",
      });
      await ImageDataURI.outputFile(dataUri, `images/${key}.png`);
      tableRow.push(`![${key}](images/${key}.png)<br>${key}`);
      cellCount++;
      if (cellCount === 5) {
        table.push(tableRow);
        tableRow = [];
        cellCount = 0;
      }
    } catch (e) {
      console.log(e);
    }
  }
  table.push(tableRow);

  output += markdownTable(table, { align: ["c", "c", "c", "c", "c"] });

  await writeFile("CHEAT_SHEET.md", output);
}

main();
