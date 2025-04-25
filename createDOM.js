// first let's create the UI of the app

// we'll have a container with 2 nested containers:
// -1 for projects
// -1 for list of todos
const container = document.createElement('div')
const projContainer = document.createElement('div')
const todoContainer = document.createElement('div')
container.classList = 'grid grid-cols-2'
projContainer.classList = 'grid-span-1 blue'
todoContainer.classList = 'grid-span-1 red'
container.appendChild(projContainer)
container.appendChild(todoContainer)

// inside these containers, we'll have 2 more containers. one for title, one for the list
const projTitleContainer = document.createElement('div')
const todoTitleContainer = document.createElement('div')
const projBodyContainer = document.createElement('div')
const todoBodyContainer = document.createElement('div')

projContainer.classList =
  'flex flex-col justify-between items-center h-auto m-2 p-4'
todoContainer.classList =
  'flex flex-col justify-between items-center h-auto mr-10 p-4'

const projTitle = document.createElement('h2')
const todoTitle = document.createElement('h2')
projTitle.textContent = 'Projects'
todoTitle.textContent = 'Tasks'
projTitle.classList = 'text-lg font-bold mb-2'
todoTitle.classList = 'text-lg font-bold mb-4'
projTitleContainer.appendChild(projTitle)
todoTitleContainer.appendChild(todoTitle)

// inside the bodycontainers, we need 2 more divs:
// 1 for the input for creating the project/todo
// 1 for the list of created items.

const projInputContainer = document.createElement('div')
projInputContainer.classList = 'grid grid-cols-2 w-full gap-4'
const todoInputContainer = document.createElement('div')
todoInputContainer.classList = 'grid grid-cols-2 w-full gap-4'
const projListContainer = document.createElement('div')
const todoListContainer = document.createElement('div')

projContainer.appendChild(projTitleContainer)
projContainer.appendChild(projInputContainer)
projContainer.appendChild(projListContainer)
todoContainer.appendChild(todoTitleContainer)
todoContainer.appendChild(todoInputContainer)
todoContainer.appendChild(todoListContainer)

const projTitleInputLabel = document.createElement('label')
const projDescInputLabel = document.createElement('label')
const projDueDateInputLabel = document.createElement('label')
const projTitleInput = document.createElement('input')
const projDescInput = document.createElement('input')
const projDueDateInput = document.createElement('input')
const projAddButton = document.createElement('button')
projInputContainer.appendChild(projTitleInputLabel)
projInputContainer.appendChild(projTitleInput)
projInputContainer.appendChild(projDescInputLabel)
projInputContainer.appendChild(projDescInput)
projInputContainer.appendChild(projDueDateInputLabel)
projInputContainer.appendChild(projDueDateInput)
projInputContainer.appendChild(projAddButton)
projTitleInputLabel.textContent = 'Title'
projDescInputLabel.textContent = 'Description'
projDueDateInputLabel.textContent = 'Due Date'
projAddButton.textContent = 'Add Project'

projTitleInputLabel.classList = 'justify-self-center'
projDescInputLabel.classList = 'justify-self-center'
projDueDateInputLabel.classList = 'justify-self-center'
projAddButton.classList =
  'border-gray-300 rounded-md bg-blue-500 text-white justify-self-center col-span-2 w-1/3 p-1 text-sm'

const todoTitleInputLabel = document.createElement('label')
const todoTitleInput = document.createElement('input')
const todoDescInputLabel = document.createElement('label')
const todoDescInput = document.createElement('input')
const todoDueDateInputLabel = document.createElement('label')
const todoDueDateInput = document.createElement('input')
const todoPriorityInputLabel = document.createElement('label')
const todoPriorityInput = document.createElement('input')
const todoCompletedInputLabel = document.createElement('label')
const todoCompletedInput = document.createElement('input')
const todoAddButton = document.createElement('button')
todoInputContainer.appendChild(todoTitleInputLabel)
todoInputContainer.appendChild(todoTitleInput)
todoInputContainer.appendChild(todoDescInputLabel)
todoInputContainer.appendChild(todoDescInput)
todoInputContainer.appendChild(todoDueDateInputLabel)
todoInputContainer.appendChild(todoDueDateInput)
todoInputContainer.appendChild(todoPriorityInputLabel)
todoInputContainer.appendChild(todoPriorityInput)
todoInputContainer.appendChild(todoCompletedInputLabel)
todoInputContainer.appendChild(todoCompletedInput)
todoInputContainer.appendChild(todoAddButton)

todoTitleInputLabel.textContent = 'Title'
todoDescInputLabel.textContent = 'Description'
todoDueDateInputLabel.textContent = 'Due Date'
todoPriorityInputLabel.textContent = 'Priority'
todoCompletedInputLabel.textContent = 'Completed'
todoAddButton.textContent = 'Add Todo'
todoCompletedInput.type = 'checkbox'
todoCompletedInput.classList = todoAddButton.classList =
  'border-gray-300 rounded-md bg-blue-500 text-white justify-self-center col-span-2 w-1/3 p-1 text-sm'

todoInputContainer.id = 'todo-container'

// inside the bodycontainers, a ul of li (for each project/todo)
const projUl = document.createElement('ul')

const todoUl = document.createElement('ul')
const dynamicLi = (item) => {
  const li = document.createElement('li')
  li.id = item.id
}

projInputContainer.appendChild(projUl)
todoInputContainer.appendChild(todoUl)

document.body.appendChild(container)

const allInputs = document.querySelectorAll('input')
allInputs.forEach((input) => {
  if (input.type !== 'checkbox') {
    input.classList = 'rounded-md text-sm shadow-sm bg-gray-50'
  }
})

todoCompletedInput.classList = 'text-sm'

const todoContainerLabels = document.querySelectorAll('#todo-container label')
todoContainerLabels.forEach((label) => {
  label.classList = 'justify-self-center'
})
