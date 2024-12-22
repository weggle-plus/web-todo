import { useState } from "react";

function TodoList({
  todoList,
  toggleCheckbox,
  onDeleteTodo,
  startEditing,
  cancelEditing,
  editingTodoId,
  updateEditing,
}) {
  const [titleEdited, setTitleEdited] = useState("");

  const handleUpdateEditing = (todoItem) => {
    const updatedTodoItem = {
      ...todoItem,
      title: titleEdited,
    };
    updateEditing(updatedTodoItem);
  };
  const handleInputChange = (e) => {
    setTitleEdited(e.target.value);
  };

  return (
    <>
      <div className="todo_wrap">
        <div>TO DO</div>
        <div id="todo_list">
          {todoList === undefined || todoList.length === 0 ? (
            <span id="todo_none">할 일 항목이 없습니다.</span>
          ) : (
            todoList.map((item) => {
              return (
                <div key={item.id} className="todo_item">
                  {editingTodoId === item.id ? (
                    <>
                      <input
                        type="text"
                        defaultValue={item.title}
                        onChange={handleInputChange}
                      ></input>
                      <button onClick={() => handleUpdateEditing(item)}>
                        완료
                      </button>
                      <button
                        className="btn_modify"
                        onClick={() => cancelEditing()}
                      >
                        취소
                      </button>
                    </>
                  ) : (
                    <>
                      <input
                        type="checkbox"
                        onChange={() => toggleCheckbox(item)}
                      ></input>
                      <label className="todo_item_title">{item.title}</label>
                      <button
                        className="btn_modify"
                        onClick={() => startEditing(item.id)}
                      >
                        수정
                      </button>
                      <button
                        className="btn_delete"
                        onClick={() => onDeleteTodo(item.id)}
                      >
                        삭제
                      </button>
                    </>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}

export default TodoList;
