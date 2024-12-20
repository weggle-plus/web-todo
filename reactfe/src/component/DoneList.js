function DoneList({ doneList, toggleCheckbox }) {
  return (
    <>
      <div className="done_wrap">
        <div>DONE</div>
        <div id="done_list">
          {doneList === undefined || doneList.length === 0 ? (
            <span id="todo_none">완료 항목이 없습니다.</span>
          ) : (
            doneList.map((item) => {
              return (
                <div key={item.id} className="todo_item">
                  <input
                    type="checkbox"
                    checked
                    onChange={() => toggleCheckbox(item)}
                  ></input>
                  <label className="todo_item_title">{item.title}</label>
                  <button className="btn_delete">삭제</button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}

export default DoneList;
