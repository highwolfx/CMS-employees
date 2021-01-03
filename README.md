# CMS-employees
![License Badge](https://img.shields.io/badge/License-MIT-yellow.svg)

## Description

This is a NodeJS based project that allows a user to manage an employee database that is stored on a local SQL server.


## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Credits](#credits)


## Installation

Download, clone, or fork the repo and run an `npm install` command in the folder directory. This will install the dependencies needed for NodeJS to run the application as listed in `package.json`. In addition, a local instance of a MySQL server must be set up and configured. There is a `config-example.js` file in the `config` folder that needs to be configured before the application can run properly. In addition, it needs to be renamed to `config.js` for NodeJS to recognize it.

 * [`express`](https://www.npmjs.com/package/express) allows the application to utilize express.
 * [`mysql`](https://www.npmjs.com/package/mysql) allows the application to establish connections.
 * [`console.table`](https://www.npmjs.com/package/console.table) formats the log in the console to be more of a table format and thus more legible.

To start the application, run `node index.js` on the command line.



## Usage

To start the application, run `node index.js` on the command line.

Then, use the keyboard to navigate the menus for desired actions.

Overall, the main menu layout can be broken down into Viewing and Add/Deleting for employees, roles, and departments. Update Existing is only for altering existing roles and for changing the managers of employees.

A video of its usage can be found [here](https://youtu.be/VgqRh_4ag2Q) or locally in the `assets` folder as `demo.mp4`.

<p align="center">
    <img alt="GIF of GUI" src="https://raw.githubusercontent.com/highwolfx/CMS-employees/main/assets/main.gif">
</p>

## License

Licensed under the [MIT](LICENSE.txt) license.


## Credits
Base development files were provided by the [UCSD Coding Bootcamp](https://bootcamp.extension.ucsd.edu/coding/).

The package `express` for NodeJS can be found [here](https://www.npmjs.com/package/express).

The package `mysql` for NodeJS can be found [here](https://www.npmjs.com/package/mysql).

The package `uuid` for NodeJS can be found [here](https://www.npmjs.com/package/uuid).


## Questions
GitHub: [highwolfx](https://github.com/highwolfx/)

Email: seanchangx@gmail.com