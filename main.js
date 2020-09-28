//create the UI variables
const form = document.querySelector('#task-form'); 
const taskInput = document.querySelector('#task'); 
const filter = document.querySelector('#filter'); 
const ulList = document.querySelector('.collection'); 
const clearBtn = document.querySelector('.clear-task'); 

//create a load event listener
loadEventListeners();

//create the load event listener function
function loadEventListeners() {
  //DOM load event
  document.addEventListener('DOMContentLoaded', getTasks);

  //set the from to an addEL and creat an addTask function
  form.addEventListener('submit', addTask);

  //creat a remove task list
  ulList.addEventListener('click', removeTask);

  //clear taks event
  clearBtn.addEventListener('click', clearTask);

  //filter task event
  filter.addEventListener('keyup', filterTask);
}

//get task frm LS
function getTasks() {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage('tasks'));
  }

  tasks.forEach(function(task){
    //creat the li
    const li = document.createElement('li');
    //creat li class name
    li.className = 'collection-item';
    //creat a li text node
    li.appendChild(document.createTextNode(task));
  
    //creat link
    const link = document.createElement('a');
    //creat link class name
    link.className = 'delete-item secondary-content';
    //link innerHTML
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //append the link to li
    li.appendChild(link);
  
    //append the li to ul
    ulList.appendChild(li);
  });
}


//creat the addTask function is makes all work
function addTask(e) {
  // set the taskInput value to an ''
  if(taskInput.value === '') {
    alert('Add a task');
  }

  //creat the li
  const li = document.createElement('li');
  //creat li class name
  li.className = 'collection-item';
  //creat a li text node
  li.appendChild(document.createTextNode(taskInput.value));

  //creat link
  const link = document.createElement('a');
  //creat link class name
  link.className = 'delete-item secondary-content';
  //link innerHTML
  link.innerHTML = '<i class="fa fa-remove"></i>';
  //append the link to li
  li.appendChild(link);

  //append the li to ul
  ulList.appendChild(li);

  //set up add and store in LS
  storeTaskInLocalStorage(taskInput.value);

  //clear input filed
  taskInput.value = '';

  e.preventDefault();
}

//Add and store task in LS
function storeTaskInLocalStorage(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage('tasks'));
  }
  //push the tasks
  tasks.push(task);
  //set LS to json stringafiy
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

//bulid remove task function
function removeTask(e){
  //to remove the task you need to target the links by ===
  if(e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Are You Sure?')) {
      e.target.parentElement.parentElement.remove();
      
      //remove for localS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

//remove from LS
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage('tasks'));
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//create the clear task function
function clearTask() {
  //using while loop to cleatTask
  while(ulList.firstChild) {
    ulList.removeChild(ulList.firstChild);
  }

  //clear from LS
  clearTaskFromLocalStorage();

}

//clear task from LS
function clearTaskFromLocalStorage() {
  localStorage.clear();
}

//creating the filter task function
function filterTask(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}