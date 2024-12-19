import { fetchData } from "./api";

interface Todo {
    id: number;
    title: string;
    status: string;
}

interface requestBody {
    title: string
}

// 유저 전체 todo 리스트
let todos: Todo[] = [];

const addButton = document.getElementById("add-button") as HTMLButtonElement;
const todoInput = document.getElementById("todo-input") as HTMLInputElement;
const todoList = document.getElementById("todo-list") as HTMLUListElement;
const doneList = document.getElementById("done-list") as HTMLUListElement;
// 모달 관련 요소 가져오기
const modal = document.getElementById("modal") as HTMLElement;
const confirmDeleteButton = document.getElementById("confirm-delete") as HTMLButtonElement;

addButton.addEventListener("click", () => {
    const title = todoInput.value;
    if (!title)
        return;

    addUserTodo(title);
});

function renderTodos() {
    todoList.innerHTML = '';
    doneList.innerHTML = '';

    updateEmptyMessage('todo', todos.filter(todo => todo.status !== 'done').length);
    updateEmptyMessage('done', todos.filter(todo => todo.status == 'done').length);

    todos.forEach((todo) => {
        const li = createTodoItem(todo);
        if (todo.status === 'done') {
            doneList.appendChild(li);
        } else {
            todoList.appendChild(li);
        }
    });
}

function updateEmptyMessage(type: 'todo' | 'done', count: number) {
    const emptyMessage = document.getElementById(`empty-message-${type}`) as HTMLElement;
    emptyMessage.style.display = count ? 'none' : 'block';
}

function createTodoItem(todo: Todo) {
    const li = document.createElement('li');
    li.className = 'todo-item';

    const itemTitleGroup = document.createElement('div');
    itemTitleGroup.className = 'item-title-group';

    const checkBox = createCheckbox(todo);
    itemTitleGroup.appendChild(checkBox);

    const todoTitleSpan = document.createElement('span');
    todoTitleSpan.textContent = todo.title;
    itemTitleGroup.appendChild(todoTitleSpan);

    const buttonGroup = document.createElement('div');
    buttonGroup.className = 'item-button-group';

    const editButton = createEditButton(todo, li, todoTitleSpan);
    buttonGroup.appendChild(editButton);

    const deleteButton = createDeleteButton(todo.id);
    buttonGroup.appendChild(deleteButton);

    li.appendChild(itemTitleGroup);
    li.appendChild(buttonGroup);

    return li;
}

function createCheckbox(todo: Todo): HTMLElement {
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.checked = todo.status === 'done';

    checkBox.addEventListener('change', () => {
        updateTodoStatus(todo.id);
        renderTodos();
    });

    return checkBox;
}

function createEditButton(todo: Todo, li: HTMLElement, todoTitleSpan: HTMLElement): HTMLElement {
    const editButton = document.createElement('button');
    editButton.className = 'gray-outline-button';
    editButton.id = 'edit-button';

    editButton.innerText = '수정';

    if (todo.status === 'done') {
        editButton.style.display = 'none';
    }

    editButton.addEventListener('click', () => {
        const itemTitleGroup = li.querySelector('.item-title-group') as HTMLDivElement;

        if (editButton.innerText === '수정') {
            editButton.innerText = '완료';

            itemTitleGroup.style.display = 'none';

            const inputField = document.createElement('input') as HTMLInputElement;
            inputField.type = 'text';
            inputField.value = todo.title;

            li.insertBefore(inputField, itemTitleGroup);
        } else {
            const inputField = li.querySelector('input[type="text"]') as HTMLInputElement;
            if (inputField && inputField.value) {
                updateTodoTitle(todo.id, inputField.value);
                todoTitleSpan.textContent = inputField.value;
            }

            li.removeChild(inputField);

            editButton.innerText = '수정';
            itemTitleGroup.style.display = 'flex';
        }
    });

    return editButton;
}

function createDeleteButton(id: number): HTMLElement {
    const deleteButton = document.createElement('button');
    deleteButton.className = 'red-outline-button';
    deleteButton.id = 'delete-button';
    deleteButton.innerText = '삭제';

    deleteButton.addEventListener("click", () => {
        openDeleteModal(id);
    })

    return deleteButton;
}

modal.addEventListener("click", async (event) => {
    const target = event.target as HTMLElement;

    if (target.id === "confirm-delete") {
        const id = Number(target.dataset.id);
        await deleteTodo(id);
        closeDeleteModal();
    } else if (target.id === "cancel-delete") {
        closeDeleteModal();
    }
});

function openDeleteModal(id: number) {
    confirmDeleteButton.dataset.id = id.toString();
    modal.style.display = "flex";
}

function closeDeleteModal() {
    modal.style.display = 'none';
}

// 유저 할일목록 받기
async function getUserTodos() {
    try {
        const response = await fetchData<Todo[]>('');
        if (response) {
            todos = response;
            renderTodos();
        }
    } catch (error) {
        if (error instanceof Error) {
            alert(error.message);
        }
    }
}

// 할 일 추가
async function addUserTodo(title: string) {
    let request: requestBody;
    request = { title: title };

    try {
        const response = await fetchData<Todo>('', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        });

        if (response) {
            todoInput.value = '';
            const newTodo = { id: response.id, title: response.title, status: response.status }
            todos.push(newTodo);
            renderTodos();
        }
    } catch (error) {
        if (error instanceof Error) {
            alert(error.message);
        }
    }
}

// 할 일 상태 변경
async function updateTodoStatus(id: number) {
    try {
        let response = await fetchData<Todo>(`${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response) {
            console.log(response.status);
            const index = todos.findIndex(todo => todo.id === response.id);
            if (index !== -1) {
                todos[index] = { id: response.id, title: response.title, status: response.status };
                renderTodos();
            }
        }
    } catch (error) {
        if (error instanceof Error) {
            alert(error.message);
        }
    }
}

// 할 일 수정
async function updateTodoTitle(id: number, title: string) {
    let request: requestBody;
    request = { title: title };

    try {
        let response = await fetchData<Todo>(`${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        });

        if (response) {
            const index = todos.findIndex(todo => todo.id === response.id);
            if (index !== -1) {
                todos[index] = { id: response.id, title: response.title, status: response.status };
                renderTodos();
            }
        }

    } catch (error) {
        if (error instanceof Error) {
            alert(error.message);
        }
    }
}

// 할 일 삭제
async function deleteTodo(id: number) {
    try {
        await fetchData(`${id}`, {
            method: 'DELETE'
        });

        todos = todos.filter(todo => todo.id !== id);
        renderTodos();
    } catch (error) {
        if (error instanceof Error) {
            alert(error.message);
        }
    }
}

getUserTodos();