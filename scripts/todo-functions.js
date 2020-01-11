'use strict'

const getSavedTodos = function () {

    const todoJSON = localStorage.getItem('todos')

    try {
        return todoJSON ? JSON.parse(todoJSON) : []
    } catch (e) {
        return []
    }
}

const saveTodos = function (todos) {
    localStorage.setItem('todos', JSON.stringify(todos))
}

const removeTodo = (todoId) => {
    const todoIndex = todos.findIndex((item) => todoId === item.id)

    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
    }
}

const toggleTodo = (todoId) => {
    const todo = todos.find((item) => item.id === todoId)

    if (todo) {
        todo.completed = !todo.completed
    }
}

const renderTodos = (todos, filters) => {
    const filteredTodos = todos.filter((todo) => {

        const searchMatch = todo.description.toLowerCase().includes(filters.searchText.toLowerCase())

        if (filters.hideCompleted) {
            return searchMatch && !todo.completed
        } 

        return searchMatch
    })

    const incompleteTodos = filteredTodos.filter((item) => !item.completed)
    const todosElement = document.querySelector('#todos')

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
        saveTodos(todos)
        renderTodos(todos, filters)
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
        saveTodos(todos)
        renderTodos(todos, filters)
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