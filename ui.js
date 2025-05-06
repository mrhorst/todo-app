import { buildLayout } from './DOMhelpers.js'
import {
  createDefaultProject,
  createProject,
  deleteProject,
  getStoredProjectsArray,
  renderProjects,
} from './projectsController.js'

export const innitUI = () => {
  const projectsArray = getStoredProjectsArray()
  const { projectSection, todoSection } = buildLayout()
  if (projectsArray == null || projectsArray.length == 0) {
    createDefaultProject()
  }

  projectSection.projectInput.addEventListener('keydown', (e) => {
    if (e.code == 'Enter') {
      createProject(e.target.value)
    }
    renderProjects(getStoredProjectsArray(), projectSection)
  })
  renderProjects(getStoredProjectsArray(), projectSection)

  projectSection.listedProjectsContainer.addEventListener('click', (e) => {
    if (e.target.className.includes('project-delete-button')) {
      if (
        getStoredProjectsArray().length == 1 &&
        confirm(
          'If you delete this project, all to-dos will be lost and a new default project will be created. Continue?'
        )
      ) {
        deleteProject(e.target.id)
        createDefaultProject()
        renderProjects(getStoredProjectsArray(), projectSection)
      } else {
        deleteProject(e.target.id)
        renderProjects(getStoredProjectsArray(), projectSection)
      }
    }
  })
}
