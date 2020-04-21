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
            const snippetNodeList = document.querySelectorAll("p.job-result-card__snippet");
            const list = [];
            
            for(let i = 0; i < jobNodeList.length; i++ ){
                
                const job = {
                    listingId: "error loading, please run search again",
                    company: "error loading, please run search again",
                    title: "error loading, please run search again",
                    type: "blank for now",
                    location: "error loading, please run search again",
                    listingURL: "error loading, please run search again",
                    companyURL: "blank for now",
                    postedDate: "error loading, please run search again",
                    description: "error loading, please run search again"
                }

               if(jobNodeList[i]){
                    job.listingId = jobNodeList[i].getAttribute("data-id");
                    job.listingURL = `https://www.linkedin.com/jobs/view/${jobNodeList[i].getAttribute("data-id")}`;
                }

                if(companyNodeList[i]){
                    job.company = companyNodeList[i].innerText;
                }

                if(titleNodeList[i]){
                    job.title = titleNodeList[i].innerText;
                }

                
                if(locationNodeList[i]){
                    job.location = locationNodeList[i].innerText;
                }
                
                if(timeNodeList[i]){
                    job.postedDate = timeNodeList[i].getAttribute("datetime");
                }
                
                if(snippetNodeList[i]){
                    job.description = snippetNodeList[i].innerText;
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