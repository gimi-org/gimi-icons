import textToImage from "text-to-image";
import ImageDataURI from "image-data-uri";
import { markdownTable } from "markdown-table";
import { writeFile } from "fs/promises";
import icons from "../LinearIcons.js";

const ROW_CELL_LIMIT = 4;

async function main() {
  const table = [];
  const rowCellLimit = 4;
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
      if (cellCount === ROW_CELL_LIMIT) {
        table.push(tableRow);
        tableRow = [];
        cellCount = 0;
      }
    } catch (e) {
      console.log(e);
    }
  }
  table.push(tableRow);

  output += markdownTable(table, { align: Array.fill("c", 0, ROW_CELL_LIMIT) });

  await writeFile("CHEAT_SHEET.md", output);
}

main();
