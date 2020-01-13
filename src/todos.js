import uuidv4 from 'uuid/v4'

let todos = []

const loadTodos = () => {
    const todoJSON = localStorage.getItem('todos')

    try {
        todos = todoJSON ? JSON.parse(todoJSON) : []
    } catch (e) {
        todos = []
    }
}

const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

const getTodos = () => todos

const createTodo = (text) => {
    const id = uuidv4()

    todos.push({
        id,
        description: text,
        completed: false
    })

    saveTodos()
}

// removeTodo
// Arguments: id of todo to remove
// Return value: none
const removeTodo = (todoId) => {
    const todoIndex = todos.findIndex((item) => todoId === item.id)

    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
        saveTodos()
    }
}

// toggleTodo
// Arguments: id of todo to toggle
// Return value: none
const toggleTodo = (todoId) => {
    const todo = todos.find((item) => item.id === todoId)

    if (todo) {
        todo.completed = !todo.completed
        saveTodos()
    }
}

loadTodos()

// Make sure to call loadTodos and setup the exports
export { loadTodos, getTodos, createTodo, removeTodo, toggleTodo }