import Project from './Project.js'

const addProjectBtn = document.querySelector('#proj-btn')

const getProjectData = () => {
  const projTitle = document.querySelector('#projTitle').value
  const projDesc = document.querySelector('#projDesc').value
  const projDueDate = document.querySelector('#projDueDate').value
  return { projTitle, projDesc, projDueDate }
}

const clearProjectInputs = () => {
  const projTitle = document.querySelector('#projTitle')
  const projDesc = document.querySelector('#projDesc')
  const projDueDate = document.querySelector('#projDueDate')
  const ar = [projTitle, projDesc, projDueDate]
  ar.forEach((input) => {
    input.value = ''
  })
}

const addList = ({ id, title, description, dueDate }) => {
  const li = document.createElement('li')
  li.id = id
  li.textContent = `${title}: ${description}. Due date: ${dueDate}`
  return li
}

const loadProjects = (projects) => {
  const projContainer = document.querySelector('#projects-container')
  if (projects) {
    const ul = document.createElement('ul')
    ul.id = 'projUl'
    projects.forEach((project) => {
      ul.appendChild(addList(project))
    })
    projContainer.appendChild(ul)
  } else {
    const p = document.createElement('p')
    p.textContent = 'No Projects yet!'
    p.classList = 'text-lg font-bold m-5'
    projContainer.appendChild(p)
  }
}

const addProjToLocalstorage = (project) => {
  const stored = window.localStorage.getItem('Projects')
  const listOfProjects = stored ? JSON.parse(stored) : []

  listOfProjects.push(project)

  window.localStorage.setItem('Projects', JSON.stringify(listOfProjects))
}

const clearProjContainer = () => {
  const allLi = document.querySelectorAll('#projUl li')
  allLi.forEach((li) => {
    li.remove()
  })
  const emptyProject = document.querySelector('#projects-container p')
  if (emptyProject) {
    emptyProject.remove()
  }
}

addProjectBtn.addEventListener('click', (e) => {
  e.preventDefault()
  const { projTitle, projDesc, projDueDate } = getProjectData()
  const project = new Project(projTitle, projDesc, projDueDate)

  addProjToLocalstorage(project)
  clearProjContainer()
  loadProjects(getStoredProjectsArray())
  clearProjectInputs()
})

const getStoredProjectsArray = () => {
  return JSON.parse(window.localStorage.getItem('Projects'))
}

loadProjects(getStoredProjectsArray())
