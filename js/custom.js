let write = document.querySelector("#write");
let add = document.querySelector("#add");
let tabs = document.querySelectorAll(".tabs li");
let tdList = [];
let filterList = [];

let page = "all";

add.addEventListener("click", () => {
  let listContent = {
    id: randomId(),
    listContent: write.value,
    isComplete: false,
  };

  tdList.push(listContent);
  //   console.log(tdList);

  write.value = "";

  filter();
});

function randomId() {
  return Date.now();
}

for (let i = 0; i < tabs.length; i++) {
  tabs[i].addEventListener("click", (e) => {
    filter(e);

    for (j of tabs) {
      j.classList.remove("on");
    }

    tabs[i].classList.add("on");
  });
}

function filter(e) {
  if (e) {
    page = e.target.id;
  }

  filterList = [];

  if (page == "all") {
    render();
  } else if (page == "ing") {
    for (let i = 0; i < tdList.length; i++) {
      if (tdList[i].isComplete == false) {
        filterList.push(tdList[i]);
      }
    }
    render();
  } else if (page == "done") {
    for (let i = 0; i < tdList.length; i++) {
      if (tdList[i].isComplete == true) {
        filterList.push(tdList[i]);
      }
    }
    render();
  }
}

function render() {
  let List = [];

  if (page == "all") {
    List = tdList;
  } else if (page == "ing" || page == "done") {
    List = filterList;
  }

  show = "";

  for (let i = 0; i < List.length; i++) {
    if (List[i].isComplete == false) {
      show += `<li>
      <div>
        <button class="isCfal" onclick=complete(${List[i].id})></button>
        <p>${List[i].listContent}</p>
      </div>
      <button class="del" onclick=del(${List[i].id})>
        <i class="fa-regular fa-circle-xmark del"></i>
      </button>
    </li>`;
    } else {
      show += `<li>
    <div>
      <button class="isCtru" onclick=complete(${List[i].id})></button>
      <p class="iCt">${List[i].listContent}</p>
    </div>
    <button class="del" onclick=del(${List[i].id})>
      <i class="fa-regular fa-circle-xmark del"></i>
    </button>
  </li>`;
    }
  }

  document.querySelector("#dolist").innerHTML = show;
}

function complete(id) {
  for (let i = 0; i < tdList.length; i++) {
    if (tdList[i].id == id) {
      tdList[i].isComplete = !tdList[i].isComplete;
    }
  }

  filter();
}

function del(id) {
  for (let i = 0; i < tdList.length; i++) {
    if (tdList[i].id == id) {
      tdList.splice(i, 1);
    }
  }

  filter();
}
