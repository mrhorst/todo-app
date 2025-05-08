import { getActiveProjectId } from './state.js'

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
  buildModal()
  return {
    todoSection,
    projectSection,
  }
}

const buildAppSection = (parent) => {
  const appContainer = createElement('div', {
    parent,
    id: 'app',
    classList:
      'grid grid-cols-3 h-full rounded-md border border-gray-200 min-h-0',
  })
  return appContainer
}

const buildAppTitleSection = (parent) => {
  const titleContainer = createElement('div', {
    id: 'app-title-container',
    parent: parent,
    classList:
      'flex justify-center items-center rounded-md border border-gray-200 h-full',
  })
  const appTitle = createElement('h2', {
    id: 'app-title',
    parent: titleContainer,
    classList: 'text-lg font-bold ',
    textContent: 'TODO APP',
  })

  return titleContainer
}

const buildProjectSection = (parent) => {
  const sectionContainer = createElement('div', {
    id: 'project-section',
    classList:
      'flex flex-col col-span-1 rounded-md border border-rose-200 h-full bg-rose-100',
    parent,
  })

  const titleContainer = createElement('div', {
    id: 'project-title-container',
    classList:
      'flex justify-center items-center rounded-md border border-rose-200 p-2 bg-rose-100',
    parent: sectionContainer,
  })

  const title = createElement('h2', {
    id: 'project-title',
    classList: 'text-lg font-bold rounded-md',
    parent: titleContainer,
    textContent: 'Projects',
  })

  const inputContainer = createElement('div', {
    id: 'project-input-container',
    classList: 'rounded-md border border-rose-200 p-3 bg-rose-200',
    parent: sectionContainer,
  })

  const projectInput = buildInput(inputContainer, 'project')

  const projectsContainer = createElement('div', {
    id: 'projects-container',
    classList:
      'flex flex-col p-3 rounded-md border border-rose-200 bg-rose-400 h-full flex-1',
    parent: sectionContainer,
  })

  const listedProjectsContainer = createElement('div', {
    id: 'listed-projects-container',
    classList:
      'flex flex-col justify-start gap-3 p-3 rounded-md border border-rose-200 flex-1',
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
    classList:
      'flex flex-col col-span-2 rounded-md border border-sky-200 h-full w-full bg-sky-100',
    parent,
  })

  const titleContainer = createElement('div', {
    id: 'todo-title-container',
    classList:
      'flex justify-center items-center rounded-md border border-sky-200 p-2 bg-sky-200',
    parent: sectionContainer,
  })

  const title = createElement('h2', {
    id: 'todo-title',
    classList: 'text-lg font-bold rounded-md ',
    parent: titleContainer,
    textContent: 'To-dos',
  })

  const inputContainer = createElement('div', {
    id: 'todos-input-container',
    classList: 'rounded-md border border-sky-200 p-3 bg-sky-300',
    parent: sectionContainer,
  })

  const todoInput = buildInput(inputContainer, 'todo')

  const activeProjectTodosContainer = createElement('div', {
    id: 'active-project-todos-container',
    parent: sectionContainer,
    classList: 'grid grid-cols-3 grid-rows-4 gap-3 p-3 bg-sky-500 h-full',
  })

  return {
    sectionContainer,
    inputContainer,
    todoInput,
    activeProjectTodosContainer,
  }
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
      'rounded-md border border-sky-200 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
  })
}

export const createProjectCard = (project, listedProjectsContainer) => {
  const activeClassList = 'bg-white ring-2 ring-blue-400'
  const cardClassList =
    'flex justify-between items-center border border-sky-200 rounded-md px-4 py-2 text-left hover:bg-gray-50 transition-shadow duration-200'
  const card = createElement('div', {
    id: `${project.id}`,
    parent: listedProjectsContainer,
    classList:
      project.id == getActiveProjectId()
        ? `${cardClassList} ${activeClassList}`
        : `${cardClassList}`,
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
  const activeProjectTodosContainer = todoSection.activeProjectTodosContainer

  const card = createElement('div', {
    id: `${todo.id}`,
    parent: activeProjectTodosContainer,
    classList: `
  flex justify-between items-start 
  w-full border border-sky-200 
  rounded-md p-4 
  bg-white shadow-sm hover:shadow-md transition 
  text-left gap-4 h-40
`,
  })

  const todoContainer = createElement('div', {
    parent: card,
    classList: 'flex flex-col gap-1',
  })

  const completeTodo = createElement('input', {
    parent: todoContainer,
    inputType: 'checkbox',
    classList:
      'form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500',
    id: `checkbox-${todo.id}`,
  })

  completeTodo.checked = todo.completed ? true : false
  const completeTodoStyle = ' line-through text-gray-400'

  const todoTitle = createElement('p', {
    parent: todoContainer,
    classList: completeTodo.checked
      ? `text-lg font-bold ${completeTodoStyle}`
      : 'text-lg font-bold',
    textContent: todo.title,
  })

  const todoDescription = createElement('p', {
    parent: todoContainer,
    classList: completeTodo.checked
      ? completeTodoStyle + ' text-sm'
      : 'text-sm',
    textContent: todo.description,
  })

  const dueDate = createElement('p', {
    parent: todoContainer,
    classList: completeTodo.checked
      ? completeTodoStyle + ' text-sm'
      : 'text-sm',
    textContent: todo.dueDate,
  })

  const deleteBtnContainer = createElement('div', {
    parent: card,
    classList: 'text-right',
  })
  const deleteBtn = createElement('button', {
    parent: deleteBtnContainer,
    id: `${todo.id}`,
    textContent: '🗑️',
    classList: 'todo-delete-button',
  })
}

export const buildModal = () => {
  const modalOverlay = createElement('div', {
    id: 'todo-edit-modal',
    classList:
      'inset-0 fixed overlay bg-black/50 flex justify-center items-center z-50 hidden',
    parent: document.body,
  })

  const modalContainer = createElement('div', {
    classList: 'grid gap-2 bg-white p-6 rounded-lg shadow-md w-full max-w-md',
    parent: modalOverlay,
  })

  const modalTitle = createElement('h2', {
    classList: 'text-lg font-bold mb-4',
    parent: modalContainer,
    textContent: 'Edit Todo',
  })
  const titleDiv = createElement('div', {
    parent: modalContainer,
    classList: 'grid grid-cols-3',
  })
  const titleLabel = createElement('label', {
    parent: titleDiv,
    textContent: 'Title',
  })
  const titleInput = createElement('input', {
    parent: titleDiv,
    id: 'edit-todo-title',
    classList:
      'rounded-md border border-sky-200 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 col-span-2',
  })
  const descriptionDiv = createElement('div', {
    parent: modalContainer,
    classList: 'grid grid-cols-3',
  })
  const descLabel = createElement('label', {
    parent: descriptionDiv,
    textContent: 'Description',
  })
  const descriptionTextArea = createElement('textarea', {
    parent: descriptionDiv,
    id: 'edit-todo-description',
    classList:
      'rounded-md border border-sky-200 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 col-span-2',
  })
  const dueDateDiv = createElement('div', {
    parent: modalContainer,
    classList: 'grid grid-cols-3',
  })
  const dueDateLabel = createElement('label', {
    parent: dueDateDiv,
    textContent: 'Due Date',
  })
  const dueDateInput = createElement('input', {
    parent: dueDateDiv,
    id: 'edit-todo-due-date',
    inputType: 'date',
    classList:
      'rounded-md border border-sky-200 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 col-span-2',
  })

  const buttonsDiv = createElement('div', {
    parent: modalContainer,
    classList: 'flex justify-end gap-3',
  })
  const saveButton = createElement('button', {
    parent: buttonsDiv,
    textContent: 'Save',
    id: 'save-todo-button',
  })
  const cancelButton = createElement('button', {
    parent: buttonsDiv,
    textContent: 'Cancel',
    id: 'cancel-todo-button',
  })
}

export const error = (parent, target) => {
  const existingError = parent.querySelector('.error')
  existingError ? existingError.remove() : null
  const errorText = createElement('p', {
    classList: 'error text-red-800 transition-opacity duration-300',
    parent,
    textContent: `${target} cannot be empty.`,
  })
  return errorText
}
