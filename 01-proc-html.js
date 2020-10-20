// Print all links for a given html file

// In jems, collect the HTML file from the 'list papers' option with 'extra files' enabled
// Save it in 'papers.html'
// Save the output of this script in the 'links.txt' file

const fs = require('fs');
const cheerio = require('cheerio');

const content = fs.readFileSync('papers.html', 'utf-8');
const $ = cheerio.load(content);
const allLink = $('a');

for (let i = 0; i < allLink.length; i++) {
    console.log(allLink[i].attribs['href']);
}