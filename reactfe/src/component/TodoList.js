function TodoList({ todoList }) {
  return (
    <>
      <div className="todo_wrap">
        <div>TO DO</div>
        <div id="todo_list">
          {todoList.length === 0 ? (
            <span id="todo_none">할 일 항목이 없습니다.</span>
          ) : (
            todoList.map((item) => {
              return (
                <div key={item.id} className="todo_item">
                  <input type="checkbox"></input>
                  <label className="todo_item_title">{item.title}</label>
                  <button className="btn_modify">수정</button>
                  <button className="btn_delete">삭제</button>
                </div>
              );
            })
          )}
        </div>
      </div>
      <div className="done_wrap">
        <div>DONE</div>
        <div id="done_list">
          <span id="done_none">완료 항목이 없습니다.</span>
        </div>
      </div>
    </>
  );
}

export default TodoList;
