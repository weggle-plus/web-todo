document.getElementById('addTodoButton').addEventListener('click', addTodo);

async function addTodo() {
  const todoInput = document.getElementById('todoInput');
  const todoText = todoInput.value.trim();
  const todoList = document.getElementById('todoList');

  if (todoText === '') {
    alert('할 일을 입력하세요!');
    return;
  }

  const response = await fetch('http://localhost:5555/tasks', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      subject : todoText, 
      start_date : new Date().toISOString().split('T')[0] 
    }),
  });
  if (response.ok) {
    const newTodo = await response.json();
    const li = createTodoItem(newTodo);
    todoList.appendChild(li);
    todoInput.value = '';
    updateEmptyMessage();
  }else {
    const errorMessage = await response.text(); 
    alert(`메이데이! ${errorMessage}`);
  }
}

function createTodoItem(todo) {
  const li = document.createElement('li');

  li.innerHTML = `
    <input type="checkbox">
    <input type="text" value="${todo.subject}" readonly>
    <button class="edit">수정</button>
    <button class="delete">삭제</button>
  `;

  li.dataset.id = todo.id;

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
  const todoId = li.dataset.id;
  const todoList = document.getElementById('todoList');
  const doneList = document.getElementById('doneList');
  const inputField = li.querySelector('input[type="text"]');

  if (isChecked) {
    li.querySelector('.edit').style.display = 'none';
    doneList.appendChild(li);
    li.querySelector('input[type="text"]').readOnly = true;

    fetch(`http://localhost:5555/tasks`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: todoId, subject: inputField.value, complete: true }),
    }).then(response => {
      if (!response.ok) {
        alert('메이데이! 완료 상태 업데이트 오류');
      }
    }).catch(error => {
      console.error('Error:', error);
      alert('메이데이! 완료 상태 업데이트 중 오류');
    });

  } else {
    li.querySelector('.edit').style.display = 'inline';
    todoList.appendChild(li);
    inputField.readOnly = false;

    fetch(`http://localhost:5555/tasks`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: todoId, subject: inputField.value, complete: false }),
    }).then(response => {
      if (!response.ok) {
        alert('메이데이! 완료 상태 업데이트 오류');
      }
    }).catch(error => {
      console.error('Error:', error);
      alert('메이데이! 완료 상태 업데이트 중 오류');
    });
  }
  updateEmptyMessage();
}

function toggleEdit(li, editButton) {
  const inputField = li.querySelector('input[type="text"]');
  const todoId = li.dataset.id;
  const isComplete = li.querySelector('input[type="checkbox"]').checked;

  if (inputField.readOnly) {
    inputField.readOnly = false;
    inputField.focus();
    editButton.textContent = '완료';
  } else {
    const updatedSubject = inputField.value.trim();
    if (updatedSubject === '') {
      alert('할 일을 입력하세요!');
      return;
    }

    fetch(`http://localhost:5555/tasks`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: todoId, subject: updatedSubject, complete: isComplete }),
    }).then(response => {
      if (response.ok) {
        inputField.readOnly = true;
        editButton.textContent = '수정';
      } else {
        alert('메이데이! 수정 오류');
      }
    }).catch(error => {
      console.log('Error:', error);
      alert('메이데이! 수정 중 오류');
    });
  }
}

function deleteTodoItem(li) {
  const todoId = li.dataset.id;
  console.log(`삭제ID: ${todoId}`);

  fetch(`http://localhost:5555/tasks`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: parseInt(todoId, 10) }),
  }).then(response => {
    if (response.ok) {
      const todoList = document.getElementById('todoList');
      const doneList = document.getElementById('doneList');

      if (todoList.contains(li)) {
        todoList.removeChild(li);
      } else if (doneList.contains(li)) {
        doneList.removeChild(li);
      }
      updateEmptyMessage();
    } else {
      alert('메이데이! 삭제 오류');
    }
  }).catch(error => {
    console.error('Error:', error); // 오류 로그
    alert('메이데이! 삭제 중 오류');
  });
}

function updateEmptyMessage() {
  const todoList = document.getElementById('todoList');
  const doneList = document.getElementById('doneList');
  const emptyTodoMessage = document.querySelector('.todoList .empty');
  const emptyDoneMessage = document.querySelector('.doneList .empty');

  emptyTodoMessage.style.display = todoList.children.length === 0 ? 'block' : 'none';
  emptyDoneMessage.style.display = doneList.children.length === 0 ? 'block' : 'none';
}

async function loadTodos() {
  const response = await fetch('http://localhost:5555/tasks');
  if (response.ok) {
    const { tasks } = await response.json();
    tasks.forEach(todo => {
      const li = createTodoItem(todo);
      if (todo.complete) {
        document.getElementById('doneList').appendChild(li);
        li.querySelector('input[type="checkbox"]').checked = true;
      } else {
        document.getElementById('todoList').appendChild(li);
        li.querySelector('input[type="checkbox"]').checked = false;
      }
    });
  }else {
    const errorMessage = await response.text(); 
    alert(`메이데이! ${errorMessage}`);
  }
  updateEmptyMessage();
}

loadTodos();