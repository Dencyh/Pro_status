import XLSX from "xlsx";
import { parse } from 'node-html-parser';
import fs from "fs";

const files = fs
  .readdirSync("./src/HTML", { withFileTypes: true })
  .filter((file) => file != ".DS_Store" && file.isFile())
  .map((file) => file.name);

console.log(files);

let drivers = [];

files.forEach((file, index) => {
  const html = fs.readFileSync(`./src/HTML/${file}`).toString();

  const root = parse(html)



  /* Status */
  let status = root.querySelectorAll(".Table_status__3tCyu .DriverStatusCell_badge__BtkR_")
    .map(element => element.innerText)

  /* Number */
  let numbers = root.querySelectorAll(".CallSignCell_cell__bUu0J")
    .map(element => element.innerText)

  /* Names */
  let names = root.querySelectorAll(".Table_name__-P4ig .DriverLink_container__35QA8")
     .map(element => element.innerText)

  /* Test space removal */
  let namesClean = root.querySelectorAll(".Table_name__-P4ig .DriverLink_container__35QA8")
    .map(element => element.innerText)
    .map((name) => name.slice(0, name.length - 1));

  let namesShort = names
    .map((name) => name.split(" "))
    .map((name) => name[0] + " " + name[1]);

  /* Phone */
  let phones = root.querySelectorAll(".не работает123123123123")


  /* Park */
  let company =  root.querySelectorAll(".ParkSelector_option__Gq6k9")[0];
  console.log(company)

  /* Pushing data to object */
  status.forEach((status, index) => {
    drivers.push({
      status: status,
      number: numbers[index],
      name: namesClean[index],
      nameShort: namesShort[index],
      phone: phones[index],
      company: company,
    });
  });
});

/* console.log(drivers); */

function getData(fileName, sheetName, folder) {
  const sheet = XLSX.readFile(`${folder}/${fileName}`, { cellDates: true })
    .Sheets[sheetName];

  const data = XLSX.utils.sheet_to_json(sheet);

  return data;
}

// Creating new file and writing to it
const newWB = XLSX.utils.book_new();

const WS_name = "Статусы курьеров";
const WS = XLSX.utils.json_to_sheet(drivers);
WS["!cols"] = [
  { wpx: 80 },
  { wpx: 80 },
  { wpx: 250 },
  { wpx: 160 },
  { wpx: 80 },
  { wpx: 150 },
];
XLSX.utils.book_append_sheet(newWB, WS, WS_name);

XLSX.writeFile(newWB, "./ProStatus.xlsx");
