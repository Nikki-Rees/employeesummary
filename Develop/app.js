const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

const processAnswers = answers => {

    if (answers.addRole === "Engineer") {
        const newEngineer = new Engineer(answers.name, answers.email, answers.id, answers.github);
        employees.push(newEngineer);
    }
    else if (answers.addRole === "Intern") {
        const newIntern = new Intern(answers.name, answers.email, answers.id, answers.school);
        employees.push(newIntern);
    }
    if (answers.addAnother) {
        promptEmployee();
    } else {
        fs.writeFile(outputPath, render(employees), err => {
            if (err) {
                throw err;
            }
            console.log(employees
            )
        });

    };
}

function promptManager() {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Please enter manager name",
            default: "No information provided"
        }, {
            type: "input",
            name: "email",
            message: "Please enter employee email",
            default: "No information provided"
        }, {
            type: "confirm",
            name: "addRole",
            message: "Role is manager",
        }, {
            type: "input",
            name: "id",
            message: "Please enter employee ID",
            default: "No information provided"
        }, {
            type: "input",
            name: "officeNumber",
            message: "Please enter manager's office number"
        }

    ]).then(answers => {
        const newManager = new Manager(answers.name, answers.email, answers.id, answers.officeNumber);
        employees.push(newManager);
        promptEmployee();
    })

};

promptManager()

function promptEmployee() {
    return inquirer.prompt([
        {
            type: "list",
            name: "addRole",
            message: "Please enter employee role",
            choices: ["Engineer", "Intern"]
        }, {
            type: "input",
            name: "name",
            message: "Please enter employee name",
            default: "No information provided"
        }, {
            type: "input",
            name: "email",
            message: "Please enter employee email",
            default: "No information provided"
        }, {
            type: "input",
            name: "id",
            message: "Please enter employee ID",
            default: "No information provided"
        }, {
            type: "input",
            name: "github",
            message: "Please enter engineer's gitHub username",
            when: (answers) => answers.addRole === "Engineer"
        }, {
            type: "input",
            name: "school",
            message: "Please enter intern's school",
            when: (answers) => answers.addRole === "Intern"
        }, {
            type: "confirm",
            name: "addAnother",
            message: "Would you like to add another team member?"
        }

    ]).then(processAnswers());
}

