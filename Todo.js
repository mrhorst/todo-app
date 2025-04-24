class Todo {
  #isSubtask
  constructor(
    title = '',
    isSubtask = false,
    description = '',
    dueDate = '',
    priority = ''
  ) {
    this.id = Date.now()
    this.title = title
    this.description = description
    this.dueDate = dueDate
    this.priority = priority
    this.completed = false
    this.#isSubtask = isSubtask

    if (this.#isSubtask == false) {
      this.subtask = []
    }
  }

  changeTitle(title) {
    this.title = title
  }

  changeDescription(description) {
    this.description = description
  }

  changeDueDate(dueDate) {
    this.dueDate = dueDate
  }

  changePriority(priority) {
    this.priority = priority
  }

  toggleCompleteTask() {
    this.completed = !this.completed
  }

  addSubtask() {
    if (!this.#isSubtask) {
      const subtask = new Todo('', true)
      this.subtask.push(subtask)
      return subtask
    } else {
      console.error('Subtasks cannot have subtasks.')
    }
  }
}

export default Todo
