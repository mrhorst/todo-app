import { updateTodo } from './todosController.js'
import { getActiveProject } from './projectsController.js'
import { renderTodos } from './todosController.js'

const openEditModal = (todo, todoSection) => {
  const modal = document.getElementById('todo-edit-modal')
  modal.classList.remove('hidden')
  populateModal(todo, modal, todoSection)
}

const populateModal = (todo, modal, todoSection) => {
  const modalTitle = document.getElementById('edit-todo-title')
  const modalDesc = document.getElementById('edit-todo-description')
  const modalDueDate = document.getElementById('edit-todo-due-date')
  const modalCancelBtn = document.getElementById('cancel-todo-button')
  const modalSaveBtn = document.getElementById('save-todo-button')

  modalDesc.value = todo.description ? todo.description : ''
  modalDueDate.value = todo.dueDate ? todo.dueDate : ''
  modalTitle.value = todo.title

  modalCancelBtn.addEventListener('click', () => {
    modal.classList.add('hidden')
  })
  modalSaveBtn.onclick = () => {
    const newData = {
      title: modalTitle.value,
      description: modalDesc.value,
      dueDate: modalDueDate.value,
      priority: '', //modalPriority.value
      completed: '',
    }
    updateTodo(todo, newData)
    modal.classList.add('hidden')

    renderTodos(getActiveProject(), todoSection)
  }
}
export { populateModal, openEditModal }
