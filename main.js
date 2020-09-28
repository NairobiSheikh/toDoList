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
  //set the from to an addEL and creat an addTask function
  form.addEventListener('submit', addTask);

  //creat a remove task list
  ulList.addEventListener('click', removeTask);

  //clear taks event
  clearBtn.addEventListener('click', clearTask);

  //filter task event
  filter.addEventListener('keyup', filterTask);
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

  //clear input filed
  taskInput.value = '';

  e.preventDefault();
}

//bulid remove task function
function removeTask(e){
  //to remove the task you need to target the links by ===
  if(e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Are You Sure?')) {
      e.target.parentElement.parentElement.remove();
    };
  }
  e.preventDefault();
}

//create the clear task function
function clearTask() {
  while(ulList.firstChild) {
    ulList.removeChild(ulList.firstChild);
  }
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
  e.preventDefault();
}