import { createElement, createTodoCard } from './DOMhelpers.js'
import {
  getStoredProjectsArray,
  getActiveProject,
} from './projectsController.js'
import Todo from './Todo.js'

const localStorage = window.localStorage

const createTodo = (title) => {
  if (title.trim() === '') {
    console.error('title cannot be empty!')
    return
  }
  const todo = new Todo(title)
  saveTodo(todo)
  return todo
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

  if (listOfTodos.length > 0) {
    listOfTodos.forEach((todo) => {
      createTodoCard(todo, todoSection)
    })
  } else {
    createElement('h1', {
      parent: todoSection.activeProjectTodosContainer,
      textContent: 'NO TODOS YET!',
      classList: 'text-lg font-bold',
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
      updatedTodo.completed = newData.completed
      updatedTodo.priority = newData.priority
    }
    return p
  })
  localStorage.setItem('projects', JSON.stringify(updatedProjects))
}

const getAllTodos = () => {
  const allTodos = []
  JSON.parse(localStorage.getItem('projects')).forEach((project) => {
    project.todos.forEach((todo) => allTodos.push(todo))
  })
  return allTodos
}

export { createTodo, renderTodos, deleteTodo, updateTodo, getAllTodos }
