const puppeteer = require('puppeteer');
const fs = require('fs');

//const rawdata = fs.readFileSync('linkedin.json');
//let student = JSON.parse(rawdata);
//console.log(student);

const jobId = "1821989317";

const scrapeJob = async(jobId) => {

    const jobLink = `https://www.linkedin.com/jobs/view/${jobId}`;

    try {
        const browser = await puppeteer.launch({
            headless: true
        })
        
        const page = await browser.newPage();

        await page.goto(jobLink);
        await page.waitForSelector("section.description");

        const jobScrape = await page.evaluate(  (jobLink, jobId) => {
            const title = document.querySelector("h1.topcard__title").innerText;
            const company = document.querySelector("a.topcard__org-name-link.topcard__flavor--black-link").innerText;
            const location = document.querySelector("span.topcard__flavor.topcard__flavor--bullet").innerText;
            const description = document.querySelector("section.description").innerText;
            const date = document.querySelector("span.topcard__flavor--metadata.posted-time-ago__text").innerText;
            const postings = [];       
                const singlePost = { //Valid and works
                    title: title,
                    company: company,
                    date: date,
                    jobID: jobId,
                    link: jobLink,
                    location: location,
                    description: description,
                }
                
            postings.push(singlePost);
            

            return postings;
        });

        await browser.close();

        fs.writeFile("linkedin.json", JSON.stringify(jobScrape), function(err){
            if(err) throw err;
            console.log("Saved!");
        });

        console.log("Browser Closed");

    } catch (err) {
        console.log(err);
        await browser.close();
        console.log("Browser Closed");
    }
};

scrapeJob(jobId);