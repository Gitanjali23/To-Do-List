const todoForm=document.getElementById('todo-form');
const todoFormInputBox=document.getElementById('todo-form-input-box');
const taskList=document.getElementById('task-list');

todoForm.addEventListener('submit',addNewTodoTask);

let todoList = [];
todoList=JSON.parse(localStorage.getItem('TODO_LIST')) || [];
renderTaskList();


function updateLocalStorage(){
  localStorage.setItem('TODO_LIST',JSON.stringify(todoList));
}

function addNewTodoTask(e){
  e.preventDefault();
  //Return if input box is empty
  if(todoFormInputBox.value==='')return;
  todoList.push({ value: todoFormInputBox.value, id: Date.now()});
  //Clear input box empty
  todoFormInputBox.value='';
  renderTaskList();
  updateLocalStorage();
}

function renderTaskList(){
taskList.innerHTML='';
if(todoList.length===0){
  taskList.innerHTML=`<span class='empty-task'>No task available</span>`;
  return;
}
for(let task of todoList){
  const taskElement=document.createElement('div');
  taskElement.className='task-element';
  taskElement.setAttribute('id',task.id);
  
  const taskInputElement=document.createElement('div');
  taskInputElement.className='task-input';
  taskInputElement.type = 'text';
  
  taskInputElement.innerText = task.value;
  taskInputElement.setAttribute('contenteditable', "false");

  const taskActionsElement = document.createElement('div');
  taskActionsElement.className='task-actions';
  
  const todoEditAction=document.createElement('button');
  todoEditAction.className='task-edit';
  todoEditAction.innerText='Edit';
  todoEditAction.addEventListener('click',editTodoTask);

  const todoDeleteAction=document.createElement('button');
  todoDeleteAction.className='task-delete';
  todoDeleteAction.innerText='Delete';
  todoDeleteAction.addEventListener('click',deleteTodoTask);

  taskActionsElement.appendChild(todoEditAction);
  taskActionsElement.appendChild(todoDeleteAction);

  taskElement.appendChild(taskInputElement);
  taskElement.appendChild(taskActionsElement);
  taskList.appendChild(taskElement);


  function editTodoTask(e){
    if (todoEditAction.innerText.toLowerCase() == "edit") {
      taskInputElement.setAttribute('contenteditable','true');
      taskInputElement.focus();
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(taskInputElement);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
      todoEditAction.innerText='Save';
    }else{
      todoList=todoList.map((todo)=>{
        if(todo.id!==parseInt(task.id)){
          return todo;
        }else{
          return {
            ...todo,
            value:taskInputElement.innerText
          }
        }
      });
      taskInputElement.setAttribute('contenteditable','false');
      todoEditAction.innerText='Edit';
      updateLocalStorage();
    }
  }
  
  function deleteTodoTask(e){
    todoList=todoList.filter((todo)=>todo.id!==parseInt(task.id));
    taskList.removeChild(taskElement);
    updateLocalStorage();
  }
}
}

