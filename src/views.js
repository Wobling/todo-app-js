import { getFilters } from './filters'
import { getTodos, removeTodo, toggleTodo } from './todos'

// renderTodos
// Arguments: none
// Return value: none
const renderTodos = () => {

    const todosElement = document.querySelector('#todos')
    const filters = getFilters()

    const filteredTodos = getTodos().filter((todo) => {

        const searchMatch = todo.description.toLowerCase().includes(filters.searchText.toLowerCase())

        if (filters.hideCompleted) {
            return searchMatch && !todo.completed
        } 

        return searchMatch
    })

    const incompleteTodos = filteredTodos.filter((item) => !item.completed)

    todosElement.innerHTML = ''
    todosElement.appendChild(generateSummaryDOM(incompleteTodos))

    if (filteredTodos.length > 0) {
        filteredTodos.forEach((todo) => {
            const paragraphElement = generateTodoDOM(todo)
            todosElement.appendChild(paragraphElement)
        })
    } else {
        const emptyMessageElement = document.createElement('p')
        emptyMessageElement.textContent = 'There are no to-dos to show'
        emptyMessageElement.classList.add('empty-message')
        todosElement.appendChild(emptyMessageElement)
    }
}

const generateTodoDOM = (todo) => {

    const todoElement = document.createElement('label')
    const containerElement = document.createElement('div')
    const checkboxElement = document.createElement('input')
    const todoTextElement = document.createElement('span')
    const removeButtonElement = document.createElement('button')

    checkboxElement.setAttribute('type', 'checkbox')
    checkboxElement.checked = todo.completed
    containerElement.appendChild(checkboxElement)

    checkboxElement.addEventListener('click', (e) => {
        toggleTodo(todo.id)
        renderTodos()
    })

    if (todo.description.length > 0) {
        todoTextElement.textContent = todo.description
    } else {
        todoTextElement.textContent = 'No Description Provided'
    }

    containerElement.appendChild(todoTextElement)

    todoElement.classList.add('list-item')
    containerElement.classList.add("list-item__container")
    todoElement.appendChild(containerElement)

    removeButtonElement.textContent = 'remove'
    removeButtonElement.classList.add('button', 'button--text')
    todoElement.appendChild(removeButtonElement)

    removeButtonElement.addEventListener('click', () => {
        removeTodo(todo.id)
        renderTodos()
    })

    return todoElement
}

const generateSummaryDOM = (incompleteTodos) => {
    const headerElement = document.createElement('h2')
    headerElement.classList.add('list-title')

    const incompleteText = `You have ${incompleteTodos.length}`
    headerElement.textContent = incompleteTodos.length > 1 ? `${incompleteText} todos left` : `${incompleteText} todo left`
    return headerElement
}

export { renderTodos, generateTodoDOM, generateSummaryDOM }