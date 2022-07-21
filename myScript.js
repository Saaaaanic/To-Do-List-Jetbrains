let inputLine = document.getElementById("input-task");
let buttonAddClick = document.getElementById("add-task-button");
let listOfTasks = document.getElementById("task-list");
let startIndex = 0;
buttonAddClick.addEventListener("click", function ()
{
    NewTask(inputLine.value, true)
});

let checkboxClick = document.querySelectorAll(".check");
checkboxClick.forEach(btn =>{
    btn.addEventListener("click", function ()
    {
        LineTrough(btn);
    })
});

let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
for(i = 0; i < taskList.length; i++)
{
    NewTask(taskList[i].taskText, false);
}

function LineTrough(btn)
{
    let arr = [];
    let items = document.querySelectorAll("#task-list li");
    for(i = 0; i < items.length; i++)
    {
        arr.push(items[i].innerHTML);
    }
    let index = arr.indexOf(btn.parentNode.innerHTML);
    taskList[index].marked = !taskList[index].marked;
    localStorage.setItem("tasks", JSON.stringify(taskList));
    btn.nextElementSibling.classList.toggle("decoration");
}

function DeleteTask(sender)
{
    let arr = [];
    let items = document.querySelectorAll("#task-list li");
    for(i = 0; i < items.length; i++)
    {
        arr.push(items[i].innerHTML);
    }
    let index = arr.indexOf(sender.parentNode.innerHTML);
    taskList.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(taskList));
    sender.parentNode.remove();
}

function NewTask(text, isNew)
{
    let task = document.createElement("li");
    if(inputLine.value.length === 0)
    {
        let input = CreateInput();
        let string = CreateSpan(text);
        if(taskList[startIndex++].marked)
        {
            input.checked = true;
            string.classList.add("decoration");
        }
        task.appendChild(input);
        task.appendChild(string);
    }
    else
    {
        task.appendChild(CreateInput());
        task.appendChild(CreateSpan(inputLine.value));
    }
    task.appendChild(CreateBtn());
    listOfTasks.appendChild(task);
    if(isNew)
    {
        taskList.push({"taskText": inputLine.value, "marked": false});
        localStorage.setItem("tasks", JSON.stringify(taskList));
        inputLine.value = null;
    }
}

function CreateSpan(task)
{
    let spanEl = document.createElement("span");
    spanEl.innerText = task;
    spanEl.className = "task";
    return spanEl;
}
function CreateInput()
{
    let inputEl = document.createElement("input");
    inputEl.type = "checkbox";
    inputEl.addEventListener('click', function ()
    {
        LineTrough(this);
    })
    return inputEl;
}
function CreateBtn()
{
    let btnEl = document.createElement("button");
    btnEl.innerText = "X";
    btnEl.className = "delete-btn";
    btnEl.addEventListener("click", function ()
    {
        DeleteTask(this);
    })
    return btnEl;
}