import { parse } from 'node-html-parser';
import fs from "fs";




const files = fs
    .readdirSync("./src/Test htlm", { withFileTypes: true })
    .filter((file) => file != ".DS_Store" && file.isFile())
    .map((file) => file.name);


files.forEach((file, index) => {
    const html = fs.readFileSync(`./src/Test htlm/${file}`).toString();
    const root = parse(html)

    let status = root.querySelectorAll('.NativeTable_td__WGF6R:nth-child(10n)').map((element) => {
      if (element.innerText == '') {
          return 'пустая строка'
      } else {
          return element.innerText
      }

    })

    console.log(status.length)



})




//const root = parse(fs.readFileSync('./src/HTML/' + files[1]).toString());
//console.log(fs.readFileSync('./src/HTML/' + files[1]).toString())

//console.log(root.querySelector('.DriverLink_container__35QA8').innerText);

