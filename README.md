# employeeDetailsTracker
A command-line application to manage a company's employee database, using Node.js, Inquirer, and PostgreSQL.
The user will be prompted with options to view, update, delete employee information. When the user selects to view the data, the data will be fetched from the database and displayed on the screen for viewing.
 
The app will validate the data enter in the console incase it needs to be inserted or updated to a not null column.
All the error message are displayed in red color. All the data from the database and the successfull messages are displayed inthe green color. All the foreign key voilations are handled and promptes the user with the error message stating what to correct.

The starting point for the code will be the App.ts file which has the main menu.The actions file has all the code required for the primary task. All the code reuired for the bonus task is in the aggfunct.ts and the delete.ts has all the code related to delete data from the table.

Database :
Using postgress DB we have created an employee_db, which has 3 tables(department,Roles,Employee). The structure of the tables can be viewed in the schema.sql. The initial data setup was done using the seeds.sql.

## Table of Contents 
- [employeeDetailsTracker](#employeedetailstracker)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Demo](#demo)
  - [License](#license)
  - [Contributing](#contributing)
  - [Questions](#questions)

## Installation
1. Clone the repository:
    git clone git@github.com:gitkaviyarasi/employeeDetailsTracker.git
2. Navigate to the project directory and create a branch.
3. Install the required dependencies by using the below code.
   1. inquirer
   2. typescript 
   3. console-log-color
   4. postgress
   5. dotenv
    npm install
 The project relies on the inquirer package for user prompts, which will be installed as part of the dependencies.     

## Usage
To transpile the code, use
npm run build

To invoke the application by giving 
npm start

## Demo
Please click the below link for quick demo invoking the application.

https://drive.google.com/file/d/1HJgq0sIeq2gZsm90fBX8N9GUlT9VO8XB/view

## License
MIT

## Contributing
Contributions are welcome! To contribute:

Fork the repository
Create a new branch (git checkout -b feature/YourFeature)
Commit your changes (git commit -m 'Add new feature')
Push to the branch (git push origin feature/YourFeature)
Open a pull request

## Questions
If you have any questions about this project, feel free to reach out:

GitHub: gitkaviyarasi 
Email: kaviyarasikrishnannj@gmail.com
