import puppeteer from 'puppeteer';
//import fs from 'fs';

//const rawdata = fs.readFileSync('linkedin.json');
//let student = JSON.parse(rawdata);
//console.log(student);

const query = "developer";
const location = "chicago"

const scrapeQuery = async(query, location) => {

    const searchURL = `https://www.linkedin.com/jobs/search?keywords=${query}&location=${location}`;

    try {
        const browser = await puppeteer.launch({
            headless: false
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
            
            //console.log here prevents the program from crashing, not sure why
            //leaving the console.log here for now so the program works
            console.log(locationNodeList[0].innerText); 
            
            
            for(let i = 0; i < jobNodeList.length; i++ ){
                const job = {
                    id: jobNodeList[i].getAttribute("data-id"),
                    type: "blank for now",
                    url: `https://www.linkedin.com/jobs/view/${jobNodeList[i].getAttribute("data-id")}`,
                    title: titleNodeList[i].innerText,
                    company: companyNodeList[i].innerText,
                    company_url: "blank for now",
                    location: locationNodeList[i].innerText,
                    created_at: timeNodeList[i].getAttribute("datetime"),
                    description: "will scrape seperately"
                }
                list.push(job)
            }

            return list;
        });

        await browser.close();
        console.log(listScrape);
        /*
        fs.writeFile("linkedInQuery.json", JSON.stringify(listScrape), function(err){
            if(err) throw err;
            console.log("Saved!");
        });
        */
        console.log("Browser Closed");

    } catch (err) {
        console.log(err);
        await browser.close();
        console.log("Browser Closed");
    }
};

//scrapeQuery(query, location);

export default scrapeQuery;