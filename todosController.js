import { createTodoCard } from './DOMhelpers.js'
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

const renderTodos = (activeProject, todoSection) => {
  todoSection.activeProjectTodosContainer.innerHTML = ''
  const listOfTodos = activeProject.todos

  if (listOfTodos) {
    listOfTodos.forEach((todo) => {
      createTodoCard(todo, todoSection)
    })
  }
}

const deleteTodo = (todoId) => {
  const project = getActiveProject()
  const projects = getStoredProjectsArray()

  const updatedProjects = projects.map((p) => {
    if (p.id === project.id) {
      p.todos = p.todos.filter((todo) => todo.id !== todoId)
    }
    return p
  })

  localStorage.setItem('projects', JSON.stringify(updatedProjects))
}

const updateTodo = (todo, newData) => {
  const projects = getStoredProjectsArray()
  const activeProject = getActiveProject()

  const updatedProjects = projects.map((p) => {
    if (p.id == activeProject.id) {
      const updatedTodo = p.todos.find((t) => t.id == todo.id)
      updatedTodo.title = newData.title
      updatedTodo.description = newData.description
      updatedTodo.dueDate = newData.dueDate
    }
    return p
  })
  localStorage.setItem('projects', JSON.stringify(updatedProjects))
}
export { createTodo, renderTodos, deleteTodo, updateTodo }
