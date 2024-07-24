/* 
 * This code sample demonstrates how to create tasks in Asana using the Asana API.
 * It reads the well architected report from a JSON file, extracts the high priority items by pillar,
 * and creates tasks for each of the pillars in the specified project.
 */

const sections = require('./utils/getsections.js');
const report = require('./utils/report.js');
const fs = require('fs'); 
const projectIds = ["xxxxxxxxxxxxxxxx"]; // String | Globally unique identifier for the project.

(async () => {     
    //Get Project Sections
    const projectSections = await sections.getSectionsForProject(projectIds[0]);    

    //Read input file    
    const wellarchitectedReport = JSON.parse(fs.readFileSync('./input/report.json', 'utf8'));
    
    //Get Pillars from report
    const pillars = await report.getHighPriorityItemsByPillars(wellarchitectedReport);
   
    //Create tasks for each of the pillars
    pillars.forEach(pillar => {
        const section = projectSections.find((section) => {
            const sectionName = section.name.replace(
                / /g,
                ""
            );
            sectionName.toLowerCase() === pillar.PillarId.toLowerCase()
        });
        if (section) {
            // Create tasks for only high priority items
            pillar.Questions.filter(question => question.Risk === 'HIGH').forEach(question => {
                report.createTasksForPillar(section.gid, question,projectIds);
            });
        }
    });

})();