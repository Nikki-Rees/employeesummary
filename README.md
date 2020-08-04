Template Engine - Employee Summary

This application is a Node CLI that takes in information about employees and generates an HTML webpage that displays summaries for each person. 

ABOUT
Software engineering team generator command line application is demostrated here: https://drive.google.com/file/d/1m_FE7TiDc7ZQz-VWIr88apqr2hAmf9WL/view

The application prompts the user for information about the team manager and then information about the team members. The user can input any number of team members, and they may be a mix of engineers and interns. T

When the user has completed building the team, the application will create an HTML file that displays a nicely formatted team roster based on the information provided by the user. 

USER STORY
```
As a manager
I want to generate a webpage that displays my team's basic info
so that I have quick access to emails and GitHub profiles
```

DEPENDENCIES
* Uses [jest](https://jestjs.io/) for running the provided tests, and [inquirer](https://www.npmjs.com/package/inquirer) for collecting input from the user.
