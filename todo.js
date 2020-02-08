const toDoForm = document.querySelector(".js-toDoForm"),
toDoInput = toDoForm.querySelector("input"),
toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";


let toDos = [];

function deleteToDo(event) {
    // console.log(event.target.parentNode); // 어떤 버튼이 눌렸는지 알기 위함.
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id != parseInt(li.id);
    }); // filter는 안의 함수값이 true인 것만을 추출하는 함수 like R
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos() {
    localStorage.setItem(TODOS_LS,JSON.stringify(toDos)); // localStorage에는 string만 저장가능하기에 
}

function paintToDo(text) {
    const li = document.createElement("li"); // 역으로 html에 생성
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length+1;

    delBtn.innerText = "❌";
    delBtn.addEventListener("click",deleteToDo);
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;

    toDoList.appendChild(li);

    const toDoObj = {
        text: text,
        id: toDos.length + 1,
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = ""; // 입력 후 삭제 
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos!=null){
        const parsedToDos = JSON.parse(loadedToDos); // Javascript object notation. object->string or string->object
        parsedToDos.forEach(function(toDo){ // forEach는 array의 각 성분들에 대해 함수 적용.
            paintToDo(toDo.text);
        });
    }
}

function todoInit() {
    loadToDos();
    toDoForm.addEventListener("submit",handleSubmit);
}

todoInit();