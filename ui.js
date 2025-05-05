import { buildLayout, projectsArray } from './DOMhelpers.js'
import {
  createDefaultProject,
  createProject,
  getStoredProjectsArray,
  renderProjects,
} from './projectsController.js'

export const innitUI = () => {
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
}
