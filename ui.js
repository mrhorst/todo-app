import { buildLayout } from './DOMhelpers.js'
import {
  createDefaultProject,
  createProject,
  deleteProject,
  getStoredProjectsArray,
  renderProjects,
} from './projectsController.js'

import { createTodo } from './todosController.js'
import { getActiveProjectId, setActiveProject } from './state.js'

export const innitUI = () => {
  const projectsArray = getStoredProjectsArray()
  const { projectSection, todoSection } = buildLayout()
  if (projectsArray == null || projectsArray.length == 0) {
    createDefaultProject()
  }
  projectsInputListener(projectSection)
  projectsListener(projectSection)
  todosInputListener(todoSection)
  todosListener(todoSection)
  renderProjects(getStoredProjectsArray(), projectSection)
}

const projectsInputListener = (projectSection) => {
  projectSection.projectInput.addEventListener('keydown', (e) => {
    if (e.code == 'Enter') {
      createProject(e.target.value)
    }
    renderProjects(getStoredProjectsArray(), projectSection)
  })
}

const projectsListener = (projectSection) => {
  projectSection.listedProjectsContainer.addEventListener('click', (e) => {
    const projects = getStoredProjectsArray()
    const listOfIDs = projects.map((project) => project.id)

    if (e.target.className.includes('project-delete-button')) {
      if (
        getStoredProjectsArray().length == 1 &&
        confirm(
          'If you delete this project, all to-dos will be lost and a new default project will be created. Continue?'
        )
      ) {
        deleteProject(e.target.id)
        const defaultProj = createDefaultProject()
        setActiveProject(defaultProj.id)
        renderProjects(getStoredProjectsArray(), projectSection)
      } else {
        deleteProject(e.target.id)
        renderProjects(getStoredProjectsArray(), projectSection)
      }
    }
    if (listOfIDs.includes(e.target.id)) {
      setActiveProject(e.target.id)
    }
  })
}

const todosInputListener = (todoSection) => {
  todoSection.todoInput.addEventListener('keypress', (e) => {
    if (e.code == 'Enter') {
      createTodo(e.target.value)
    }
  })
}

const todosListener = () => {}
