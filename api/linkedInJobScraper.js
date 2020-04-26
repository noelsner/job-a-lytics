const puppeteer = require('puppeteer');

const scrapeJob = async(id) => {

    try {
        const browser = await puppeteer.launch({
            headless: true
        })
        const linkedInURL = `https://www.linkedin.com/jobs/view/${id}`;
        const page = await browser.newPage();

        await page.goto(linkedInURL);
        await page.waitForSelector("main");

        const scrapeJobId = await page.evaluate( (linkedInURL, id) => {

            const descriptionNode = document.querySelector("section.description");
            const titleNode = document.querySelector("h1.topcard__title");
            const companyNode = document.querySelector("a.topcard__org-name-link");
            const locationNode = document.querySelector("span.topcard__flavor.topcard__flavor--bullet");
            const timeNode = document.querySelector("span.topcard__flavor--metadata.posted-time-ago__text");
           
            const job = {
                listingId: id,
                company: "error loading, please run search again",
                title: "error loading, please run search again",
                type: "blank for now",
                location: "error loading, please run search again",
                listingURL: linkedInURL,
                companyURL: "blank for now",
                postedDate: "error loading, please run search again",
                description: "error loading, please run search again", 
            };
            
            if(companyNode){
                job.company = companyNode.innerText;
            }

            if(titleNode){
                job.title = titleNode.innerText;
            }

            if(locationNode){
                job.location = locationNode.innerText;
            }

            if(timeNode){
                job.postedDate = timeNode.innerText;
            }

            if(descriptionNode) {
                job.description = descriptionNode.innerHTML;
                job.descriptionText = descriptionNode.innerText;
            };

            return job;
        });

        await browser.close();
        console.log("Browser Closed");
        //console.log(scrapeJobId);
        return scrapeJobId;

    } catch (err) {
        console.log(err);
        await browser.close();
        console.log("Browser Closed");
    }
};

//scrapeJob("1823436034");

module.exports = scrapeJob;