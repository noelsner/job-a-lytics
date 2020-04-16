const puppeteer = require('puppeteer');

const scrapeQuery = async(query, location) => {

    const searchURL = `https://www.linkedin.com/jobs/search?keywords=${query}&location=${location}`;

    try {
        const browser = await puppeteer.launch({
            headless: true
        })
        
        const page = await browser.newPage();

        await page.goto(searchURL);
        await page.waitForSelector("main");

        const listScrape = await page.evaluate(  (jobLink, jobId) => {
            const jobNodeList = document.querySelectorAll("li.result-card.job-result-card.result-card--with-hover-state");
            const titleNodeList = document.querySelectorAll("h3.result-card__title.job-result-card__title");
            const companyNodeList = document.querySelectorAll("a.result-card__subtitle-link.job-result-card__subtitle-link");
            const locationNodeList = document.querySelectorAll("span.job-result-card__location");
            const timeNodeList = document.querySelectorAll("time");
            const list = [];
            
            for(let i = 0; i < jobNodeList.length; i++ ){
                
                const job = {
                    id: "error loading",
                    type: "blank for now",
                    url: "error loading",
                    title: "error loading",
                    company: "error loading",
                    company_url: "blank for now",
                    location: "error loading",
                    created_at: "error loading",
                    description: "will scrape seperately"
                }

                if(jobNodeList[i]){
                    job.id = jobNodeList[i].getAttribute("data-id");
                    job.url = `https://www.linkedin.com/jobs/view/${jobNodeList[i].getAttribute("data-id")}`;
                    job.title = titleNodeList[i].innerText;
                    job.company = companyNodeList[i].innerText;
                    job.location = locationNodeList[i].innerText;
                    job.created_at = timeNodeList[i].getAttribute("datetime");
                } 

                list.push(job);
                
            }

            return list;
        });

        await browser.close();
        console.log("Browser Closed");

        return listScrape;

    } catch (err) {
        console.log(err);
        await browser.close();
        console.log("Browser Closed");
    }
};

module.exports = scrapeQuery;