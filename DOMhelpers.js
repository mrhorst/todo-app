const createElement = (type, options = {}) => {
  const el = document.createElement(type)
  const { id, classList, parent, textContent, placeholder, inputType } = options
  if (id) el.id = id
  if (classList) el.className = classList
  if (parent) parent.appendChild(el)
  if (textContent) el.textContent = textContent
  if (placeholder) el.placeholder = placeholder
  if (inputType) el.type = inputType
  return el
}

document.body.classList.add(
  'grid',
  '[grid-template-rows:1fr_7fr]',
  'grid-cols-1',
  'h-screen'
)

export const buildLayout = () => {
  const titleContainer = buildAppTitleSection(document.body)
  const appContainer = buildAppSection(document.body)
  const projectSection = buildProjectSection(appContainer)

  const todoSection = buildTodoSection(appContainer)
  return {
    todoSection,
    projectSection,
  }
}

const buildAppSection = (parent) => {
  const appContainer = createElement('div', {
    parent,
    id: 'app',
    classList: 'grid grid-cols-3 h-full border-1 ',
  })
  return appContainer
}

const buildAppTitleSection = (parent) => {
  const titleContainer = createElement('div', {
    id: 'app-title-container',
    parent: parent,
    classList: 'flex justify-center items-center border-1 h-16',
  })
  const appTitle = createElement('h2', {
    id: 'app-title',
    parent: titleContainer,
    classList: 'text-lg font-bold border-1',
    textContent: 'TODO APP',
  })

  return titleContainer
}

const buildProjectSection = (parent) => {
  const sectionContainer = createElement('div', {
    id: 'project-section',
    classList: 'flex flex-col col-span-1 border-1 h-full bg-red-100',
    parent,
  })

  const titleContainer = createElement('div', {
    id: 'project-title-container',
    classList: 'flex justify-center items-center border-1 p-2 bg-red-200',
    parent: sectionContainer,
  })

  const title = createElement('h2', {
    id: 'project-title',
    classList: 'text-md text-bold border-1 bg-red-300',
    parent: titleContainer,
    textContent: 'Projects',
  })

  const inputContainer = createElement('div', {
    id: 'project-input-container',
    classList: 'border-1 p-3',
    parent: sectionContainer,
  })

  const projectInput = buildInput(inputContainer, 'project')

  const projectsContainer = createElement('div', {
    id: 'projects-container',
    classList: 'flex flex-col p-3 border-1 bg-red-400 h-full flex-1',
    parent: sectionContainer,
  })

  const listedProjectsContainer = createElement('div', {
    id: 'listed-projects-container',
    classList: 'flex flex-col justify-start gap-3 p-3 border-1 flex-1',
    parent: projectsContainer,
  })

  return {
    sectionContainer,
    listedProjectsContainer,
    inputContainer,
    projectInput,
  }
}

const buildTodoSection = (parent) => {
  const sectionContainer = createElement('div', {
    id: 'todos-section',
    classList: 'flex flex-col col-span-1 border-1 h-full w-full bg-blue-100',
    parent,
  })

  const inputContainer = createElement('div', {
    id: 'todos-input-container',
    classList: 'border-1 p-3',
    parent: sectionContainer,
  })

  const todoInput = buildInput(inputContainer, 'todo')

  return { sectionContainer, inputContainer, todoInput }
}

const buildInput = (parent, type) => {
  const placeholder = {
    todo: 'Clean the stove...',
    project: 'Household, Work, etc...',
  }
  return createElement('input', {
    id: `${parent.id}`.slice(
      0,
      parent.id.toString().length - '-container'.length
    ),
    parent,
    placeholder: placeholder[type], //pass todo or project as argument when calling buildInput..
    classList:
      'rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
  })
}

export const createProjectCard = (project, listedProjectsContainer) => {
  const card = createElement('div', {
    id: `${project.id}`,
    parent: listedProjectsContainer,
    classList:
      'flex justify-between items-center border border-gray-300 rounded-md px-4 py-2 text-left hover:bg-gray-50 transition-shadow duration-200',
  })
  const projectTitle = createElement('p', {
    parent: card,
    classList: 'text-lg',
    textContent: project.title,
  })
  const deleteBtn = createElement('button', {
    parent: card,
    id: `${project.id}`,
    textContent: '🗑️',
    classList: 'project-delete-button',
  })
}

export const createTodoCard = (todo, todoSection) => {
  const todoInput = buildInput(todoSection)
  const card = createElement('div', {
    id: `${todo.id}`,
    parent: todoSection,
    classList:
      'flex justify-between items-center border border-gray-300 rounded-md px-4 py-2 text-left hover:bg-gray-50 transition-shadow duration-200',
  })
  const todoTitle = createElement('p', {
    parent: card,
    classList: 'text-lg',
    textContent: todo.title,
  })

  const todoDescription = createElement('p', {
    parent: card,
    classList: 'text-sm',
    textContent: todo.description,
  })

  const dueDate = createElement('p', {
    parent: card,
    classList: 'text-sm',
    textContent: todo.dueDate,
  })

  const deleteBtn = createElement('button', {
    parent: card,
    id: `${todo.id}`,
    textContent: '🗑️',
    classList: 'todo-delete-button',
  })
}
