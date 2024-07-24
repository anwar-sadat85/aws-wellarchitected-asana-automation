const Asana = require('asana');

let client = Asana.ApiClient.instance;
let token = client.authentications['token'];
token.accessToken = '<YOUR_ACCESS_TOKEN>';

const createTaskForProject = async (sectionName, question, projectIds) => {
    let tasksApiInstance = new Asana.TasksApi();
    let body = { "data": { "name": question.QuestionId, "projects": projectIds } }; // Object | The task to create.
    let opts = {
        'opt_fields': "actual_time_minutes,approval_status,assignee,assignee.name,assignee_section,assignee_section.name,assignee_status,completed,completed_at,completed_by,completed_by.name,created_at,created_by,custom_fields,custom_fields.asana_created_field,custom_fields.created_by,custom_fields.created_by.name,custom_fields.currency_code,custom_fields.custom_label,custom_fields.custom_label_position,custom_fields.date_value,custom_fields.date_value.date,custom_fields.date_value.date_time,custom_fields.description,custom_fields.display_value,custom_fields.enabled,custom_fields.enum_options,custom_fields.enum_options.color,custom_fields.enum_options.enabled,custom_fields.enum_options.name,custom_fields.enum_value,custom_fields.enum_value.color,custom_fields.enum_value.enabled,custom_fields.enum_value.name,custom_fields.format,custom_fields.has_notifications_enabled,custom_fields.id_prefix,custom_fields.is_formula_field,custom_fields.is_global_to_workspace,custom_fields.is_value_read_only,custom_fields.multi_enum_values,custom_fields.multi_enum_values.color,custom_fields.multi_enum_values.enabled,custom_fields.multi_enum_values.name,custom_fields.name,custom_fields.number_value,custom_fields.people_value,custom_fields.people_value.name,custom_fields.precision,custom_fields.representation_type,custom_fields.resource_subtype,custom_fields.text_value,custom_fields.type,dependencies,dependents,due_at,due_on,external,external.data,followers,followers.name,hearted,hearts,hearts.user,hearts.user.name,html_notes,is_rendered_as_separator,liked,likes,likes.user,likes.user.name,memberships,memberships.project,memberships.project.name,memberships.section,memberships.section.name,modified_at,name,notes,num_hearts,num_likes,num_subtasks,parent,parent.created_by,parent.name,parent.resource_subtype,permalink_url,projects,projects.name,resource_subtype,start_at,start_on,tags,tags.name,workspace,workspace.name"
    };
    tasksApiInstance.createTask(body, opts).then((result) => {

        const taskId = result.data.gid;

        question.BestPractices.forEach((bestPractice, index) => {
            setTimeout(() => {
                createSubTask(bestPractice.ChoiceTitle, taskId);
            }, index * 10000);

        });

        setTimeout(() => {
            addTaskToSection(sectionName, taskId);
        }, 10000);


    }, (error) => {
        console.error(`main task not created ${JSON.stringify(error.response.body)}`);
    });
}

const sleep = async (ms) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

const addTaskToSection = async (sectionId, taskId) => {
    let sectionsApiInstance = new Asana.SectionsApi();
    let section_gid = sectionId;
    let opts = {
        'body': { "data": { "task": taskId } }
    };
    sectionsApiInstance.addTaskForSection(section_gid, opts).then(() => {

    }, (error) => {
        console.error(`Unable to add ${taskId} to section : ${sectionId} due to ${JSON.stringify(error.response.body)}`);
    });
}

const createSubTask = async (name, parent) => {
    let tasksApiInstance = new Asana.TasksApi();
    let body = { "data": { "name": name } }; // Object | The task to create.
    let opts = {
        'opt_fields': "actual_time_minutes,approval_status,assignee,assignee.name,assignee_section,assignee_section.name,assignee_status,completed,completed_at,completed_by,completed_by.name,created_at,created_by,custom_fields,custom_fields.asana_created_field,custom_fields.created_by,custom_fields.created_by.name,custom_fields.currency_code,custom_fields.custom_label,custom_fields.custom_label_position,custom_fields.date_value,custom_fields.date_value.date,custom_fields.date_value.date_time,custom_fields.description,custom_fields.display_value,custom_fields.enabled,custom_fields.enum_options,custom_fields.enum_options.color,custom_fields.enum_options.enabled,custom_fields.enum_options.name,custom_fields.enum_value,custom_fields.enum_value.color,custom_fields.enum_value.enabled,custom_fields.enum_value.name,custom_fields.format,custom_fields.has_notifications_enabled,custom_fields.id_prefix,custom_fields.is_formula_field,custom_fields.is_global_to_workspace,custom_fields.is_value_read_only,custom_fields.multi_enum_values,custom_fields.multi_enum_values.color,custom_fields.multi_enum_values.enabled,custom_fields.multi_enum_values.name,custom_fields.name,custom_fields.number_value,custom_fields.people_value,custom_fields.people_value.name,custom_fields.precision,custom_fields.representation_type,custom_fields.resource_subtype,custom_fields.text_value,custom_fields.type,dependencies,dependents,due_at,due_on,external,external.data,followers,followers.name,hearted,hearts,hearts.user,hearts.user.name,html_notes,is_rendered_as_separator,liked,likes,likes.user,likes.user.name,memberships,memberships.project,memberships.project.name,memberships.section,memberships.section.name,modified_at,name,notes,num_hearts,num_likes,num_subtasks,parent,parent.created_by,parent.name,parent.resource_subtype,permalink_url,projects,projects.name,resource_subtype,start_at,start_on,tags,tags.name,workspace,workspace.name"
    };
    await sleep(10000);
    tasksApiInstance.createSubtaskForTask(body, parent, opts).then(() => {


    }, (error) => {
        console.error(`subtask ${name} not created for ${parent} ${JSON.stringify(error.response)}`);
    });
}

module.exports.getHighPriorityItemsByPillars = async (input) => {
    const pillars = input.Metrics[0].Lenses[0].Pillars;
    return pillars.filter(pillar => pillar.Questions.length > 0);
}

module.exports.createTasksForPillar = async (sectionName, question, projectIds) => {
    await createTaskForProject(sectionName, question, projectIds);
}









