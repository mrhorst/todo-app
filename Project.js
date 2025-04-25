import Todo from './Todo.js'

class Project {
  constructor(title = '', description = '', dueDate = '') {
    this.id = Date.now()
    this.title = title
    this.description = description
    this.dueDate = dueDate
    this.todos = []
  }

  changeTitle() {}

  changeDescription() {}

  changeDueDate() {}

  addTodo(todo = new Todo()) {
    this.todos.push(todo)
  }
}

export default Project
