import { getAllTodos, renderTodos, createTodo } from './todosController.js'
import { openEditModal } from './modal.js'
import {
  getStoredProjectsArray,
  getActiveProject,
} from './projectsController.js'
import { error } from './DOMhelpers.js'

let timeout = null

const todosInputListener = (todoSection) => {
  todoSection.todoInput.addEventListener('keypress', (e) => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      if (e.target.value.trim() === '') {
        error(todoSection.inputContainer, 'Todo title')
        timeout = setTimeout(() => {
          document.querySelector('.error')
            ? document.querySelector('.error').remove()
            : null
        }, 3000)
        return
      } else {
        createTodo(e.target.value)
        todoSection.todoInput.value = ''
        renderTodos(getActiveProject(), todoSection)
        document.querySelector('.error')
          ? document.querySelector('.error').remove()
          : clearTimeout(timeout)
      }
    }
  })
}

const todosListener = (todoSection) => {
  todoSection.activeProjectTodosContainer.addEventListener('click', (e) => {
    const todos = getAllTodos()
    const listOfTodosId = todos.map((todo) => todo.id)
    if (e.target.className.includes('todo-delete-button')) {
      deleteTodo(e.target.id)
      renderTodos(getActiveProject(), todoSection)
    } else if (listOfTodosId.includes(e.target.id)) {
      const todo = todos.find((todo) => todo.id === e.target.id)
      openEditModal(todo, todoSection)
    } else if (e.target.className.includes('form-checkbox')) {
      const projects = getStoredProjectsArray()
      const activeProject = getActiveProject()
      const todoId = e.target.id.slice('checkbox-'.length, e.target.id.length)

      const updatedProjects = projects.map((p) => {
        if (p.id === activeProject.id) {
          const updatedTodo = p.todos.find((t) => t.id == todoId)
          if (updatedTodo) {
            updatedTodo.completed = e.target.checked
          }
        }
        return p
      })
      localStorage.setItem('projects', JSON.stringify(updatedProjects))
      renderTodos(getActiveProject(), todoSection)
    }
  })
}

export { todosListener, todosInputListener }
