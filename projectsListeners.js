import { error } from './DOMhelpers.js'
import {
  getStoredProjectsArray,
  renderProjects,
  createProject,
  getActiveProject,
  deleteProject,
  setFirstProjectAsActive,
} from './projectsController.js'
import { setActiveProject } from './state.js'
import { renderTodos } from './todosController.js'

let timeout = null

const projectsInputListener = (projectSection) => {
  projectSection.projectInput.addEventListener('keydown', (e) => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      if (e.target.value.trim() === '') {
        error(projectSection.inputContainer, 'Project title')
        setTimeout(() => {
          document.querySelector('.error')
            ? document.querySelector('.error').remove()
            : null
        }, 3000)
        return
      } else {
        createProject(e.target.value)
        projectSection.projectInput.value = ''
        document.querySelector('.error')
          ? document.querySelector('.error').remove()
          : clearTimeout(timeout)
      }
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

export { projectsListener, projectsInputListener }
