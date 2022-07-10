import urlExistSync from "url-exist-sync";

// Define "require"
import { createRequire } from "module";
const require = createRequire(import.meta.url);

let csv = require('csv-parser');
let fs = require('fs');
let {render} = require('mustache');

let template = `
# {{id}} - {{name}}
{{short_note}}

Author: [{{author}}](https://www.github.com/{{author}}/) \\
Repo: [{{repo}}](https://www.github.com/{{author}}/{{repo}}/)

![screenshot]({{screenshot}})
`;

let output = "";
let id = 1;

fs.createReadStream('_data/themes.csv')
  .pipe(csv({}))
  .on('data', (themes) => {
    let url = "https://raw.githubusercontent.com/"+themes.author+"/"+themes.repo+"/master/screenshot.";
    url = imgUrlExists(url)

    themes.id = id;
    themes.screenshot = url;
    output += render(template, themes)
    id += 1;
  })
  .on('end', () => {
    fs.writeFileSync("./themes.md", output);
    console.log('CSV file successfully processed');
  });

function imgUrlExists (url) {
  if (urlExistSync(url+"png")) 
    return url+"png";    
  else if (urlExistSync(url+"jpg"))
    return url+"jpg";
  else 
    return "";
}