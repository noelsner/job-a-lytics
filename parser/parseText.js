const uselessWords = require('./uselessWords');
const skillWords = require('./skillWords');

const sampleText = `System1 is looking for a creative and talented Front End Developer. Our platform interacts with tens of million of users per month, and our mission is to develop user interfaces that provide an intuitive user interaction and dramatically enhance the overall user experience. In this role, your contributions will be extremely visible and have a direct impact on a large user base. We experiment with and optimize all our user interfaces, and we actively find the most effective layouts via extensive A/B testing. Our design life-cycle is consistently driven by quantitative data analysis in order to measure and maximize user impact. You will utilize core software development skills to create user-facing applications and tools that will assist partners in optimizing their use of our innovative analytics platform.

The Role You Will Have
• Responsible for delivering high quality features on new and existing web applications using HTML, CSS, and JavaScript (Node.js, React, and vanilla)
• Create intuitive, robust, and reusable user interfaces with JavaScript and associated frameworks
• Convert UI specifications into clean and easy to maintain responsive web pages
• Assist in documenting, debugging, evaluating, and unit testing projects
• Participate in code reviews and application design discussions
• Collaborate and communicate effectively, working in a team environment with other experienced engineers
• Find solutions for cross-browser issues in both HTML/CSS and JavaScript
• Implement A/B tests

What You Will Bring
• 2+ years of professional web development experience
• Experience in HTML, CSS, and vanilla JavaScript, cross-browser compatible and mobile-friendly environments
• Understanding of CSS and experience with preprocessors (Less, Sass)
• Experience with PostCSS a plus
• Excellent communication and time management skills
• Attention to detail for tasks both big and small
• Ability to manage time effectively and complete work by given deadlines
• Proactive instead of reactive: looking for ways to improve self and projects
• Ability to adapt and integrate quickly into a fast-paced environment
• Experience with Git
• Experience with Webpack, Gulp, Babel, and BrowserStack preferred
• Understanding of Python and Jinja a plus

What We Have To Offer
• Free Uber/Lyft to and from work every day!
• Collegial and collaborative team with highly intelligent and motivated coworkers
• Cross-team lunches and demos to foster learning
• Unlimited Paid Sick Time, Competitive PTO and Benefits package
• Daily catered meals and fully stocked kitchen
• Bi-weekly happy hour at various bars, restaurants, and venues across Los Angeles
• Bi-weekly onsite happy hour
• Catered dinner on Tuesdays and Thursdays
• Weekly fitness class with private trainer: high intensity training, yoga, beach volleyball, beach soccer, ultimate frisbee
• Company parties and outings: Skyzone indoor skydiving, Medieval Times, Karaoke, etc`;

const parseText = (text) => {

  const hashArray = skillWords.reduce( (acc, word) => {
    const regex = new RegExp(word,'gi');
    const count = (text.match(regex) || []).length;
    if(count > 0) {
      acc.push({'name': word,'count': count });
    }
    return acc;
  },[]);

  const sorted = hashArray.sort(function(a, b) {
      return b.count - a.count;
  });

  return sorted;

};
//Test Line
//console.log(parseText('There is React development some a the a the'))
console.log(parseText(sampleText));

module.exports = parseText;