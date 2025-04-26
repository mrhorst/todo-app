import Project from './Project.js'
import Todo from './Todo.js'
import createTodoCard from './todoUI.js'

const addProjectBtn = document.querySelector('#proj-btn')
const addTodoBtn = document.querySelector('#todo-btn')

const clearInputs = () => {
  const allInputs = document.querySelectorAll('input')

  allInputs.forEach((input) => {
    input.value = ''
  })
}

const getProjectFromId = (projectId) => {
  const projects = getStoredProjectsArray()
  const p = projects.find((project) => projectId == project.id)

  return new Project(p.title, p.description, p.dueDate)
}

const renderTodos = () => {
  clearLists()
  const todoContainer = document.querySelector('#todos-container')
  const todos = getStoredTodosInProjects()

  if (todos) {
    const ul = document.querySelector('#todoUl')
      ? document.querySelector('#todoUl')
      : document.createElement('ul')

    ul.id = 'todoUl'

    todos.forEach((todo) => {
      ul.appendChild(addTodoCard(todo))
    })
    todoContainer.appendChild(ul)
  } else {
    const p = document.createElement('p')
    p.textContent = 'No To-dos yet!'
    p.classList = 'text-lg font-bold m-5'
    todoContainer.appendChild(p)
  }
}

const addTodoCard = ({
  id,
  projectId,
  title,
  description,
  dueDate,
  priority,
  completed,
}) => {
  const {
    todoCard,
    projectName,
    cardTitle,
    cardDesc,
    cardDueDate,
    cardPriority,
    cardCompleted,
  } = createTodoCard()
  const li = document.createElement('li')
  li.id = id

  li.appendChild(todoCard)

  projectName.textContent = getProjectFromId(projectId).title
  cardTitle.textContent = title
  cardDesc.textContent = description
  cardDueDate.textContent = dueDate
  cardPriority.textContent = priority
  cardCompleted.textContent = completed

  return li
}

const getAllProjects = () => {
  return JSON.parse(window.localStorage.getItem('Projects')) || []
}

const clearLists = () => {
  const todoLi = document.querySelectorAll('#todoUl li')
  const projli = document.querySelectorAll('#projUl li')
  todoLi.forEach((li) => li.remove())
  projli.forEach((li) => li.remove())

  const emptyTodo = document.querySelector('#todos-container p')
  if (emptyTodo) {
    emptyTodo.remove()
  }
}

const clearOptions = () => {
  const options = document.querySelectorAll('option')
  options.forEach((option) => option.remove())
}

const addNewTodo = (projectId, todo) => {
  const projects = getStoredProjectsArray()
  const pIndex = projects.findIndex((project) => projectId == project.id)

  if (pIndex !== -1) {
    projects[pIndex].todos.push(todo) // push into existing project
    window.localStorage.setItem('Projects', JSON.stringify(projects)) // update storage
  }
}

const getTodoInputData = () => {
  const todoTitle = document.querySelector('#todoTitle').value
  if (!todoTitle.trim()) {
    alert("Title can't be empty.")
    return null
  }
  const todoDesc = document.querySelector('#todoDesc').value
  const todoDueDate = document.querySelector('#todoDueDate').value
  const todoPriority = document.querySelector('#todoPriority').value
  const todoCompleted = document.querySelector('#todoCompleted').value
  const projectId = document.querySelector('#projectSelector').value
  return {
    todoTitle,
    todoDesc,
    todoDueDate,
    todoPriority,
    todoCompleted,
    projectId,
  }
}

const getProjectInputData = () => {
  const projTitle = document.querySelector('#projTitle').value
  const projDesc = document.querySelector('#projDesc').value
  const projDueDate = document.querySelector('#projDueDate').value
  return { projTitle, projDesc, projDueDate }
}

const newTodo = () => {
  const todoData = getTodoInputData()
  if (!todoData) return
  const {
    todoTitle,
    todoDesc,
    todoDueDate,
    todoPriority,
    todoCompleted,
    projectId,
  } = todoData

  const todo = new Todo(
    todoTitle,
    false,
    todoDesc,
    todoDueDate,
    todoPriority,
    todoCompleted
  )
  return { todo, projectId }
}

addTodoBtn.addEventListener('click', (e) => {
  e.preventDefault()
  const { todo, projectId } = newTodo()

  if (!getStoredProjectsArray()) {
    const project = new Project('Default Project')
    project.addTodo(todo)

    addProjToLocalstorage(project)

    loader()
  }

  addNewTodo(projectId, todo)
  loader()
})

const loader = () => {
  clearListAndInputs()
  renderTodos()
  loadProjects(getStoredProjectsArray())
  loadProjectSelector()
}

addProjectBtn.addEventListener('click', (e) => {
  e.preventDefault()
  const { projTitle, projDesc, projDueDate } = getProjectInputData()
  const project = new Project(projTitle, projDesc, projDueDate)

  addProjToLocalstorage(project)
  loader()
})

const clearListAndInputs = () => {
  clearLists()
  clearInputs()
}

const getStoredProjectsArray = () => {
  return JSON.parse(window.localStorage.getItem('Projects')) || []
}

const getStoredTodosInProjects = () => {
  const projects = getAllProjects()
  const todos = []
  projects.forEach((project) => {
    project.todos.forEach((todo) => {
      todo.projectId = project.id
      todos.push(todo)
    })
  })

  return todos
}

const addProjToLocalstorage = (project) => {
  const stored = window.localStorage.getItem('Projects')
  const listOfProjects = stored ? JSON.parse(stored) : []

  listOfProjects.push(project)

  window.localStorage.setItem('Projects', JSON.stringify(listOfProjects))
}

const loadProjects = (projects) => {
  const projContainer = document.querySelector('#projects-container')
  projContainer.innerHTML = ''

  if (projects.length > 0) {
    const ul = document.createElement('ul')
    ul.id = 'projUl'
    projects.forEach((project) => {
      const li = document.createElement('li')
      li.textContent = project.title
      ul.appendChild(li)
    })
    projContainer.appendChild(ul)
  } else {
    const p = document.createElement('p')
    p.textContent = 'No Projects yet!'
    p.classList = 'text-lg font-bold m-5'
    projContainer.appendChild(p)
  }
}

const loadProjectSelector = () => {
  clearOptions()
  getAllProjects().forEach((project) => {
    const option = document.createElement('option')
    option.value = project.id
    option.textContent = project.title
    const selector = document.querySelector('#projectSelector')
    selector.appendChild(option)
  })
}

renderTodos()
loadProjects(getStoredProjectsArray())
