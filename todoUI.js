const createTodoCard = () => {
  const todoCard = document.createElement('div')
  const projectName = document.createElement('p')
  const cardTitle = document.createElement('p')
  const cardDesc = document.createElement('p')
  const cardDueDate = document.createElement('p')
  const cardPriority = document.createElement('p')
  const cardCompleted = document.createElement('p')

  todoCard.classList =
    'flex flex-col justify-between rounded-lg border border-gray-300 shadow-md p-4 w-60 bg-white hover:shadow-lg transition'
  const todoAttr = [
    projectName,
    cardTitle,
    cardDesc,
    cardDueDate,
    cardPriority,
    cardCompleted,
  ]

  todoAttr.forEach((attr) => {
    todoCard.appendChild(attr)
  })

  return {
    todoCard,
    projectName,
    cardTitle,
    cardDesc,
    cardDueDate,
    cardPriority,
    cardCompleted,
  }
}

export default createTodoCard
