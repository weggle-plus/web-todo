function TodoList() {
  return (
    <>
      <div className="todo_wrap">
        <div>TO DO</div>
        <div id="todo_list">
          <span id="todo_none">할 일 항목이 없습니다.</span>
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
