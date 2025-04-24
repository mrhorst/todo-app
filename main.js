import Todo from './Todo.js'
import Project from './Project.js'

const homework = new Project('HW1', 'Need to do homework')

const task1 = new Todo('Math 1')
const task2 = new Todo('English1')
const task3 = new Todo('Geo1')

const listOfTasks = [task1, task2, task3]

listOfTasks.forEach((task) => {
  homework.addTodo(task)
})

console.log(homework)
