import { setFilters } from './filters'
import { createTodo, loadTodos } from './todos'
import { renderTodos} from './views'

renderTodos()

document.querySelector('#search-text').addEventListener('input', (e) => {
    setFilters({
        searchText: e.target.value
    })
    renderTodos()
})

document.querySelector('#hide-completed').addEventListener('click', (e) => {
    setFilters({
        hideCompleted: e.target.checked
    })
    renderTodos()
})

document.querySelector('#todo-form').addEventListener('submit', (e) => {
    e.preventDefault()
    const text = e.target.elements.todoDescription.value.trim()
    
    if (text.length > 0) {
        createTodo(text)
        e.target.elements.todoDescription.value = ''
        renderTodos()
    }
})

window.addEventListener('storage', (e) => {
    if (e.key === 'todos') {
        loadTodos()
        renderTodos()
    }
})