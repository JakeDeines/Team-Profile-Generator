const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");


const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


let team = [];

function role() {
    inquirer.prompt([
        {
            type: "list",
            message: "Employee Type:",
            name: "employeeType",
            choices: [
                Manager,
                Engineer,
                Intern
            ]
        },
    ])
        .then(function (answer) {

            if (answer.employeeType === "Manager") {
                managerInfo();
            } else if
                (answer.employeeType === "Engineer") {
                engineerInfo();
            } else if
                (answer.employeeType === "Intern") {
                internInfo();
            }
            else {

                return;
            }
        })
}

role();


function managerInfo() {
    inquirer.prompt([

        {
            type: "input",
            message: "Manager's Name:",
            name: "managerName",
        },
        {
            type: "input",
            message: "Manager's Employee ID:",
            name: "id",
        },
        {
            type: "input",
            message: "Manager's Email:",
            name: "email",
        },
        {
            type: "input",
            message: "Manager's Office Number:",
            name: "officeNumber",
        },
        {
            type: "confirm",
            message: "Enter additional employee(s)?",
            name: "addRole",
        },

    ])
        .then(function (answers) {


            const manager = new Manager(answers.managerName, answers.id, answers.email, answers.officeNumber);
            team.push(manager);




            if (answers.addRole) {
                role();
            } else {
                let data = render(team);
                fs.writeFile(outputPath, data, function (err) {
                    if (err) throw err;
                    console.log("Team saved!");
                });
            }


        })
}


function engineerInfo() {
    inquirer.prompt([

        {
            type: "input",
            message: "Engineer's Name:",
            name: "engineerName",
        },
        {
            type: "input",
            message: "Engineer's Employee ID:",
            name: "id",
        },
        {
            type: "input",
            message: "Engineer's Email:",
            name: "email",
        },
        {
            type: "input",
            message: "Engineer's Github Username:",
            name: "github",
        },
        {
            type: "confirm",
            message: "Enter additional employee(s)?",
            name: "addRole",
        },

    ])
        .then(function (answers) {

            const engineer = new Engineer(answers.engineerName, answers.id, answers.email, answers.github);
            team.push(engineer);



            if (answers.addRole) {
                role();
            } else {
                let data = render(team);
                fs.writeFile(outputPath, data, function (err) {
                    if (err) throw err;
                    console.log("Team saved!");
                });
            }
        })
}

function internInfo() {
    inquirer.prompt([

        {
            type: "input",
            message: "Intern's Name:",
            name: "internName",
        },
        {
            type: "input",
            message: "Intern's Employee ID:",
            name: "id",
        },
        {
            type: "input",
            message: "Intern's Email:",
            name: "email",
        },
        {
            type: "input",
            message: "Intern's School:",
            name: "school",
        },
        {
            type: "confirm",
            message: "Enter additional employee(s)?",
            name: "addRole",
        },

    ])
        .then(function (answers) {

            const intern = new Intern(answers.internName, answers.id, answers.email, answers.school);
            team.push(intern);



            if (answers.addRole) {
                role();
            } else {
                let data = render(team);
                fs.writeFile(outputPath, data, function (err) {
                    if (err) throw err;
                    console.log("Team saved!");
                });
            }
        })
}




