class Todo {
  constructor(title = '', description = '', dueDate = '', priority = '') {
    this.title = title
    this.description = description
    this.dueDate = dueDate
    this.priority = priority
    this.completed = false
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
}

export default Todo
