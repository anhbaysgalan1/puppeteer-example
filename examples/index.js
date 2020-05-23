const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: true,
        args: [
            '--disable-gpu',
            '--disable-dev-shm-usage',
            '--disable-setuid-sandbox',
            '--disable-accelerated-2d-canvas',

            '--no-first-run',
            '--no-sandbox',
            '--no-zygote',
            '--single-process',

        ],
    });

 
  var documentNames=["examplefile1.pdf", "examplefile2.doc"]

  var arrayLength = documentNames.length;
    for (var i = 0; i < arrayLength; i++) {
        const page = await browser.newPage();
        await page._client.send('Page.setDownloadBehavior', {behavior: 'allow', downloadPath: '/home/jojo/dip'});
        await page.goto('https://example.com/'+documentNames[i], { waitUntil: 'domcontentloaded' }).catch(error => {error});
        console.log("downloaded",documentNames[i])
        console.log("files count", i)
        await page.close();
    }


  await browser.close();
})();
