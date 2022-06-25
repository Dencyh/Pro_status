const XLSX = require("xlsx");
const fs = require("fs");
const HTMLParser = require("node-html-parser");
const cheerio = require("cheerio");
const cheerioTableparser = require("cheerio-tableparser");

const files = fs
  .readdirSync("./src/HTML")
  .filter((file) => file != ".DS_Store");

let drivers = [];

files.forEach((file, index) => {
  const html = fs.readFileSync(`./src/HTML/${file}`).toString();

  const $ = cheerio.load(html);

  cheerioTableparser($);

  /* Status */
  let status = $(".Table_status__3tCyu .DriverStatusCell_badge__BtkR_")
    .toArray()
    .map((x) => {
      return $(x).text();
    });

  /* Number */
  let numbers = $(".CallSignCell_cell__bUu0J")
    .toArray()
    .map((x) => {
      return $(x).text();
    });
  /*   let numbers = numbersElements.map((element) => element.innerText); */

  /* Names */
  let names = $(".Table_name__-P4ig .DriverLink_container__35QA8")
    .toArray()
    .map((x) => {
      return $(x).text();
    });

  /* Test space removal */
  let namesClean = $(".Table_name__-P4ig .DriverLink_container__35QA8")
    .toArray()
    .map((x) => {
      return $(x).text();
    })
    .map((name) => name.slice(0, name.length - 1));

  let namesShort = names
    .map((name) => name.split(" "))
    .map((name) => name[0] + " " + name[1]);

  /* Phone */
  let phones = $(".не работает123123123123")
    .toArray()
    .map((x) => {
      return $(x).text();
    });

  /* Park */
  let company = $(".ParkSelector_option__Gq6k9 .Text_typography_body").text();

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
