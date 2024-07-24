
const Asana = require('asana');

let client = Asana.ApiClient.instance;
let token = client.authentications['token'];
token.accessToken = '<YOUR_ACCESS_TOKEN>';

module.exports.getSectionsForProject  = async (project_gid) => {
    const sectionsApiInstance = new Asana.SectionsApi();
    let sections = [];
    let opts = {};
    await sectionsApiInstance.getSectionsForProject(project_gid, opts).then((result) => {        
        sections = result.data;        
    }, (error) => {
        console.error(error.response.body);
    });
    return sections;
} 