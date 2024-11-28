const taskInput=document.getElementById("taskInput");
const addTaskButton=document.getElementById("addTaskButton");
const taskList=document.getElementById("taskList");
const filterButtons=document.querySelectorAll(".filter-btn");

let tasks=JSON.parse(localStorage.getItem("tasks"))||[];

function saveTasks(){
    localStorage.setItem("tasks",JSON.stringify(tasks));
}

function renderTasks(filter="all"){
    taskList.innerHTML="";

    const filteredTasks=tasks.filter(task=>{
        if(filter=="pending")return !task.completed;
        if(filter=="completed")return task.completed;
        return true;
    });

    filteredTasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = `task-item ${task.completed ? "completed" : ""}`;
        li.innerHTML = `
          <span>${task.name}</span>
          <div class="task-actions">
            <button class="complete-btn" onclick="toggleComplete(${index})">${
          task.completed ? "Undo" : "Complete"
        }</button>
            <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
          </div>
        `;
        taskList.appendChild(li);
      });
    }

    addTaskButton.addEventListener("click",()=>{
        const taskName=taskInput.value.trim();
        if(taskName){
            tasks.push({name:taskName,completed:false});
            saveTasks();
            renderTasks();
            taskInput.value="";
        }
    });

    function toggleComplete(index){
        tasks[index].completed=!tasks[index].completed;
        saveTasks();
        renderTasks();
    }

    function deleteTask(index){
        tasks.splice(index,1);
        saveTasks();
        renderTasks();
    }

    filterButtons.forEach(button =>
        button.addEventListener("click", () => {
          const filter = button.getAttribute("data-filter");
          renderTasks(filter);
        })
      );

      renderTasks();