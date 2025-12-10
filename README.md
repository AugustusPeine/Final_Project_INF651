# Final_Project_INF651

## Interactive Calendar Due Date Tracker
This calendar is a dynamic web application desgined to help user manage their tasks and due dates effectively. It utilizes HTML, CSS, and JavaScript to ensure a fluid, smooth, and interactive experience.

### Key Features

#### Calendar Page
* This is the center of the website. It showcases a calendar in which the user can select each day to add, edit, or remove tasks.

* Task Visibility: Tasks are displayed directly on their corresponding calendar day cell.

* Color Coding: Tasks are visually organized: red for past due dates and green for coming due dates.

* Lots of Tasks: If a day has more than two tasks, a "+x" button appears. This button is clickable to reveal and manage the rest of the day's tasks.

* Dynamic Dates: The calendar updates instantly when users select a different month or year.

#### Dashboard Page
* Accessible via the navigation bar, the Dashboard provides a comprehensive list of all tasks:

* Categorization: Tasks are dynamically separated into "Past Due" and "Coming" sections based on the current day.

* Search Functionality: The entire dashboard can be searched in real-time by the task's name, description, or date.

* Empty State: A short message appears instructing users how to add tasks if the dashboard is empty.

* Editing: All tasks on the dashboard can be clicked to be edited.

#### Task Management
* Users have full control over their scheduled tasks:
*  Adding/Editing: Tasks can be added or edited by clicking on any existing task. This opens the primary task modal.
*  Mandatory Title: The primary task modal requires a title, with the description being optional.
  
* Modal Interactions: The application uses two different modals for focused user interaction: one for adding/editing tasks and another for viewing the full list of tasks for a single day (triggered by the "+x" button).

* Data Persistence: Task data is stored in the user's local browser storage, ensuring tasks are remembered even after closing the browser.

#### How to Run the Application
* This project is a standalone web application and requires no complex setup or external server.

* Prerequisites
*  A modern web browser (Chrome, Firefox, Edge, Safari, etc.).
*  The three project files: index.html, styles.css, and script.js (assuming a standard structure).

* Steps to Launch
*  Locate the Files: Ensure your index.html, styles.css, and script.js files are saved together in the same directory on your computer.
*  Open index.html: Simply double-click the index.html file.
*  The application will immediately open in your default web browser, ready to use.

#### Future Enhancements
* Several potential improvements for future versions have been outlined in the pdf such as:
*  Task Categorization: Adding categories, possibly with unique color codes, for better task tracking.
*  Recurring Tasks: Implementing an option for scheduling tasks that repeat (e.g., "clean the room every Sunday").
*  Drag-and-Drop: Adding drag-and-drop functionality to allow tasks to be moved easily between days.
*  Backend Database: Transitioning data storage from local storage to a backend database to allow access across multiple devices.
