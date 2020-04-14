const puppeteer = require('puppeteer');
const fs = require('fs');

//const rawdata = fs.readFileSync('linkedin.json');
//let student = JSON.parse(rawdata);
//console.log(student);



const scrapeNews = async() => {
    try {
        const browser = await puppeteer.launch({
            headless: false
        })
        const jobPost = "https://www.linkedin.com/jobs/view/1792509104/";
        const page = await browser.newPage();

        await page.goto("https://www.linkedin.com/jobs/view/1792509104/");
        await page.waitForSelector("section.description");

        const jobScrape = await page.evaluate(  () => {
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
                    link: "https://www.linkedin.com/jobs/view/1792509104/",
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

scrapeNews();