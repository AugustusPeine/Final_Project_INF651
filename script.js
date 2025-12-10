//Get all elements concerning base calendar by ID and save to variables
const calendarGrid = document.getElementById("calendar-grid");
const previousButton = document.getElementById("previous-month");
const nextButton = document.getElementById("next-month");
const selectedMonth = document.getElementById("month-select");
const selectedYear = document.getElementById("year-select");
const monthYear = document.getElementById("month-year");

//Get all elements concerning tasks by ID and save to variables
const modal = document.getElementById("task-modal");
const taskForm = document.getElementById("task-form");
const taskDateInput = document.getElementById("task-date");
const taskTitleInput = document.getElementById("task-title");
const taskDescriptionInput = document.getElementById("task-description");
const taskIdInput = document.getElementById("task-id");
const deleteButton = document.getElementById("delete-task-button");
const closeModalButton = document.getElementById("close-modal-button");

//Get all elements concerning dashboard by ID and save to variables
const dashboardList = document.getElementById("dashboard-list");
const emptyDashboard = document.getElementById("empty-dashboard");
const searchInput = document.getElementById("search-tasks");

//Get all elements concerning navigation by query and save to variables
const navigationButtons = document.querySelectorAll(".navigation-button");
const pages = document.querySelectorAll(".page");

//Get all elements concerning tasks modal by ID and save to variables
const dayTasksModal = document.getElementById("day-tasks-modal");
const tasksList = document.getElementById("tasks-list");
const tasksDateLabel = document.getElementById("tasks-date-label");
const closeTasksModalButton = document.getElementById("close-tasks-modal-button");

//Make variables for the current date
let today = new Date();
let month = today.getMonth();
let year = today.getFullYear();

//Save local storage of tasks to variable and make array of months
let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

//Make navigation dynamic with highlighted tabs and rendering page
navigationButtons.forEach(button=>{
    button.addEventListener("click", ()=>{
        navigationButtons.forEach(btn=>btn.classList.remove("active"));
        button.classList.add("active");
        const page = button.dataset.page;
        pages.forEach(pg=>pg.classList.remove("active"));
        document.getElementById(page+"-page").classList.add("active");
        if (page==="dashboard"){
            renderDashboard();
        } 
    });
});

//Fill in months for option select
months.forEach((month,i)=>{ 
    const opt = document.createElement("option");
    opt.value=i;
    opt.textContent=month;
    selectedMonth.appendChild(opt);
});

//Add years to drop down selection for 10 year period
for(let y=year-5; y<=year+5; y++){ 
    const opt = document.createElement("option"); 
    opt.value=y; 
    opt.textContent=y; 
    selectedYear.appendChild(opt); 
}

//Make variables to hold selected month and year
selectedMonth.value = month;
selectedYear.value = year;

//Display selected month and year
selectedMonth.addEventListener("change", ()=>{ 
    month=parseInt(selectedMonth.value);
    renderCalendar(); 
});
selectedYear.addEventListener("change", ()=>{ 
    year=parseInt(selectedYear.value);
    renderCalendar(); 
});

//Render calendar function
function renderCalendar(){

    //Make top row of calendar with day names
    calendarGrid.innerHTML="";
    ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].forEach(day=>{
        const div=document.createElement("div");
        div.className="day-name";
        div.textContent=day;
        calendarGrid.appendChild(div);
    });

    //Calculate first day of month and total days in month
    const firstDay=new Date(year, month,1).getDay();
    const totalDays=new Date(year,month+1,0).getDate();

    //Grey out previous days from past month to fill out calendar
    const previousMonthDays = new Date(year, month, 0).getDate();
    for(let i=firstDay-1; i>=0; i--){
        const dayDiv = document.createElement("div");
        dayDiv.className = "day inactive";
        dayDiv.textContent = previousMonthDays - i;
        calendarGrid.appendChild(dayDiv);
    }

    //Format each cell for each day
    for(let day=1;day<=totalDays;day++){
        const dayDiv=document.createElement("div");
        dayDiv.className="day";
        dayDiv.textContent=day;
        const dateStr=`${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
        const dayTasks = tasks.filter(t=>t.date===dateStr);

        //Display only two tasks per cell
        dayTasks.slice(0, 2).forEach(task => {
            const span = document.createElement("span");
            span.className = "task";

            //Compare task date using original date string to avoid timezone issues
            const [y, m, d] = task.date.split("-").map(Number);
            const todayY = today.getFullYear();
            const todayM = today.getMonth() + 1;
            const todayD = today.getDate();

            if (y < todayY || (y === todayY && m < todayM) || (y === todayY && m === todayM && d < todayD)) {
                span.classList.add("past");
            } else {
                span.classList.add("future");
            }

            //Make task title
            span.textContent = task.title;

            //Opens modal when editing task
            span.addEventListener("click", (e) => {
                e.stopPropagation();
                openModal(dateStr, task);
            });

            //Display task title in cell
            dayDiv.appendChild(span);
        });

        
        //Put green border around today's cell
        if(day===today.getDate() && month===today.getMonth() && year===today.getFullYear()){
            dayDiv.style.border="2px solid #25b685ff";
        }

        //Add third tasks to show amount of remaining tasks minus the first two
        const extraCount = dayTasks.length - 2;
        if (extraCount > 0) {
            const more = document.createElement("span");
            more.className = "task";
            more.textContent = `+${extraCount} more`;

            //Open modal with all tasks
            more.addEventListener("click", (e) => {
                e.stopPropagation();
                openTasksModal(dateStr); 
            });

            //Add the extra tasks count to cell
            dayDiv.appendChild(more);
        }

        //Open modal when clicking on day cell
        dayDiv.addEventListener("click", ()=> openModal(dateStr));
        calendarGrid.appendChild(dayDiv);
    }

    //Show month and year at top of calendar
    selectedMonth.value = month;
    selectedYear.value = year;
}

//Open modal function for tasks
function openModal(dateStr, task=null){
    modal.classList.remove("hidden");
    taskDateInput.value=dateStr;

    //If editing existing task populate details
    if (task){
        taskIdInput.value=task.id;
        taskTitleInput.value=task.title;
        taskDescriptionInput.value=task.description;
        deleteButton.classList.remove("hidden");
    } 
    
    //If creating new task remove details
    else {
        taskIdInput.value="";
        taskTitleInput.value="";
        taskDescriptionInput.value="";
        deleteButton.classList.add("hidden");
    }
}

//Modal for all tasks in day
function openTasksModal(dateStr) {
    const dayTasks = tasks.filter(task => task.date === dateStr);

    // Format date as MM/DD/YYYY for the modal header
    const [y, m, d] = dateStr.split("-").map(Number);
    tasksDateLabel.textContent = `${String(m).padStart(2,'0')}/${String(d).padStart(2,'0')}/${y}`;
    tasksList.innerHTML = "";

    //Display day's task
    dayTasks.forEach(task => {
        const div = document.createElement("div");
        div.className = "dashboard-item";
        div.textContent = task.title;
        div.addEventListener("click", () => {
            openModal(dateStr, task);
            dayTasksModal.classList.add("hidden");
        });
        tasksList.appendChild(div);
    });

    //open modal for days task
    dayTasksModal.classList.remove("hidden");
}

//Close day tasks modal on click
closeTasksModalButton.addEventListener("click", () => {
    dayTasksModal.classList.add("hidden");
});

//Close task modal on click
closeModalButton.addEventListener("click", ()=>modal.classList.add("hidden"));

//On enter, save tasks to local storage and rerender calendar and dashboard
taskForm.addEventListener("submit", e=>{
    e.preventDefault();
    const id = taskIdInput.value || Date.now().toString();
    const newTask={ id, date: taskDateInput.value, title: taskTitleInput.value, description: taskDescriptionInput.value };
    const index=tasks.findIndex(task=>task.id===id);
    if(index>=0) tasks[index]=newTask;
    else tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    modal.classList.add("hidden");
    renderCalendar();
    renderDashboard();
});

//Delete task on click and rerender calendar and dashboard
deleteButton.addEventListener("click", ()=>{
    const id=taskIdInput.value;
    tasks=tasks.filter(task=>task.id!==id);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    modal.classList.add("hidden");
    renderCalendar();
    renderDashboard();
});

//Function to render dashboard with past due and upcoming tasks
function renderDashboard() {
    dashboardList.innerHTML = "";

    //If no tasks Tell user to add some from calendar
    if (tasks.length === 0) {
        emptyDashboard.style.display = "block";
        return;
    }
    emptyDashboard.style.display = "none";

    //Get todays date to compare to tasks dates
    const todayY = today.getFullYear();
    const todayM = today.getMonth() + 1;
    const todayD = today.getDate();

    // Separate tasks into past due and upcoming using string-based comparison
    const pastDue = tasks.filter(t => {
        const [y,m,d] = t.date.split("-").map(Number);
        return y < todayY || (y === todayY && m < todayM) || (y === todayY && m === todayM && d < todayD);
    }).sort((a,b)=>{
        const [y1,m1,d1] = a.date.split("-").map(Number);
        const [y2,m2,d2] = b.date.split("-").map(Number);
        return new Date(y1,m1-1,d1) - new Date(y2,m2-1,d2);
    });

    const upcoming = tasks.filter(t => {
        const [y,m,d] = t.date.split("-").map(Number);
        return y > todayY || (y === todayY && m > todayM) || (y === todayY && m === todayM && d >= todayD);
    }).sort((a,b)=>{
        const [y1,m1,d1] = a.date.split("-").map(Number);
        const [y2,m2,d2] = b.date.split("-").map(Number);
        return new Date(y1,m1-1,d1) - new Date(y2,m2-1,d2);
    });

    //Add section header
    const renderSection = (title, taskArray) => {
        if(taskArray.length === 0) return;
        const header = document.createElement("h3");
        header.textContent = title;
        header.style.marginTop = "20px";
        header.style.marginBottom = "10px";
        header.style.color = "#4f46e5";
        dashboardList.appendChild(header);

        //Loop through tasks and create dashboard tasks
        taskArray.forEach(task => {
            const div = document.createElement("div");
            div.className = "dashboard-item";

            //Add past or future class to color code tasks
            const [y,m,d] = task.date.split("-").map(Number);
            if (y < todayY || (y === todayY && m < todayM) || (y === todayY && m === todayM && d < todayD)) {
                div.classList.add("past");
            } else {
                div.classList.add("future");
            }

            //Create date element and display MM/DD/YYYY in dashboard
            const dateDiv = document.createElement("div");
            dateDiv.className = "dashboard-item-date";
            dateDiv.textContent = `${String(m).padStart(2,'0')}/${String(d).padStart(2,'0')}/${String(y)}`;

            //Create title element for task
            const titleDiv = document.createElement("div");
            titleDiv.className = "dashboard-item-title";
            titleDiv.textContent = task.title;

            //Create description element for task
            const descriptionDiv = document.createElement("div");
            descriptionDiv.className = "dashboard-item-description";
            descriptionDiv.textContent = task.description || "";

            //Append all elements to dashboard task
            div.appendChild(dateDiv);
            div.appendChild(titleDiv);
            div.appendChild(descriptionDiv);

            //Open modal on click in dashboard
            div.addEventListener("click", () => openModal(task.date, task));
            dashboardList.appendChild(div);
        });
    };

    //Render past and upcoming sections
    renderSection("Past Due", pastDue);
    renderSection("Coming", upcoming);
}

//Function to render dashboard with search filter
function renderDashboardSearch(query) {
    const lowerQuery = query.toLowerCase();

    // Filter tasks by title, description, or date
    const filteredTasks = tasks.filter(task => 
        task.title.toLowerCase().includes(lowerQuery) || 
        (task.description && task.description.toLowerCase().includes(lowerQuery)) ||
        task.date.includes(lowerQuery)
    );

    // Temporarily replace tasks for rendering
    const temp = tasks;
    tasks = filteredTasks;
    renderDashboard();
    tasks = temp;
}

//On click previous or next month buttons change month and rerender calendar
previousButton.addEventListener("click", ()=>{
    month--;
    if(month<0){ 
        month=11;
        year--; 
    } 
    renderCalendar();
});
nextButton.addEventListener("click", ()=>{
    month++; 
    if(month>11){ 
        month=0; 
        year++; 
    } 
    renderCalendar();
});

//Event listener for search input
searchInput.addEventListener("input", () => {
    renderDashboardSearch(searchInput.value);
});

//Initial render of calendar
renderCalendar();
