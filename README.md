# Final_Project_INF651

## Interactive Calendar Due Date Tracker
This project is an interactive calendar designed dynamically to allow users to effectively manage their due dates. It makes use of HTML, CSS, and JavaScript to allow for a smooth and fluid experience. It is designed to refresh dynamically and include helpful features.

### Key Features

#### Calendar Page
* The Calendar Page is the main section of the website. It shows a month-by-month calendar in which the user can select any day to add, edit, or delete tasks.

* Task Visibility: Each task is displayed on top of the day it corresponds to.

* Color Coding: Each task is either red or green. Green indicates its due date has not passed yet, while red indicates the opposite.

* Lots of Tasks: When a day has more than two tasks, a +x button appears, which the user can click to see a list of the remaining tasks for that given day.

* Dynamic Dates: Every time the user changes months, years, or makes an edit to the tasks, the calendar is updated dynamically.

#### Dashboard Page
* Accessible through the use of the navigation bar, the Dashboard provides a full list of all the tasks:

* Categorization: According to the current day, tasks are separated into two sections: past due and coming due.

* Search Functionality: The entire dashboard can be searched in real-time by the task's name, description, or date.

* Empty State: A simple message will appear if the dashboard is empty, indicating that no tasks have been added yet.

* Editing: Every task on the dashboard can be clicked and edited.

#### About Page
* Accessible through the use of the navigation bar, the About page provides a brief summary describing the project and its goals.

#### Task Management
* Users have control over all of their tasks:
  * Adding/Editing: Tasks can be added or edited by clicking on any existing task. This opens the primary task modal.
  * Mandatory Title: The primary task modal requires a title, with the description being optional.
  
* Modal Interactions: The application uses two different modals for focused user interaction: one for adding/editing tasks and another for viewing the full list of tasks for a single day (triggered by the +x button).

* Data Persistence: All task data is stored in the user's local browser to ensure it remains after the website is closed.

#### How to Run the Application
* This project is a standalone web application and requires no complex setup or external server.

* Prerequisites
  * A modern web browser (Chrome, Firefox, etc.).
  * The three project files: index.html, styles.css, and script.js.

* Steps to Launch
  * Locate the Files: Ensure your index.html, styles.css, and script.js files are saved together in the same directory on your computer.
  * Open index.html: Simply double-click the index.html file.
  * The application will immediately open in your default web browser, ready to use.

#### Future Enhancements
* Several potential improvements for future versions have been outlined in the PDF, such as:
  * Task Categorization: Adding categories, possibly with unique color codes, for better task tracking.
  * Recurring Tasks: Implementing an option for scheduling tasks that repeat (e.g., "clean the room every Sunday").
  * Drag-and-Drop: Adding drag-and-drop functionality to allow tasks to be moved easily between days.
  * Backend Database: Using a backend database to store the users' tasks and data would allow for seamless transition between devices
