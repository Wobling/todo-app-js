'use strict'

const todos = getSavedTodos()

const filters = {
    searchText: '',
    hideCompleted: false
}

renderTodos(todos, filters)

document.querySelector('#search-text').addEventListener('input', (e) => {
    filters.searchText = e.target.value
    renderTodos(todos, filters)
})

document.querySelector('#todo-form').addEventListener('submit', (e) => {
    e.preventDefault()

    let description = e.target.elements.todoDescription.value.trim()

    if (description.length > 0) {
        todos.push({
            id: uuidv4(),
            description,
            completed: false
        })

        saveTodos(todos)

        e.target.elements.todoDescription.value = ''
        renderTodos(todos, filters)
    }
})

document.querySelector('#hide-completed').addEventListener('click', (e) => {
    filters.hideCompleted = e.target.checked
    renderTodos(todos, filters)
})