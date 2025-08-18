const TodoList = [
  { name: 'Make dinner', dueDate: '2025-08-08', dueTime: '19:00' },
  { name: 'Wash dishes', dueDate: '2025-08-07', dueTime: '20:00' }
];

rendertodoList();

function toLocalDate(dueDate, dueTime) {
  const [y, m, d] = dueDate.split('-').map(Number);
  const [hh = 0, mm = 0] = (dueTime || '00:00').split(':').map(Number);
  return new Date(y, m - 1, d, hh, mm, 0, 0);
}

function formatLocalTime(dueDate, dueTime) {
  const dt = toLocalDate(dueDate, dueTime);
  return dt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function rendertodoList() {
  TodoList.sort((a, b) => toLocalDate(a.dueDate, a.dueTime) - toLocalDate(b.dueDate, b.dueTime));

  let todoListHtml = '';
  TodoList.forEach((todoObject) => {
    const { name, dueDate, dueTime } = todoObject;
    const displayTime = formatLocalTime(dueDate, dueTime);

    const html = `
      <div class="todoname">${name}</div>
      <div><b>Due Date:</b> ${dueDate}</div>
      <div><b>Due Time:</b> ${displayTime}</div>
      <button class="delete-button js-delete-button">Delete</button>
      <hr>
    `;
    todoListHtml += html;
  });

  document.querySelector('.js-todo-list').innerHTML = todoListHtml;

  document.querySelectorAll('.js-delete-button').forEach((btn, index) => {
    btn.addEventListener('click', () => {
      TodoList.splice(index, 1);
      rendertodoList();
    });
  });
}

document.querySelector('.js-add-button').addEventListener('click', () => {
  addTodo();
  rendertodoList();
});

['.js-name-input', '.js-due-date-input', '.js-due-time-input'].forEach(selector => {
  document.querySelector(selector).addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      addTodo();
      rendertodoList();
    }
  });
});

function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const dateInputElement = document.querySelector('.js-due-date-input');
  const timeInputElement = document.querySelector('.js-due-time-input');

  const name = inputElement.value.trim();
  const dueDate = dateInputElement.value;
  const dueTime = timeInputElement.value;

  if (name && dueDate && dueTime) {
    TodoList.push({ name, dueDate, dueTime });
  }

  inputElement.value = '';
  dateInputElement.value = '';
  timeInputElement.value = '';
}
