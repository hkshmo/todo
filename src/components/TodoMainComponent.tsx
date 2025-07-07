import { useState } from "react"
import TodoInput from "./todo-components/TodoInput"
import TodoList from "./todo-components/TodoList"
import Todofooter from "./todo-components/Todofooter"
import type { Todo } from "../types/td"

type Filter = 'all' | 'active' | 'completed'

export default function TodoMainComponent() {
    const [todoList, setTodoList] = useState<Todo[]>([])
    const [filter, setFilter] = useState<Filter>('all')

    function handleAdd(text: string) {
        const newTodo: Todo = {
            id: Date.now().toString(),
            text,
            completed: false
        }
        setTodoList([...todoList, newTodo])
    }

    function handleToggle(id: string) {
        setTodoList(list =>
            list.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        )
    }

    function handleClearCompleted() {
        setTodoList(list => list.filter(todo => !todo.completed))
    }

    function handleFilterChange(newFilter: Filter) {
        setFilter(newFilter)
    }

    const filteredTodos = todoList.filter(todo => {
        if (filter === 'active') return !todo.completed
        if (filter === 'completed') return todo.completed
        return true
    })
    const leftCount = todoList.filter(todo => !todo.completed).length

    return (
        <div style={{
            width: 600,
            margin: '0 auto',
            background: '#fff',
            boxShadow: '0 4px 24px 0 rgba(0,0,0,0.08), 0 1.5px 4px 0 rgba(0,0,0,0.04)',
            borderRadius: 12,
        }}>
            <TodoInput onAdd={handleAdd} />
            <div
                className="todo-scroll"
                style={{ minHeight: 260, maxHeight: 260, overflowY: 'scroll', transition: 'min-height 0.2s' }}
            >
                {filter === 'completed' && filteredTodos.length === 0 ? (
                  <div style={{textAlign: 'center', color: '#b3b3b3', fontSize: 22, padding: '48px 0'}}>
                    No completed tasks
                  </div>
                ) : filter === 'active' && filteredTodos.length === 0 ? (
                  <div style={{textAlign: 'center', color: '#b3b3b3', fontSize: 22, padding: '48px 0'}}>
                    No active tasks
                  </div>
                ) : (
                  <TodoList todos={filteredTodos} onToggle={handleToggle} filter={filter} />
                )}
            </div>
            <Todofooter
                leftCount={leftCount}
                filter={filter}
                onFilterChange={handleFilterChange}
                onClearCompleted={handleClearCompleted}
            />
        </div>
    )
}