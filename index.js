let addTodoListArr = [];
function addTodo() {
  //input text에 쓴 값
  const todoValue = document.getElementById("todo");
  if (todoValue.value === "") {
  } else {
    //새로운 {}생성
    let addTodoList = {};

    //addTodoList에 key에다가 todoValue 넣기
    addTodoList["todo"] = todoValue.value;

    //작성시간 나타내기
    addTodoList["date"] = date(Date);

    // 객체를 배열에 넣기
    addTodoListArr.push(addTodoList);

    // 배열 콘솔
    console.log(addTodoListArr);

    // input 텍스트 초기화
    todoValue.value = "";

    ///////////////element 추가 부분///////////////

    //tr을 생성한다고 선언
    const objtr = document.createElement("tr");
    //tr을 생성할 곳
    const listTable = document.querySelector("#listTable");
    //tr 생성
    listTable.appendChild(objtr);
    //td 생성한다고 선언
    const objTodoTD = document.createElement("td");
    //생성할 td에 class 추가
    objTodoTD.setAttribute("class", "objTodoTD");
    //클래스가 추가된 td를 objtr의 자식으로 생성
    objtr.appendChild(objTodoTD);
    //위에서 추가한 클래스를 선언
    //========할 일==========
    const objTodoTDClass = document.querySelectorAll(".objTodoTD");
    // 객채의 키를 이용해 값을 innerText로 화면에 뿌리기
    for (let i = 0; i < objTodoTDClass.length; i++) {
      objTodoTDClass[i].innerText = addTodoListArr[i].todo;
    }
    //========날짜===========
    //td 생성한다고 선언
    const objDateTD = document.createElement("td");
    objDateTD.setAttribute("class", "objDateTD");
    objtr.appendChild(objDateTD);

    const objDateTDClass = document.querySelectorAll(".objDateTD");
    for (let i = 0; i < objDateTDClass.length; i++) {
      objDateTDClass[i].innerText = addTodoListArr[i].date;
    }
    //=========수정 삭제 버튼==========

    // td 생성
    const objBtnTD = document.createElement("td");
    objBtnTD.setAttribute("class", "objBtnTD");
    objtr.appendChild(objBtnTD);

    // 버튼 추가
    const objBtnTDClass = document.querySelectorAll(".objBtnTD");
    const objreplaceBtn = document.createElement("button");
    const objdeleteBtn = document.createElement("button");
    for (let i = 0; i < objBtnTDClass.length; i++) {
      //수정 버튼
      objreplaceBtn.setAttribute("class", "replaceBtn");
      objBtnTDClass[i].appendChild(objreplaceBtn);
      objreplaceBtn.innerText = "수정";

      //삭제 버튼
      objdeleteBtn.setAttribute("class", "deleteBtn");
      objBtnTDClass[i].appendChild(objdeleteBtn);
      objdeleteBtn.innerText = "삭제";
    }
    // delete버튼 선언
    const deleteBtn = document.querySelectorAll(".deleteBtn");

    for (let i = 0; i < deleteBtn.length; i++) {
      // 삭제 버튼을 눌렀을 때
      deleteBtn[i].addEventListener("click", () => {
        // 삭제버튼의 부모의 부모 = tr
        // objTodoTD에 써있는 텍스트를 선택하고 삭제버튼의 부모의 부모에서 할 일을 가져온다.
        const todoText =
          deleteBtn[i].parentNode.parentNode.querySelector(
            ".objTodoTD"
          ).innerText;
        // console.log(todoText)
        //addTodoListArr = item   addTodoListArr.todo와 todoText를 비교를해 같지 않은 것만 빼내 배열에 담는다.
        addTodoListArr = addTodoListArr.filter(
          (item) => item.todo !== todoText
        );
        let clickTarget = deleteBtn[i].parentNode.parentNode;
        clickTarget.remove();
      });
    }
    // replace버튼 선언
    const replaceBtn = document.querySelectorAll(".replaceBtn");
    for (let j = 0; j < replaceBtn.length; j++) {
      //수정 버튼 눌렀을 때
      replaceBtn[j].addEventListener("click", () => {
        let replaceTarget =
          replaceBtn[j].parentNode.parentNode.querySelector(".objTodoTD");
        replaceTarget.setAttribute("contenteditable", "true");
        //replaceTarget 콘솔 내용 <td class="objTodoTD" contenteditable="true">12</td>
        let replaceElement = replaceTarget.querySelector(".replaceElement");
        if (!replaceElement) {
          replaceElement = document.createElement("button");
          replaceElement.setAttribute("class", "replaceElement");
          replaceElement.innerText = "확인";
          replaceTarget.appendChild(replaceElement);
        }
        replaceElement.addEventListener("click", () => {
          replaceTarget.setAttribute("contenteditable", "false");
          replaceElement.remove();
          addTodoListArr[j].todo = replaceTarget.innerText;
          console.log(addTodoListArr);
        });
      });
    }
  }
}

function date(Date) {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const resultDate = `${year}.${month}.${day} ${hours}:${minutes}`;
  return resultDate;
}
