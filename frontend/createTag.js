function createTodoTag(id, content) {
  const todoUl = document.getElementById("getTodoData");

  return todoUl.insertAdjacentHTML(
    "beforeend",
    `
                    <li data-id=${id} class="contents_list" >
                        <div>
                        <input type="checkbox" class="checkBox"  />
                        <input for="" value="${content}"  readonly  class="readonly">
                        </div>
                        <span class="input_btn_wrap">
                        <span class="edit_btn_wrap">
                            <button class="btn_gray_line update">수정</button>
                            <button class="btn_red_line delete">삭제</button>
                        </span>
    
                        <span class="confirm_btn_wrap">
                            <button class="btn_0f confirm">완료</button>
                            <button class="btn_gray_line cancel">취소</button>
                        </span>
                        </span>
                    </li>
                `
  );
}

function createDoneTag(id, content) {
  const doneUl = document.getElementById("getDoneData");

  return doneUl.insertAdjacentHTML(
    "beforeend",
    `
                  <li data-id=${id} class="contents_list" >
                      <div>
                      <input type="checkbox" class="checkBox" checked/>
                      <input for="" value="${content}"  readonly  class="readonly">
                      </div>
                      <span class="input_btn_wrap">
                      <span class="edit_btn_wrap">
                          <button class="btn_red_line delete">삭제</button>
                      </span>
                      </span>
                  </li>
              `
  );
}

export { createTodoTag, createDoneTag };
