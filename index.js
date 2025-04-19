const body = document.body
body.classList = 'flex h-screen v-screen'

const div = document.createElement('div')
div.classList = 'flex flex-col justify-center align-center m-2 p-3'

const titleInput = document.createElement('input')
const descTextarea = document.createElement('textarea')
const button = document.createElement('button')
const ul = document.createElement('ul')

titleInput.classList =
  'w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
descTextarea.classList =
  'w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm resize-none  focus:outline-none focus:ring-2 focus:ring-blue-500'

descTextarea.rows = '5'
button.textContent = 'Add Todo'
button.classList = 'border-1 rounded p-2'

body.appendChild(div)

div.appendChild(titleInput)
div.appendChild(descTextarea)
div.appendChild(button)

body.append(ul)

titleInput.placeholder = 'Title'
descTextarea.placeholder = 'Description'

const getTodoInput = () => {
  const title = titleInput.value
  const desc = descTextarea.value
  return { title, desc }
}

const createListElement = () => {
  const li = document.createElement('li')
  ul.appendChild(li)
  return li
}

button.addEventListener('click', (e) => {
  e.preventDefault()

  const todo = getTodoInput()

  const li = createListElement()
  li.textContent = `${todo.title}: ${todo.desc}`
})
