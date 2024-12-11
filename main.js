let todolist = [];

function renderToDo() {
    let todoHtml = '';

    if (todolist.length === 0) {
        todoHtml = '<p class="no-task">No tasks added yet!</p>';
    } else {
        for (let i = 0; i < todolist.length; i++) {
            const todo = todolist[i];
            const checked = todo.completed ? 'checked' : '';
            const textClass = todo.completed ? 'completed-task' : '';

            const html = `<p>
                            <input type="checkbox" ${checked} onchange="toggleComplete(${i})">
                            <span class="${textClass}">${todo.text}</span>
                            <button id="delete-button" onclick="deleteTask(${i})">Delete</button>
                         </p>`;
            todoHtml += html;
        }
    }

    document.querySelector('.js-addedElement').innerHTML = todoHtml;
}

function addFun(event) {
    // Prevent form submission if this is inside a form
    if (event) event.preventDefault();

    const inputElement = document.querySelector('.js-task');
    const taskText = inputElement.value.trim();

    // Remove any existing error messages
    inputElement.classList.remove('input-error');
    inputElement.placeholder = 'Add a task...';

    // Check if input is empty
    if (taskText === '') {
        // Add error styling to input field
        inputElement.classList.add('input-error');
        inputElement.placeholder = 'Task cannot be empty!';
        return;
    }

    const task = { text: taskText, completed: false };
    todolist.push(task);
    inputElement.value = ''; // Clear input field
    renderToDo();
}

function toggleComplete(index) {
    todolist[index].completed = !todolist[index].completed;
    renderToDo();
}

function deleteTask(index) {
    todolist.splice(index, 1);
    renderToDo();
}

function clearAll() {
    todolist = [];
    renderToDo();
}

document.addEventListener('DOMContentLoaded', renderToDo);

function refresh(event) {
    const inputElement = document.querySelector('.js-task');

    // Reset input field when hovered over after an error
    if (inputElement.classList.contains('input-error')) {
        inputElement.classList.remove('input-error');
        inputElement.placeholder = 'Add a task...';
    }
}