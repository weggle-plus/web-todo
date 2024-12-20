import { fetchData, HttpStatus, errorData } from "./api";

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

    const editButton = createEditButton(todo);
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
    });

    return checkBox;
}

function createInputField(value?: string): HTMLInputElement {
    const inputField = document.createElement('input');
    inputField.type = 'text';
    if (value) {
        inputField.value = value;
    }

    return inputField;
}

function createButton(className: string, id: string, text: string): HTMLButtonElement {
    const button = document.createElement('button');
    button.className = className;
    button.id = id;
    button.innerText = text;

    return button;
}

// 기본적으로는 수정버튼이지만 수정중일 때는 완료버튼이 된다.
function createEditButton(todo: Todo): HTMLElement {
    const editButton = createButton('gray-outline-button', 'edit-button', '수정');

    if (todo.status === 'done') {
        editButton.style.display = 'none';
    }

    editButton.addEventListener('click', () => {
        // 수정버튼인 상태에서 클릭 => isEditing: true
        const isEditing = editButton.innerText === '수정';

        updateTodoItemStates(todo, editButton, isEditing);
    });

    return editButton;
}

// 기본적으로는 삭제버튼이지만 수정중일 때는 취소버튼이 된다.
function createDeleteButton(id: number): HTMLElement {
    const deleteButton = createButton('red-outline-button', 'delete-button', '삭제');

    deleteButton.addEventListener("click", () => {
        if (deleteButton.innerText === '취소') {
            setTodoItemDefault(deleteButton)
        } else {
            openDeleteModal(id);
        }
    })

    return deleteButton;
}

function updateTodoItemStates(todo: Todo, editButton: HTMLButtonElement, isEditing: boolean) {

    const li = editButton.closest('li') as HTMLLIElement;
    const itemTitleGroup = li.querySelector('.item-title-group') as HTMLDivElement;
    const deleteButton = li.querySelector('#delete-button') as HTMLButtonElement;

    updateTodoItemButtonStates(editButton, deleteButton, isEditing);

    if (isEditing) {
        itemTitleGroup.style.display = 'none';
        li.insertBefore(createInputField(todo.title), itemTitleGroup);
    } else {
        const inputField = li.querySelector('input[type="text"]') as HTMLInputElement;

        if (inputField && inputField.value && inputField.value !== todo.title) {
            updateTodoTitle(todo.id, inputField.value);
        }

        li.querySelector('input[type="text"]')?.remove();
        itemTitleGroup.style.display = 'flex';
    }
}

// 투두 아이템 버튼 상태 변경
function updateTodoItemButtonStates(editButton: HTMLButtonElement, deleteButton: HTMLButtonElement, isEditing: boolean) {
    editButton.innerText = isEditing ? '완료' : '수정';
    editButton.className = isEditing ? 'gray-filled-button' : 'gray-outline-button';

    deleteButton.innerText = isEditing ? '취소' : '삭제';
    deleteButton.className = isEditing ? 'gray-outline-button' : 'red-outline-button';
}

function setTodoItemDefault(deleteButton: HTMLButtonElement) {
    const li = deleteButton.closest('li') as HTMLLIElement;

    const editButton = li.querySelector('#edit-button') as HTMLButtonElement;
    const itemTitleGroup = li.querySelector('.item-title-group') as HTMLDivElement;

    // 상태 복구
    updateTodoItemButtonStates(editButton, deleteButton, false);

    li.querySelector('input[type="text"]')?.remove();
    itemTitleGroup.style.display = 'flex';
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
        const response = await fetchData<Todo[]>('todos', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (response) {
            todos = response;
            renderTodos();
        }
    } catch (error) {
        if (error === HttpStatus.UNAUTHORIZED) {
            window.location.href = './login.html';
        } else {
            alert(error);
        }
        // if (error instanceof errorData){
        //     if(error.status === HttpStatus.UNAUTHORIZED){
        //         window.location.href = './login.html';
        //     }
        // }
        //  else{
        //     alert(error);
        // }
    }
}

// 할 일 추가
async function addUserTodo(title: string) {
    let request: requestBody;
    request = { title: title };

    try {
        const response = await fetchData<Todo>('todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
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
        let response = await fetchData<Todo>(`todos/${id}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
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
        let response = await fetchData<Todo>(`todos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
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
        await fetchData(`todos/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
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
