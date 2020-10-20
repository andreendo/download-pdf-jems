// Slowly download all files listed in 'links.txt'

// login in the jems
// pass your login and password using env variables U and P, respectively

const puppeteer = require('puppeteer');
const fsp = require('fs').promises;
const timeout = 60000; // make it very slow to avoid errors with big files

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page._client.send('Page.setDownloadBehavior', { behavior: 'allow', downloadPath: './dist' })
    await page.goto('https://jems.sbc.org.br/index.cgi');
    await page.type('body > form > table > tbody > tr:nth-child(2) > td:nth-child(2) > input', process.env.U);
    await page.type('body > form > table > tbody > tr:nth-child(3) > td:nth-child(2) > input[type=password]', process.env.P);
    await page.keyboard.press('Enter');
    await page.waitFor(timeout);
    const links = (await fsp.readFile('links.txt', 'utf-8')).split('\n');
    for (let link of links) {
        try {
            console.log('Downloading', link);
            await page.waitFor(timeout);
            await page.goto(link);
        } catch (err) { }
    }
    await page.waitFor(timeout);
    await browser.close();
})();