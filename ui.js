import { buildLayout } from './DOMhelpers.js'
import {
  createDefaultProject,
  getStoredProjectsArray,
  renderProjects,
  getActiveProject,
  setFirstProjectAsActive,
} from './projectsController.js'

import { todosListener, todosInputListener } from './todosListeners.js'
import { projectsInputListener, projectsListener } from './projectsListeners.js'

import { renderTodos, updateTodo } from './todosController.js'

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
