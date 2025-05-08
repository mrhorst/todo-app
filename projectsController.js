import { createProjectCard } from './DOMhelpers.js'
import Project from './Project.js'
import { getActiveProjectId, setActiveProject } from './state.js'

const localStorage = window.localStorage

export const createProject = (title, desc, dueDate) => {
  if (title.trim() === '') {
    console.error('project title cannot be empty')
    return
  }
  const project = new Project(title, desc, dueDate)
  saveProject(project)
  return project
}

export const getStoredProjectsArray = () => {
  if (!localStorage.getItem('projects')) {
    localStorage.setItem('projects', JSON.stringify([]))
  }
  return JSON.parse(localStorage.getItem('projects'))
}

const saveProject = (project) => {
  const projectsArray = getStoredProjectsArray()
  if (projectsArray) {
    projectsArray.push(project)
    localStorage.setItem('projects', JSON.stringify(projectsArray))
  } else {
    localStorage.setItem('projects', JSON.stringify([]))
  }
}

export const createDefaultProject = () => {
  const project = createProject('Default Project', 'First project. Yay!', '')
  return project
}

export const renderProjects = (projects, { listedProjectsContainer }) => {
  listedProjectsContainer.innerHTML = ''
  projects.forEach((project) => {
    createProjectCard(project, listedProjectsContainer)
  })
}

const updateProject = (project) => {}

export const deleteProject = (projectId) => {
  const projects = getStoredProjectsArray().filter((p) => p.id !== projectId)
  localStorage.setItem('projects', JSON.stringify(projects))
}

export const getActiveProject = () => {
  const activeProjectId = getActiveProjectId()
  const project = JSON.parse(localStorage.getItem('projects')).find(
    (project) => project.id == activeProjectId
  )

  return project
}
// Set the first project on the array as "active"
export const setFirstProjectAsActive = () => {
  setActiveProject(JSON.parse(localStorage.getItem('projects'))[0].id)
}
