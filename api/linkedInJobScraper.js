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
                id: id,
                type: "blank for now",
                url: linkedInURL,
                title: "error loading, please run search again",
                seniority: "Error loading description. Please try again at a later time",
                company: "error loading, please run search again",
                company_url: "blank for now",
                location: "error loading, please run search again",
                created_at: "error loading, please run search again",
                description: "error loading, please run search again", 
            };

            if(titleNode){
                job.title = titleNode.innerText;
            }

            if(companyNode){
                job.company = companyNode.innerText;
            }

            if(locationNode){
                job.location = locationNode.innerText;
            }

            if(timeNode){
                job.created_at = timeNode.innerText;
            }

            if(descriptionNode) {
                job.description = descriptionNode.innerText;
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