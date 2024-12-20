function TodoList({ todoList, toggleCheckbox, deleteTodo }) {
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
                  <input
                    type="checkbox"
                    onChange={() => toggleCheckbox(item)}
                  ></input>
                  <label className="todo_item_title">{item.title}</label>
                  <button className="btn_modify">수정</button>
                  <button
                    className="btn_delete"
                    onClick={() => deleteTodo(item.id)}
                  >
                    삭제
                  </button>
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
