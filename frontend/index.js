
var todoListArray=[];
var todoList_contents_html = "";
var doneList_contents_html = "";


const url = "http://localhost:1234/";


async function getTodoList(){
  todoListArray = [];
  const response = await fetch(url,{
    method: "GET",
    mode:"cors",
  }).then((response) => response.json())
  .then(data =>{
    data.forEach(element => {
      let todo_content={
        id : 0,
        content : "",
        isDone : false
    }
    todo_content.id=element.id;
    todo_content.content=element.contents;
    todo_content.isDone=element.isDone;
    console.log(element);
    todoListArray.push(todo_content);
  })

  


});
}


async function data_submit(){


    todo_content=document.getElementById('todo-input').value;
    document.getElementById('todo-input').value = "";
    console.log(todo_content);
  console.log(typeof(todo_content));
    await fetch(url, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        "contents" : todo_content,
      }),
    })
    .then((response) => response.json())
    .then((result) => console.log(result));

    //todoListArray.push(todo_content);
    make_list();
}


async function make_list(){
  await getTodoList();
    todoList_contents_html = "";
    doneList_contents_html = "";
    todoListArray.forEach(element => {
        makeContent(element.id,element.content,element.isDone);
    });
    document.getElementById("todo-list-contents").innerHTML = todoList_contents_html;
    document.getElementById("done-list-contents").innerHTML = doneList_contents_html;
}

function makeContent(id,content,isDone){
    if(!isDone){
        let todoList_content = `<div class="todo-content-div"><input type="checkbox" id="todo-content${id}" value=${id} onclick="check(event)"/>` 
        + `<label for="todo-content${id}">${content}</label>`
        + `<button id="${id}" class="content-modify-button" onclick="modifyContent(this.id)">수정</button>`
        + `<button id="${id}" class="content-delete-button" onclick="deleteContent(this.id)">삭제</button> </div>`;
        todoList_contents_html += todoList_content;
        
    }
    else{
        let doneList_content = `<div class="done-content-div"><input type="checkbox" id="todo-content${id}" value=${id} onclick="check(event)" checked/>` 
        + `<label for="todo-content${id}">${content}</label>`
        + `<button id="${id}" class="content-delete-button" onclick="deleteContent(this.id)">삭제</button></div>`;
        doneList_contents_html += doneList_content;
        
    }
}

function check(event){
    //console.log("check Clicked");
    let id = 0;
    let checked = true;
  if(event.target.checked)  {
    id = event.target.value;
    checked = true;
  }else {
    id = event.target.value;
    checked=false;
  }
  id=parseInt(id);
  //console.log(id+`type : ${typeof(id)}`);
  todoListArray.forEach(element=>{
    //console.log(`todoListArray.id = ${element.id}, type : ${typeof(element.id)}`);
    if(element.id === id && checked)
    {
        //console.log(`id : ${id} , true`);
        element.isDone = true;
    }
    else if(element.id === id && !checked)
    {
        //console.log(`id : ${id} , fasle`);
        element.isDone = false;
    }
  })
  
  make_list();
}

function modifyContent(clickedId){

}

async function deleteContent(clickedId){
  fetch(`${url}${clickedId}`, {
    method: 'DELETE',
  }).then(response => response.json())
    .then(data => console.log(data))
}

make_list();