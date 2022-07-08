import { parse } from 'node-html-parser';
import fs from "fs";




const files = fs
    .readdirSync("./src/Test htlm", { withFileTypes: true })
    .filter((file) => file != ".DS_Store" && file.isFile())
    .map((file) => file.name);


files.forEach((file, index) => {
    const html = fs.readFileSync(`./src/Test htlm/${file}`).toString();
    const root = parse(html)

    let status = root.querySelectorAll('.Text_typography_caption.NativeTable_td__WGF6R:nth-child(10n)').map((element) => {
   console.log(element.innerText.replace('Ford Transit', ''))

     /* if (element === 0) {
          return 'null'
      } else {
         /!* return element.querySelector('.CarCell_number__EVLRr')*!/
          return 'есть ребенок'
      }*/

    })

    console.log(status)
    console.log(status.length)



})

