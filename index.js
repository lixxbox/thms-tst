let csv = require('csv-parser');
let fs = require('fs');
let {render} = require('mustache');

let template = `
# {{name}}
{{short_note}}
Author: [{{author}}](https://www.github.com/{{author}}/) \\
Repo: [{{repo}}](https://www.github.com/{{author}}/{{repo}}/) 
`;

let output = "";

fs.createReadStream('_data/themes.csv')
  .pipe(csv({}))
  .on('data', (row) => {
    //console.log(row);
    //console.log("neue zeile")
    //let output = render(template, row);
    //fs.writeFileSync("./themes.md", output);
    output += render(template, row)
  })
  .on('end', () => {
    fs.writeFileSync("./themes.md", output);
    console.log('CSV file successfully processed');
  });

