import { getStoredProjectsArray } from './projectsController.js'
import { getActiveProjectId } from './state.js'
import Todo from './Todo.js'

const localStorage = window.localStorage

const createTodo = (title) => {
  const todo = new Todo(title)
  saveTodo(todo)
  return todo
}

export const getActiveProject = () => {
  const activeProjectId = getActiveProjectId()
  const project = JSON.parse(localStorage.getItem('projects')).find(
    (project) => project.id == activeProjectId
  )

  return project
}

const saveTodo = (todo) => {
  const project = getActiveProject()

  const projects = getStoredProjectsArray()
  const updatedProjects = projects.map((p) => {
    if (p.id == project.id) {
      p.todos.push(todo)
    }
    return p
  })
  localStorage.setItem('projects', JSON.stringify(updatedProjects))
}

export { createTodo }
