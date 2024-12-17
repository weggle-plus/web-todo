document.getElementById('addTodoButton').addEventListener('click', addTodo);

function addTodo() {
  const todoInput = document.getElementById('todoInput');
  const todoText = todoInput.value.trim();
  const todoList = document.getElementById('todoList');

  if (todoText === '') {
    alert('할 일을 입력하세요!');
    return;
  }

  const li = createTodoItem(todoText);
  todoList.appendChild(li);
  todoInput.value = '';
  updateEmptyMessage();
}

function createTodoItem(todoText) {
  const li = document.createElement('li');

  li.innerHTML = `
    <input type="checkbox">
    <input type="text" value="${todoText}" readonly>
    <button class="edit">수정</button>
    <button class="delete">삭제</button>
  `;

  li.querySelector('input[type="checkbox"]').addEventListener('click', function() {
    toggleTodoStatus(li, this.checked);
  });
  li.querySelector('.edit').addEventListener('click', function() {
    toggleEdit(li, this);
  });
  li.querySelector('.delete').addEventListener('click', function() {
    deleteTodoItem(li);
  });

  return li;
}

function toggleTodoStatus(li, isChecked) {
  const doneList = document.getElementById('doneList');

  if (isChecked) {
    li.querySelector('.edit').style.display = 'none';
    doneList.appendChild(li);
    li.querySelector('input[type="text"]').readOnly = true;
  } else {
    li.querySelector('.edit').style.display = 'inline';
    document.getElementById('todoList').appendChild(li);
    li.querySelector('input[type="text"]').readOnly = false;
  }
  updateEmptyMessage();
}

function toggleEdit(li, editButton) {
  const inputField = li.querySelector('input[type="text"]');
  if (inputField.readOnly) {
    inputField.readOnly = false;
    inputField.focus();
    editButton.textContent = '완료';
  } else {
    inputField.readOnly = true;
    editButton.textContent = '수정';
  }
}

function deleteTodoItem(li) {
  const todoList = document.getElementById('todoList');
  const doneList = document.getElementById('doneList');

  if (todoList.contains(li)) {
    todoList.removeChild(li);
  } else if (doneList.contains(li)) {
    doneList.removeChild(li);
  }
  updateEmptyMessage();
}

function updateEmptyMessage() {
  const todoList = document.getElementById('todoList');
  const doneList = document.getElementById('doneList');
  const emptyTodoMessage = todoList.previousElementSibling;
  const emptyDoneMessage = doneList.previousElementSibling;

  emptyTodoMessage.style.display = todoList.children.length === 0 ? 'block' : 'none';
  emptyDoneMessage.style.display = doneList.children.length === 0 ? 'block' : 'none';
}
