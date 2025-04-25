import Todo from './Todo.js'
import Project from './Project.js'

const addProjectBtn = document.querySelector('#proj-btn')
const addTodoBtn = document.querySelector('#todo-btn')

addProjectBtn.addEventListener('click', (e) => {
  e.preventDefault()
  const { projTitle, projDesc, projDueDate } = getProjectData()
  const project = new Project(projTitle, projDesc, projDueDate)

  const ul = document.querySelector('#projUl')
  ul.appendChild(addList(project))
})

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

export { Todo, Project }
