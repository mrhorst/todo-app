import { buildLayout } from './DOMhelpers.js'
import {
  createDefaultProject,
  createProject,
  deleteProject,
  getStoredProjectsArray,
  renderProjects,
} from './projectsController.js'

import {
  createTodo,
  deleteTodo,
  getActiveProject,
  renderTodos,
  updateTodo,
} from './todosController.js'
import { setActiveProject } from './state.js'

export const innitUI = () => {
  const projectsArray = getStoredProjectsArray()
  const { projectSection, todoSection } = buildLayout()
  if (projectsArray == null || projectsArray.length == 0) {
    createDefaultProject()
  }

  setFirstProjectAsActive()

  projectsInputListener(projectSection)
  projectsListener(projectSection, todoSection)
  todosInputListener(todoSection)
  todosListener(todoSection)
  renderProjects(getStoredProjectsArray(), projectSection)
  renderTodos(getActiveProject(), todoSection)
}

const projectsInputListener = (projectSection) => {
  projectSection.projectInput.addEventListener('keydown', (e) => {
    if (e.code == 'Enter') {
      createProject(e.target.value)
      projectSection.projectInput.value = ''
    }
    renderProjects(getStoredProjectsArray(), projectSection)
  })
}

const projectsListener = (projectSection, todoSection) => {
  projectSection.listedProjectsContainer.addEventListener('click', (e) => {
    const projects = getStoredProjectsArray()
    const listOfIDs = projects.map((project) => project.id)

    if (e.target.className.includes('project-delete-button')) {
      // if clicked on delete button...
      if (getStoredProjectsArray().length == 1) {
        if (
          confirm(
            'If you delete this project, all to-dos will be lost and a new default project will be created. Continue?'
          )
        ) {
          deleteProject(e.target.id)
          createDefaultProject()
          setFirstProjectAsActive()
          renderProjects(getStoredProjectsArray(), projectSection)
          renderTodos(getActiveProject(), todoSection)
          return
        } else return
      } else {
        deleteProject(e.target.id)
        setFirstProjectAsActive()
        renderProjects(getStoredProjectsArray(), projectSection)
        renderTodos(getActiveProject(), todoSection)
        return
      }
    }
    if (listOfIDs.includes(e.target.id)) {
      // if clicked on a project's card, set it as the active project..
      setActiveProject(e.target.id)
      renderProjects(projects, projectSection)
      renderTodos(getActiveProject(), todoSection)
    }
  })
}

const todosInputListener = (todoSection) => {
  todoSection.todoInput.addEventListener('keypress', (e) => {
    if (e.code == 'Enter') {
      createTodo(e.target.value)
      todoSection.todoInput.value = ''
      renderTodos(getActiveProject(), todoSection)
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
    }
  })
}

const getAllTodos = () => {
  const allTodos = []
  JSON.parse(localStorage.getItem('projects')).forEach((project) => {
    project.todos.forEach((todo) => allTodos.push(todo))
  })
  return allTodos
}

// Set the first project on the array as "active"
const setFirstProjectAsActive = () => {
  setActiveProject(JSON.parse(localStorage.getItem('projects'))[0].id)
}

const openEditModal = (todo, todoSection) => {
  const modal = document.getElementById('todo-edit-modal')
  modal.classList.remove('hidden')
  populateModal(todo, modal, todoSection)
}

const populateModal = (todo, modal, todoSection) => {
  const modalTitle = document.getElementById('edit-todo-title')
  const modalDesc = document.getElementById('edit-todo-description')
  const modalDueDate = document.getElementById('edit-todo-due-date')
  const modalCancelBtn = document.getElementById('cancel-todo-button')
  const modalSaveBtn = document.getElementById('save-todo-button')

  modalDesc.value = todo.description ? todo.description : ''
  modalDueDate.value = todo.dueDate ? todo.dueDate : ''
  modalTitle.value = todo.title

  modalCancelBtn.addEventListener('click', () => {
    modal.classList.add('hidden')
  })
  modalSaveBtn.onclick = () => {
    const newData = {
      title: modalTitle.value,
      description: modalDesc.value,
      dueDate: modalDueDate.value,
    }
    updateTodo(todo, newData)
    modal.classList.add('hidden')

    renderTodos(getActiveProject(), todoSection)
  }
}
