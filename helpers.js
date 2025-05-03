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
  const titleContainer = buildTitleSection(document.body)
  const appContainer = buildAppSection(document.body)
  const { sectionContainer, listedProjectsContainer, inputContainer } =
    buildProjectSection(appContainer)
  const todoSection = buildTodoSection(appContainer)
  const projectInput = buildInput(inputContainer)
  return {
    todoSection,
    projectSection: {
      sectionContainer,
      listedProjectsContainer,
      inputContainer,
      projectInput,
    },
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

const buildTitleSection = (parent) => {
  const titleContainer = createElement('div', {
    id: 'app-title-container',
    parent: parent,
    classList: 'flex justify-center border-1',
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
    id: 'input-container',
    classList: 'border-1 p-3',
    parent: sectionContainer,
  })

  const projectsContainer = createElement('div', {
    id: 'projects-container',
    classList: 'flex flex-col p-3 border-1 bg-red-400 h-full flex-1',
    parent: sectionContainer,
  })

  const listedProjectsContainer = createElement('div', {
    id: 'listed-projects-container',
    classList: 'flex flex-col justify-evenly p-3 border-1 flex-1',
    parent: projectsContainer,
  })

  return { sectionContainer, listedProjectsContainer, inputContainer }
}

const buildTodoSection = (parent) => {
  const todoSection = createElement('div', {
    id: 'todo-section',
    parent,
    classList:
      'col-span-2 justify-between items-center px-8 py-2 border-1 w-full',
  })
  return todoSection
}

const buildInput = (parent) => {
  createElement('input', {
    id: 'project-input',
    parent,
    placeholder: 'Household, Work, etc...',
    classList:
      'rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
  })
}
