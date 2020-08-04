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
            message: "Please enter manager's full name:",
            default: "No information provided"
        }, {
            type: "input",
            name: "email",
            message: "Please enter manager's email:",
            default: "No information provided"
        }, {
            type: "input",
            name: "id",
            message: "Please enter manager's employee ID",
            default: "No information provided"
        }, {
            type: "input",
            name: "officeNumber",
            message: "Please enter the manager's office number"
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
            message: "Please select the employee's role:",
            choices: ["Engineer", "Intern"]
        }, {
            type: "input",
            name: "name",
            message: "Please enter the employee's full name:",
            default: "No information provided"
        }, {
            type: "input",
            name: "email",
            message: "Please enter the employee's email:",
            default: "No information provided"
        }, {
            type: "input",
            name: "id",
            message: "Please enter the employee's ID:",
            default: "No information provided"
        }, {
            type: "input",
            name: "github",
            message: "Please enter the engineer's gitHub username:",
            when: (answers) => answers.addRole === "Engineer"
        }, {
            type: "input",
            name: "school",
            message: "Please enter the intern's school:",
            when: (answers) => answers.addRole === "Intern"
        }, {
            type: "confirm",
            name: "addAnother",
            message: "Would you like to add another team member?"
        }

    ]).then(processAnswers());
}

