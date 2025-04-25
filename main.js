import Todo from './Todo.js'
import Project from './Project.js'

const addProjectBtn = document.querySelector('#proj-btn')
const addTodoBtn = document.querySelector('#todo-btn')

const getProjectData = () => {
  const projTitle = document.querySelector('#projTitle').value
  const projDesc = document.querySelector('#projDesc').value
  const projDueDate = document.querySelector('#projDueDate').value
  return { projTitle, projDesc, projDueDate }
}

const addList = ({ id, title, description, dueDate }) => {
  const li = document.createElement('li')
  li.id = id
  li.textContent = `${title}: ${description}. Due date: ${dueDate}`
  return li
}

const loadProjects = (projects) => {
  const ul = document.querySelector('#projUl')
  projects.forEach((project) => {
    ul.appendChild(addList(project))
  })
}

const addProjToLocalstorage = (project) => {
  const stored = window.localStorage.getItem('Projects')
  const listOfProjects = stored ? JSON.parse(stored) : []

  listOfProjects.push(project)

  window.localStorage.setItem('Projects', JSON.stringify(listOfProjects))
}

const clearLi = () => {
  const allLi = document.querySelectorAll('#projUl li')
  allLi.forEach((li) => {
    li.remove()
  })
}

addProjectBtn.addEventListener('click', (e) => {
  e.preventDefault()
  const { projTitle, projDesc, projDueDate } = getProjectData()
  const project = new Project(projTitle, projDesc, projDueDate)

  addProjToLocalstorage(project)
  clearLi()
  loadProjects(getStoredProjectsArray())
})

const getStoredProjectsArray = () => {
  return JSON.parse(window.localStorage.getItem('Projects'))
}

loadProjects(getStoredProjectsArray())

export { Todo, Project }
