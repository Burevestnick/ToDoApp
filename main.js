const todoControl = document.querySelector(".todo-control")
const headerInput = document.querySelector(".header-input")
let todoList = document.querySelector(".todo-list")
let todoCompleted = document.querySelector(".todo-completed")

let toDoData = []
let toDoDataFiltered = []


const render = function() {
  todoList.innerHTML = ''
  todoCompleted.innerHTML = ''

  toDoData.forEach(function(item, i) {
    const li = document.createElement('li')

    li.classList.add('todo-item')

    li.innerHTML = '<span class="text-todo">' + item.text + '</span>' + 
    '<div class="todo-buttons">' +
    '<button class="todo-remove"></button>' +
    '<button class="todo-complete"></button>' +
    '</div>'

    if (item.completed) {
      todoCompleted.append(li)
    } else {
      todoList.append(li)
    }

    li.querySelector('.todo-complete').addEventListener('click', function() {
      item.completed = !item.completed
      render()
      pushLocal()
    })

    li.querySelector('.todo-remove').addEventListener('click', function(event) {
      let index = toDoData.indexOf(item)

      if (item.completed) {
        console.log(index);
        todoCompleted.removeChild(event.target.parentNode.parentNode)
        delete toDoData[index]
        dataFilter()

        pushLocal()
  
        console.log(toDoData);
      } else {
        console.log(index);
        todoList.removeChild(event.target.parentNode.parentNode)
        delete toDoData[index]
        dataFilter()

        pushLocal()

        console.log(toDoData);
      }
    })
  })
}


let pushLocal = function() {
  localStorage.setItem("toDoData", JSON.stringify(toDoData))
  localStorage.setItem("complete", todoList)
  localStorage.setItem("in progress", todoCompleted)
  render()
}
let getLocal = function() {
  toDoData = JSON.parse(localStorage.getItem("toDoData"))
  render()
}


let dataFilter = function() {
  toDoDataFiltered = toDoData.filter(function(value) {
    return value != '';
  })
  toDoData = toDoDataFiltered
}

todoControl.addEventListener('submit', function(event) {
  event.preventDefault()

  if (headerInput.value.trim() === "") {
    alert("Введите занятие!")
  } else {
    const newToDo = {
      text: headerInput.value,
      completed: false
    }
  
    toDoData.push(newToDo)
    headerInput.value = ''
  
    render()
    pushLocal()
  }
})


if (localStorage.getItem("toDoData") === null) {
  console.log("!");
} else {
  getLocal()
}



