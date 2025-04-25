import Todo from './Todo.js'

const addTodoBtn = document.querySelector('#todo-btn')

const getTodoData = () => {
  const todoTitle = document.querySelector('#todoTitle').value
  const todoDesc = document.querySelector('#todoDesc').value
  const todoDueDate = document.querySelector('#todoDueDate').value
  const todoPriority = document.querySelector('#todoDueDate').value
  const todoCompleted = document.querySelector('#todoCompleted').value
  return { todoTitle, todoDesc, todoDueDate, todoPriority, todoCompleted }
}

const clearTodoInputs = () => {
  const todoTitle = document.querySelector('#todoTitle')
  const todoDesc = document.querySelector('#todoDesc')
  const todoDueDate = document.querySelector('#todoDueDate')
  const todoPriority = document.querySelector('#todoDueDate')
  const todoCompleted = document.querySelector('#todoCompleted')
  const ar = [todoTitle, todoDesc, todoDueDate, todoPriority, todoCompleted]
  ar.forEach((input) => {
    input.value = ''
  })
}

const addList = ({ id, title, description, dueDate, priority, completed }) => {
  const li = document.createElement('li')
  li.id = id
  li.textContent = `Todo Title:${title}\nDescription: ${description}\nDue date: ${dueDate}\nPriority: ${priority}\nCompleted: ${completed}`
  return li
}

const loadTodos = (todos) => {
  const todoContainer = document.querySelector('#todos-container')
  if (todos) {
    const ul = document.createElement('ul')
    ul.id = 'todoUl'
    todos.forEach((todo) => {
      ul.appendChild(addList(todo))
    })
    todoContainer.appendChild(ul)
  } else {
    const p = document.createElement('p')
    p.textContent = 'No To-dos yet!'
    p.classList = 'text-lg font-bold m-5'
    todoContainer.appendChild(p)
  }
}

const addTodoToLocalstorage = (todo) => {
  const stored = window.localStorage.getItem('Todos')
  const listOfTodos = stored ? JSON.parse(stored) : []

  listOfTodos.push(todo)

  window.localStorage.setItem('Todos', JSON.stringify(listOfTodos))
}

const clearTodoContainer = () => {
  const allLi = document.querySelectorAll('#todoUl li')
  allLi.forEach((li) => {
    li.remove()
  })
  const emptyTodo = document.querySelector('#todos-container p')
  if (emptyTodo) {
    emptyTodo.remove()
  }
}

addTodoBtn.addEventListener('click', (e) => {
  e.preventDefault()
  const { todoTitle, todoDesc, todoDueDate, todoPriority, todoCompleted } =
    getTodoData()
  const todo = new Todo(
    todoTitle,
    todoDesc,
    todoDueDate,
    todoPriority,
    todoCompleted
  )

  addTodoToLocalstorage(todo)
  clearTodoContainer()
  loadTodos(getStoredTodosArray())
  clearTodoInputs()
})

const getStoredTodosArray = () => {
  return JSON.parse(window.localStorage.getItem('Todos'))
}

loadTodos(getStoredTodosArray())
