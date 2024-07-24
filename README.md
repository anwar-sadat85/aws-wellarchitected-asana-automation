# Create tasks from AWS Well Architected Report
This is a sample node js tool to create tasks in Asana from the AWS well architected review recommendations.

## Pre-requisites
1. Create an Asana project and create sections in the project with the names of the AWS well architected pillars.
2. Note down the GID of the project.
3. Create and store securely an API token from Asana that will then be used to initialize the Asana JavaScript client.
4. Use the AWS [CLI tool](https://docs.aws.amazon.com/cli/latest/reference/wellarchitected/get-consolidated-report.html) to get the AWS well architected consolidated report.

## How to run the tool.
1. Clone this repository.
2. Replace all instances of <YOUR_ACCESS_TOKEN> with the Asana API token in the code base.
3. Set the value for the projectIds variable in index.js with the value of the project GID from Asana.
4. Run the following command
   ```
   node index.js
   ```
5. Once the code runs successfully, you should see the tasks and sub tasks created for the recommendations that are of 'HIGH' priority.
