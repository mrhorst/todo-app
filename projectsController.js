import { createProjectCard } from './DOMhelpers.js'
import Project from './Project.js'
import { getActiveProjectId } from './state.js'

const localStorage = window.localStorage

export const createProject = (title, desc, dueDate) => {
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
